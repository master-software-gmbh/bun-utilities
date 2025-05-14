import { URLSearchParams } from 'url';
import { typedFetch } from '../http';
import { logger } from '../logging';
import { type Result, error, success } from '../result';
import type { GeocodingService } from './interface';
import {
  type Coordinates,
  GeocodingResponse,
  PlacesAutocompleteResponse,
  type PredictionInput,
  type PredictionOutput,
  type ReverseGeocodingInput,
  type ReverseGeocodingOutput,
} from './types';

export class GoogleMapsGeocodingService implements GeocodingService {
  private readonly key: string;

  constructor(key: string) {
    this.key = key;
  }

  async predictAddress(input: PredictionInput): Promise<Result<PredictionOutput, 'prediction_failed'>> {
    const body = {
      input: input.query,
      languageCode: input.language,
    };

    const result = await typedFetch(
      'https://places.googleapis.com/v1/places:autocomplete',
      {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'X-Goog-Api-Key': this.key,
          'Content-Type': 'application/json',
        },
      },
      (res) => res.json(),
      PlacesAutocompleteResponse,
    );

    if (!result.success) {
      return error('prediction_failed');
    }

    logger.info('Fetched predictions from Google Maps Autocomplete API', {
      input: input.query,
      count: result.data.suggestions.length,
    });

    const predictions = result.data.suggestions.compactMap((prediction) => {
      if ('placePrediction' in prediction) {
        return {
          id: prediction.placePrediction.placeId,
          mainText: prediction.placePrediction.structuredFormat.mainText.text,
          secondaryText: prediction.placePrediction.structuredFormat.secondaryText?.text,
        };
      }

      return null;
    });

    return success({ predictions });
  }

  async convertAddressToCoordinates(address: string): Promise<Result<Coordinates, 'conversion_failed'>> {
    const params = new URLSearchParams({
      key: this.key,
      address: address,
    });

    const result = await typedFetch(
      `https://maps.googleapis.com/maps/api/geocode/json?${params}`,
      undefined,
      (res) => res.json(),
      GeocodingResponse,
    );

    if (!result.success) {
      return error('conversion_failed');
    }

    logger.info('Fetched results from Google Maps Geocoding API', {
      input: address,
      count: result.data.results.length,
    });

    const firstResult = result.data.results.at(0);

    if (!firstResult) {
      return error('conversion_failed');
    }

    return success(firstResult.geometry.location);
  }

  async convertCoordinatesToAddress(
    input: ReverseGeocodingInput,
  ): Promise<Result<ReverseGeocodingOutput, 'conversion_failed'>> {
    const params: Record<string, string> = {
      key: this.key,
      latlng: `${input.coordinates.lat},${input.coordinates.lng}`,
    };

    if (input.language) {
      params['language'] = input.language;
    }

    const result = await typedFetch(
      `https://maps.googleapis.com/maps/api/geocode/json?${new URLSearchParams(params)}`,
      undefined,
      (res) => res.json(),
      GeocodingResponse,
    );

    if (!result.success) {
      return error('conversion_failed');
    }

    logger.info('Fetched results from Google Maps Reverse Geocoding API', {
      input: input.coordinates,
      count: result.data.results.length,
    });

    const firstResult = result.data.results.at(0);

    if (!firstResult) {
      return error('conversion_failed');
    }

    return success({
      id: firstResult.place_id,
      address: firstResult.formatted_address,
    });
  }
}

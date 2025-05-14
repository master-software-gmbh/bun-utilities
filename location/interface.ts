import type { Result } from '../result';
import type {
  Coordinates,
  PredictionInput,
  PredictionOutput,
  ReverseGeocodingInput,
  ReverseGeocodingOutput,
} from './types';

export interface GeocodingService {
  predictAddress(input: PredictionInput): Promise<Result<PredictionOutput, 'prediction_failed'>>;
  convertAddressToCoordinates(address: string): Promise<Result<Coordinates, 'conversion_failed'>>;
  convertCoordinatesToAddress(
    input: ReverseGeocodingInput,
  ): Promise<Result<ReverseGeocodingOutput, 'conversion_failed'>>;
}

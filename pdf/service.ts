import { type Result, error, success } from '../result';
import type { PdfServiceConfig } from './types';

export class PdfService {
  private readonly config: PdfServiceConfig;

  constructor(config: PdfServiceConfig) {
    this.config = config;
  }

  async convertHtmlToPdf(
    html: string,
  ): Promise<Result<ReadableStream<Uint8Array<ArrayBufferLike>>, 'pdf_conversion_failed'>> {
    const response = await fetch(`${this.config.url}/api/v1/html-to-pdf`, {
      method: 'POST',
      body: html,
      headers: {
        'X-Client': this.config.client,
      },
    });

    if (!response.ok || !response.body) {
      return error('pdf_conversion_failed');
    }

    return success(response.body);
  }
}

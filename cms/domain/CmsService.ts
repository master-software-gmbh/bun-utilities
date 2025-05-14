import type { StandardSchemaV1 } from '@standard-schema/spec';
import { getDotPath } from '@standard-schema/utils';
import { logger } from '../../logging';
import { type Result, error, success, successful } from '../../result';
import type { CmsRepository } from './CmsRepository';
import type { BaseDocument } from './document';

export class CmsService<DocumentSchema extends BaseDocument> {
  private readonly repository: CmsRepository;
  private readonly documentSchema: StandardSchemaV1<DocumentSchema>;

  constructor(repository: CmsRepository, documentSchema: StandardSchemaV1<DocumentSchema>) {
    this.repository = repository;
    this.documentSchema = documentSchema;
  }

  async saveDocument(document: DocumentSchema): Promise<Result<void, 'validation_failed'>> {
    const result = await this.validateDocument(document);

    if (!result.success) {
      logger.error('Failed to validate CMS document', { id: document.id, title: document.title });
      return error('validation_failed');
    }

    await this.repository.save(document);

    logger.info('Saved CMS document', { id: document.id, title: document.title });

    return success();
  }

  async getDocumentById(id: string): Promise<Result<DocumentSchema, 'document_not_found' | 'validation_failed'>> {
    const result = await this.repository.ofId(id);

    if (!result.success) {
      return error('document_not_found');
    }

    return this.validateDocument(result.data);
  }

  async getDocuments(): Promise<DocumentSchema[]> {
    const documents = await this.repository.all();
    const promises = documents.map((document) => this.validateDocument(document));
    const results = await Promise.all(promises);

    return successful(results);
  }

  async deleteDocument(id: string): Promise<Result<void, 'document_not_found'>> {
    const result = await this.repository.remove(id);

    if (result.error) {
      return error('document_not_found');
    }

    logger.info('Deleted CMS document', { id });

    return success();
  }

  private async validateDocument(document: BaseDocument): Promise<Result<DocumentSchema, 'validation_failed'>> {
    const result = await this.documentSchema['~standard'].validate(document);

    if (result.issues) {
      const paths = result.issues.map((issue) => getDotPath(issue));
      logger.error('Document validation failed', { id: document.id, title: document.title, paths });

      return error('validation_failed');
    }

    return success(result.value);
  }
}

import type { Kysely, Selectable } from 'kysely';
import { error, success, type Result } from '../../result';
import { FileEntity } from '../domain/file';
import type { FileRepository } from '../domain/repository';
import type { DB } from '../infrastructure/types';

export class FileRepositoryImpl implements FileRepository {
  private readonly database: Kysely<DB>;

  constructor(database: Kysely<DB>) {
    this.database = database;
  }

  async insert(entity: FileEntity): Promise<void> {
    await this.database
      .insertInto('file')
      .values({
        id: entity.id,
        key: entity.key,
        type: entity.type,
        created_at: entity.createdAt.getTime(),
      })
      .execute();
  }

  async update(entity: FileEntity): Promise<void> {
    await this.database
      .updateTable('file')
      .set({
        key: entity.key,
        type: entity.type,
        created_at: entity.createdAt.getTime(),
      })
      .where('file.id', '=', entity.id)
      .execute();
  }

  async delete(id: string): Promise<void> {
    await this.database.deleteFrom('file').where('file.id', '=', id).execute();
  }

  async findById(id: string): Promise<Result<FileEntity, 'entity_not_found' | 'mapping_error'>> {
    const row = await this.database
      .selectFrom('file')
      .selectAll()
      .where('file.id', '=', id)
      .executeTakeFirst();

    if (!row) {
      return error('entity_not_found');
    }

    return this.mapFile(row);
  }

  async findAll(): Promise<Result<FileEntity, 'entity_not_found' | 'mapping_error'>[]> {
    const rows = await this.database.selectFrom('file').selectAll().execute();
    return rows.map((row) => this.mapFile(row));
  }

  private mapFile(row: Selectable<DB['file']>): Result<FileEntity, 'mapping_error'> {
    return success(new FileEntity(row.id, row.key, row.type, new Date(row.created_at)));
  }
}

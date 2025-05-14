import type { Kysely } from 'kysely';
import { jsonArrayFrom } from 'kysely/helpers/sqlite';
import { type Result, error, success } from '../../result';
import type { DB } from '../database/types';
import type { CmsRepository } from '../domain/CmsRepository';
import type { BaseBlock } from '../domain/blocks';
import type { BaseDocument } from '../domain/document';

export class CmsRepositoryImpl implements CmsRepository {
  private readonly database: Kysely<DB>;

  constructor(database: Kysely<DB>) {
    this.database = database;
  }

  async add(entity: BaseDocument): Promise<Result<void, 'entity_already_exists'>> {
    return this.database.transaction().execute(async (transaction) => {
      const exists = await this.doesDocumentExist(entity.id);

      if (exists) {
        return error('entity_already_exists');
      }

      await this.upsert(transaction, entity);

      return success();
    });
  }

  async update(entity: BaseDocument): Promise<Result<void, 'entity_doesnt_exist'>> {
    return this.database.transaction().execute(async (transaction) => {
      const exists = await this.doesDocumentExist(entity.id);

      if (!exists) {
        return error('entity_doesnt_exist');
      }

      await this.upsert(transaction, entity);

      return success();
    });
  }

  async save(entity: BaseDocument): Promise<void> {
    await this.database.transaction().execute(async (transaction) => {
      await this.upsert(transaction, entity);
    });
  }

  private async upsert(transaction: Kysely<DB>, entity: BaseDocument): Promise<void> {
    await transaction
      .insertInto('cms_document')
      .values({
        id: entity.id,
        title: entity.title,
        created_at: entity.createdAt.getTime(),
        updated_at: entity.updatedAt.getTime(),
      })
      .onConflict((oc) =>
        oc.doUpdateSet({
          id: entity.id,
          title: entity.title,
          created_at: entity.createdAt.getTime(),
          updated_at: entity.updatedAt.getTime(),
        }),
      )
      .execute();

    await transaction.deleteFrom('cms_block').where('cms_block.document_id', '=', entity.id).execute();

    if (entity.blocks.isNotEmpty()) {
      await transaction
        .insertInto('cms_block')
        .values(
          entity.blocks.map((block) => ({
            id: block.id,
            type: block.type,
            document_id: entity.id,
            content: JSON.stringify(block.content),
          })),
        )
        .execute();
    }
  }

  async remove(id: string): Promise<Result<void, 'entity_doesnt_exist'>> {
    await this.database.transaction().execute(async (transaction) => {
      await transaction.deleteFrom('cms_block').where('cms_block.document_id', '=', id).execute();
      await transaction.deleteFrom('cms_document').where('cms_document.id', '=', id).execute();
    });

    return success();
  }

  async ofId(id: string): Promise<Result<BaseDocument, 'entity_doesnt_exist'>> {
    const result = await this.database
      .selectFrom('cms_document')
      .selectAll()
      .select((eb) =>
        jsonArrayFrom(
          eb
            .selectFrom('cms_block')
            .select(['cms_block.id', 'cms_block.type', 'cms_block.content', 'cms_block.document_id'])
            .where('cms_block.document_id', '=', eb.ref('cms_document.id')),
        ).as('blocks'),
      )
      .where('cms_document.id', '=', id)
      .executeTakeFirst();

    if (!result) {
      return error('entity_doesnt_exist');
    }

    return success(this.mapDocument(result));
  }

  async all(): Promise<BaseDocument[]> {
    const results = await this.database
      .selectFrom('cms_document')
      .selectAll()
      .select((eb) =>
        jsonArrayFrom(
          eb
            .selectFrom('cms_block')
            .select(['cms_block.id', 'cms_block.type', 'cms_block.content', 'cms_block.document_id'])
            .where('cms_block.document_id', '=', eb.ref('cms_document.id')),
        ).as('blocks'),
      )
      .orderBy('cms_document.updated_at', 'desc')
      .execute();

    return results.map((row) => this.mapDocument(row));
  }

  private async doesDocumentExist(id: string): Promise<boolean> {
    const rows = await this.database
      .selectFrom('cms_document')
      .select('cms_document.id')
      .where('cms_document.id', '=', id)
      .execute();

    return rows.length > 0;
  }

  private mapDocument(row: DB['cms_document'] & { blocks: DB['cms_block'][] }): BaseDocument {
    return {
      id: row.id,
      title: row.title,
      createdAt: new Date(row.created_at),
      updatedAt: new Date(row.updated_at),
      blocks: row.blocks.map((row) => this.mapBlock(row)),
    };
  }

  private mapBlock(row: DB['cms_block']): BaseBlock {
    return {
      id: row.id,
      type: row.type,
      content: row.content,
    };
  }
}

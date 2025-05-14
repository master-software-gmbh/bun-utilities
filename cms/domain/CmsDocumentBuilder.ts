import { randomUUID } from 'crypto';
import type { FileRefBlock, RichTextBlock } from './blocks';
import type { StandardDocument } from './document';

export class CmsDocumentBuilder {
  private title = '';
  private blocks: StandardDocument['blocks'] = [];

  build(): StandardDocument {
    const id = randomUUID();
    const date = new Date();

    return {
      id: id,
      createdAt: date,
      updatedAt: date,
      title: this.title,
      blocks: this.blocks,
    };
  }

  setTitle(title: string): this {
    this.title = title;
    return this;
  }

  addRichTextBlock(content?: RichTextBlock['content']): this {
    this.blocks.push({
      id: randomUUID(),
      type: 'rich-text',
      content: content ?? {
        text: '',
        spans: [
          {
            text: '',
            attributes: {},
          },
        ],
      },
    } satisfies RichTextBlock);

    return this;
  }

  addFileRefBlock(content: FileRefBlock['content']): this {
    this.blocks.push({
      id: randomUUID(),
      type: 'file-ref',
      content: content,
    } satisfies FileRefBlock);

    return this;
  }
}

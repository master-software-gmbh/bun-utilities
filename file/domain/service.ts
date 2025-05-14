import type { Folder, StorageBackend } from '../../storage';
import type { FileRepository } from './FileRepository';
import { FileEntity, type FileInput } from './file';

export class FileService {
  private readonly backend: StorageBackend;
  private readonly fileRepository: FileRepository;

  constructor(backend: StorageBackend, fileRepository: FileRepository) {
    this.backend = backend;
    this.fileRepository = fileRepository;
  }

  async createFile(source: FileInput, folder?: Folder): Promise<FileEntity> {
    const key = await this.backend.createFile(source.stream(), folder, source.type);
    const file = new FileEntity({ key: key, name: source.name, type: source.type });

    await this.fileRepository.insert(file);

    return file;
  }

  async getFile(id: string): Promise<FileEntity | null> {
    const { data: file } = await this.fileRepository.findById(id);

    if (!file) {
      return null;
    }

    const { data } = await this.backend.getFile(file.key);

    if (data) {
      file.data = data;
    }

    return file;
  }
}

import { Injectable } from '@nestjs/common';
import { writeFile } from 'fs/promises';
import { join, parse } from 'path';
import { MFile } from 'src/file/class/mfile.class';
import { v4 } from 'uuid';

@Injectable()
export class FileService {
  async save(file: MFile) {
    const folder = join(__dirname, '..', '..', 'static', 'images');
    const type = parse(file.originalname).ext;
    const newFileName = v4();
    const newFillName = `${newFileName}${type}`;

    const filePath = join(folder, newFillName);
    await writeFile(filePath, file.buffer);

    return `static/images/${newFillName}`;
  }
}

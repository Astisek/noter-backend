import { Injectable, PipeTransform } from '@nestjs/common';
import { parse } from 'path';
import * as sharp from 'sharp';
import { MFile } from 'src/file/class/mfile.class';

@Injectable()
export class SharpPipe
  implements PipeTransform<Express.Multer.File, Promise<MFile>>
{
  async transform(image: Express.Multer.File) {
    const originalName = parse(image.originalname).name;
    const filename = `${originalName}.webp`;

    const buffer = await sharp(image.buffer).webp({ effort: 3 }).toBuffer();

    return new MFile(filename, buffer);
  }
}

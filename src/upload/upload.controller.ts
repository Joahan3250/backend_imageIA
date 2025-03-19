import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('upload')
export class UploadController {
    @Post()
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './uploads', // Carpeta donde se guardarán las imágenes
            filename: (req, file, callback) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                callback(null, file.fieldname + '-' + uniqueSuffix + extname(file.originalname));
            },
        }),
    }))
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        return {
            filename: file.filename,
            imageUrl: `https://backend-imageia-1.onrender.com${file.filename}`/*la url del backend*/
        };
    }
}

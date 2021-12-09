import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { SocialCardService } from './socialCards.service';
import { SocialCard } from '../database/entity/socialCard.entity';
import { FileInterceptor } from '@nestjs/platform-express'
import { Express } from 'express';
import { diskStorage } from 'multer'
import { mkdirSync, unlinkSync, rmdirSync } from 'fs';

@Controller('socialcards')
export class SocialCardController {
    constructor(
        private readonly socialCardService: SocialCardService,
    ) {
    }

    @Post('save_socialcard')
    async saveAll(@Body() socialCard: SocialCard[]) {
        return await this.socialCardService.saveAll(socialCard);
    }

    @Get('showdata')
    async showData() {
        return await this.socialCardService.showData();
    }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file',))
    @UseInterceptors(FileInterceptor('file',
        {
            storage: diskStorage({
                destination: (req, file, cb) => {
                    // const uploadPath = 'uploads/'
                    const uploadPath = process.env.LINK_UPLOAD
                    const path = uploadPath + req.body.file
                    mkdirSync(path, { recursive: true })
                    cb(null, path);
                },
                filename: async (req, file, cb) => {
                    cb(null, file.originalname)
                }
            })
        }
    ))
    async uploadFile(@UploadedFile() file: Express.Multer.File) {

        return {
            file: file
        };
    }

    @Delete('delete/:id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        console.log(id)
        return await this.socialCardService.delete(id);
    }

}

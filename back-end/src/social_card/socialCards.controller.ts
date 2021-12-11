import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UploadedFile, UseInterceptors, ParseBoolPipe } from '@nestjs/common';
import { SocialCardService } from './socialCards.service';
import { Comment } from 'src/database/entity/comment.entity';
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

    @Post('upload_avatar')
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
    async uploadFileAvater(@UploadedFile() file: Express.Multer.File) {

        return {
            file: file
        };
    }

    @Delete('delete/:id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return await this.socialCardService.delete(id);
    }

    @Post('update')
    async update(@Body() socialCard: SocialCard) {
        return await this.socialCardService.update(socialCard);
    }

    @Post('save_comment')
    async saveComment(@Body() comment: Comment[]) {
        return await this.socialCardService.saveComment(comment);
    }

    @Get('showcomment')
    async showComment() {
        return await this.socialCardService.showComment();
    }

    @Get('update-status/:id/:value')
    async updateStatus(@Param('id', ParseIntPipe) id: number, @Param('value', ParseIntPipe) value: number) {
        return await this.socialCardService.updateStatus(id, value);
    }

    @Delete('deleteundo/:id')
    async deleteUndo(@Param('id', ParseIntPipe) id: number) {
        return await this.socialCardService.deleteUndo(id);
    }
    @Get('revertundo/:id')
    async revertUndo(@Param('id', ParseIntPipe) id: number) {
        return await this.socialCardService.revertUndo(id);
    }

}

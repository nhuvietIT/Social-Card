import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { Comment } from 'src/database/entity/comment.entity';
import { FileInterceptor } from '@nestjs/platform-express'
import { Express } from 'express';
import { diskStorage } from 'multer'
import { mkdirSync, unlinkSync, rmdirSync } from 'fs';

@Controller('comment')
export class CommentsController {
    constructor(
        private readonly CommentsService: CommentsService,
    ) {
    }

    @Post('save_comment')
    async saveComment(@Body() comment: Comment[]) {
        return await this.CommentsService.saveComment(comment);
    }
}

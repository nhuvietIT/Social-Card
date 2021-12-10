import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { SocialCard } from '../database/entity/socialCard.entity'
import { MulterModule } from '@nestjs/platform-express'
import { Comment } from 'src/database/entity/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment]), ConfigModule,],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule { }

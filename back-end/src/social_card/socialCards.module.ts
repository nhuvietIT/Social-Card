import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SocialCardController } from './socialCards.controller';
import { SocialCardService } from './socialCards.service';
import { SocialCard } from '../database/entity/socialCard.entity'
import { MulterModule } from '@nestjs/platform-express'

@Module({
  imports: [TypeOrmModule.forFeature([SocialCard]), ConfigModule,
  MulterModule.register({
    dest: './uploads',
  })],
  controllers: [SocialCardController],
  providers: [SocialCardService],
})
export class SocialCardModule { }

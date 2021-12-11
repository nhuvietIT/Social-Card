import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SocialCard } from '../database/entity/socialCard.entity';
import { Comment } from 'src/database/entity/comment.entity';
import {
    Connection,
    Equal,
    MoreThan,
    Repository,
    getConnection
} from 'typeorm';


@Injectable()
export class SocialCardService {
    constructor(
        @InjectRepository(SocialCard)
        private readonly socialCardService: Repository<SocialCard>,
        @InjectRepository(Comment)
        private readonly CommentService: Repository<Comment>,
        private connection: Connection
    ) {
    }

    async saveAll(socialCard: SocialCard[]) {
        try {
            await this.socialCardService.save(socialCard)
            return await this.socialCardService.find()
        } catch (err) {
            console.log({ err });
        }
    }

    async showData() {
        try {
            return await this.socialCardService.find()
        } catch (err) {
            console.log({ err });
        }
    }

    async delete(id: number) {
        const timeElapsed = Date.now();
        const today = new Date(timeElapsed);
        await this.socialCardService.update(id, { DeletedAt: today.toISOString() });
        return await this.socialCardService.find()
    }

    async update(socialCard: SocialCard) {
        if (socialCard.Avatar !== undefined && socialCard.Image !== undefined) {
            await this.socialCardService.update(socialCard.id,
                {
                    id: socialCard.id,
                    Name: socialCard.Name,
                    Description: socialCard.Description,
                    Avatar: socialCard.Avatar,
                    Image: socialCard.Image
                });
            return await this.socialCardService.find()
        } else if (socialCard.Avatar === undefined && socialCard.Image !== undefined) {
            await this.socialCardService.update(socialCard.id,
                {
                    id: socialCard.id,
                    Name: socialCard.Name,
                    Description: socialCard.Description,
                    Image: socialCard.Image
                });
            return await this.socialCardService.find()
        } else if (socialCard.Avatar !== undefined && socialCard.Image === undefined) {
            await this.socialCardService.update(socialCard.id,
                {
                    id: socialCard.id,
                    Name: socialCard.Name,
                    Description: socialCard.Description,
                    Avatar: socialCard.Avatar
                });
            return await this.socialCardService.find()
        } else {
            await this.socialCardService.update(socialCard.id,
                {
                    id: socialCard.id,
                    Name: socialCard.Name,
                    Description: socialCard.Description
                });
            return await this.socialCardService.find()
        }
    }

    async saveComment(comment: Comment[]) {
        try {
            await this.CommentService.save(comment)
            return await this.CommentService.find()
        } catch (err) {
            console.log({ err });
        }
    }

    async showComment() {
        try {
            return await this.CommentService.find()
        } catch (err) {
            console.log({ err });
        }
    }

    async updateStatus(id, value) {
        await this.socialCardService.update(id, { Heart: value });
        return await this.socialCardService.find()
    }

    async deleteUndo(id: number) {
        const timeElapsed = Date.now();
        const today = new Date(timeElapsed);
        return await this.socialCardService.update(id, { DeletedAt: today.toISOString() });
    }

    async revertUndo(id: number) {
        await this.socialCardService.update(id, { DeletedAt: null });
        return await this.socialCardService.find()
    }
}

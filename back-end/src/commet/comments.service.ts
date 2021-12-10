import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'; 
import { Comment } from 'src/database/entity/comment.entity';
import {
    Connection,
    Equal,
    MoreThan,
    Repository,
} from 'typeorm';


@Injectable()
export class CommentsService {
    constructor( 
        @InjectRepository(Comment)
        private readonly CommentService: Repository<Comment>,
        private connection: Connection
    ) {
    }

    async saveComment(comment: Comment[]) {
        try {
            await this.CommentService.save(comment)
            return await this.CommentService.find()
        } catch (err) {
            console.log({ err });
        }
    }

}

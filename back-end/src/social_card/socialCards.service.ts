import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SocialCard } from '../database/entity/socialCard.entity';
import {
    Connection,
    Equal,
    MoreThan,
    Repository,
} from 'typeorm';


@Injectable()
export class SocialCardService {
    constructor(
        @InjectRepository(SocialCard)
        private readonly socialCardService: Repository<SocialCard>,
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
        await this.socialCardService.delete(id)
        return await this.socialCardService.find()
    }


}

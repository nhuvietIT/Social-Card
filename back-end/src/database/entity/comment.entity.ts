import { IsNumber } from 'class-validator';
import {
   Column, Entity, PrimaryGeneratedColumn,JoinColumn,ManyToOne
} from 'typeorm'; 
@Entity('comment')
export class Comment {
   @Column({ name: 'id' })
   @PrimaryGeneratedColumn()
   @IsNumber()
   id: number;

   @Column({ name: 'social_card_id'})
   socialCardId: number;

   @Column({ name: 'content' })
   Content: string;

}

import { IsNumber } from 'class-validator';
import {
   Column, Entity, PrimaryGeneratedColumn, OneToMany, DeleteDateColumn
} from 'typeorm';
@Entity('social-card')
export class SocialCard {
   @Column({ name: 'id' })
   @PrimaryGeneratedColumn()
   @IsNumber()
   id: number;

   @Column({ name: 'name' })
   Name: string;

   @Column({ name: 'avatar', nullable: true })
   Avatar: string;

   @Column({ name: 'description', nullable: true })
   Description: string;

   @Column({ name: 'image', nullable: true })
   Image: string;

   @Column({ name: 'heart' })
   Heart: number;

   @DeleteDateColumn({ name: 'deleted_at', nullable: true })
   DeletedAt?: Date;

   @Column({ name: 'is_enable', default: false })
   IsEnable: Boolean
}

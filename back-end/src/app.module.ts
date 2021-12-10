import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SocialCardModule } from './social_card/socialCards.module';
import { CommentsModule} from './commet/comments.module'
import { join } from 'path';
import { ConfigModule } from "@nestjs/config";
@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: '',
            database: 'social_card',
            entities: ['dist/**/*.entity{.ts,.js}'],
            synchronize: true,
        }),
        ConfigModule.forRoot({
            ignoreEnvFile: false
        }),
        SocialCardModule,
        // CommentsModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {
}

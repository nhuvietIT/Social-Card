import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SocialCardModule } from './social_card/socialCards.module';
import { ServeStaticModule } from '@nestjs/serve-static';
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
    ],
    controllers: [],
    providers: [],
})
export class AppModule {
}

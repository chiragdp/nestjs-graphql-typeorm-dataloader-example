import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserModule } from './user/user.module';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from './shared/shared.module';
import { PostModule } from './post/post.module';
import { DataloaderModule } from './dataloader/dataloader.module';
import { DataloaderService } from './dataloader/dataloader/dataloader.service';
import { CategoryModule } from './category/category.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get('PG_HOST'),
          port: parseInt(configService.get('PG_PORT')),
          username: configService.get('PG_USERNAME'),
          password: configService.get('PG_PASSWORD'),
          database: configService.get('PG_DATABASE'),
          autoLoadEntities: true,
          synchronize: true,
          logging: true,
        };
      },
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      imports: [DataloaderModule],
      inject: [DataloaderService],
      driver: ApolloDriver,
      useFactory: (dataloaderService: DataloaderService) => {
        return {
          playground: true,
          autoSchemaFile: join(process.cwd(), 'src/schema.graphql'),
          definitions: {
            path: join(process.cwd(), 'src/graphql.ts'),
          },
          context: () => {
            return {
              loaders: dataloaderService.getLoaders(),
            };
          },
        };
      },
    }),
    UserModule,
    SharedModule,
    PostModule,
    DataloaderModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'node:path';
import { AlbumModel } from './album/album.model';
import { AlbumModule } from './album/album.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistModel } from './artist/artist.model';
import { ArtistModule } from './artist/artist.module';
import { AuthModule } from './auth/auth.module';
import { FavoritesModel } from './favorites/favorites.model';
import { FavoritesModule } from './favorites/favorites.module';
import { TrackModel } from './track/track.model';
import { TrackModule } from './track/track.module';
import { UserModel } from './user/user.model';
import { UserModule } from './user/user.module';

const MIGRATION_PATH = join(__dirname, 'migrations', '*.js');

@Module({
  imports: [
    UserModule,
    TrackModule,
    ArtistModule,
    AlbumModule,
    FavoritesModule,
    AuthModule,
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT || '5432'),
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [
          UserModel,
          ArtistModel,
          AlbumModel,
          TrackModel,
          FavoritesModel,
        ],
        migrations: [MIGRATION_PATH],
        migrationsRun: true,
        synchronize: false,
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

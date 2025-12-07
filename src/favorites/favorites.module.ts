import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumModel } from '../album/album.model';
import { ArtistModel } from '../artist/artist.model';
import { TrackModel } from '../track/track.model';
import { FavoritesController } from './favorites.controller';
import { FavoritesModel } from './favorites.model';
import { FavoritesService } from './favorites.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FavoritesModel,
      ArtistModel,
      AlbumModel,
      TrackModel,
    ]),
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService],
})
export class FavoritesModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackModule } from '../track/track.module';
import { ArtistController } from './artist.controller';
import { ArtistModel } from './artist.model';
import { ArtistService } from './artist.service';
import { AlbumModule } from '../album/album.module';

@Module({
  imports: [TypeOrmModule.forFeature([ArtistModel]), TrackModule, AlbumModule],
  controllers: [ArtistController],
  providers: [ArtistService],
  exports: [ArtistService],
})
export class ArtistModule {}

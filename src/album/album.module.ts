import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackModule } from '../track/track.module';
import { AlbumController } from './album.controller';
import { AlbumModel } from './album.model';
import { AlbumService } from './album.service';

@Module({
  imports: [TypeOrmModule.forFeature([AlbumModel]), TrackModule],
  providers: [AlbumService],
  controllers: [AlbumController],
  exports: [AlbumService],
})
export class AlbumModule {}

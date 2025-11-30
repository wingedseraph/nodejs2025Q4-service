import { Module } from '@nestjs/common';
import { TrackModule } from '../track/track.module';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';

@Module({
  providers: [AlbumService],
  controllers: [AlbumController],
  imports: [TrackModule],
  exports: [AlbumService],
})
export class AlbumModule {}

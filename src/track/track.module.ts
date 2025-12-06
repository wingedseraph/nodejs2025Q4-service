import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackController } from './track.controller';
import { TrackModel } from './track.model';
import { TrackService } from './track.service';

@Module({
  imports: [TypeOrmModule.forFeature([TrackModel])],
  controllers: [TrackController],
  providers: [TrackService],
})
export class TrackModule {}

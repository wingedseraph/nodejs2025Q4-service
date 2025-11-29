import { Injectable } from '@nestjs/common';
import { TrackModel } from './track.model';

@Injectable()
export class TrackService {
  private readonly tracks = new Map<string, TrackModel>();

  findAll() {
    return Array.from(this.tracks.values());
  }
}

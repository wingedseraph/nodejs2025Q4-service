import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { checkRecordExistsById } from '../utils/checks';
import { TrackModel } from './track.model';
import { Track } from './types/track.types';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(TrackModel)
    private trackRepository: Repository<TrackModel>,
  ) {}

  async findAll() {
    const tracks = await this.trackRepository.find();

    console.log('tracks', tracks);
    return tracks;
  }

  async findById(id: string) {
    const track = await this.trackRepository.findOne({ where: { id } });

    checkRecordExistsById(track, id);

    return track;
  }

  async createTrack(createTrack: Track) {
    const newTrack = this.trackRepository.create(createTrack);
    const createdTrack = await this.trackRepository.save(newTrack);

    return createdTrack;
  }

  async updateTrack(id: string, updateTrack: Track) {
    const track = await this.trackRepository.findOne({ where: { id } });

    checkRecordExistsById(track, id);

    track.name = updateTrack.name;
    track.artistId = updateTrack.artistId;
    track.albumId = updateTrack.albumId;
    track.duration = updateTrack.duration;

    const updatedTrack = await this.trackRepository.save(track);

    return updatedTrack;
  }
  async deleteTrack(id: string) {
    const result = await this.trackRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }

    return true;
  }
  async findTracksByAlbumId(albumId: string) {
    const tracks = await this.trackRepository.find();
    return Array.from(tracks).filter((track) => track.albumId === albumId);
  }

  async findTracksByArtistId(artistId: string) {
    const tracks = await this.trackRepository.find();
    return Array.from(tracks).filter((track) => track.artistId === artistId);
  }

  async removeAlbumFromTracks(albumId: string) {
    const tracks = await this.findTracksByAlbumId(albumId);

    tracks.forEach((track) => (track.albumId = null));

    await this.trackRepository.save(tracks);
  }
  async removeArtistFromTracks(artistId: string) {
    const tracks = await this.findTracksByArtistId(artistId);

    tracks.forEach((track) => (track.artistId = null));

    await this.trackRepository.save(tracks);
  }
}

import { Injectable } from '@nestjs/common';
import { checkRecordExists } from '../utils/checks';
import { TrackModel } from './track.model';
import { Track } from './types/track.types';

@Injectable()
export class TrackService {
  private readonly tracks = new Map<string, TrackModel>();

  findAll() {
    return Array.from(this.tracks.values());
  }

  findById(id: string) {
    const track = this.tracks.get(id);
    checkRecordExists(track);
    return track;
  }

  createTrack(createTrack: Track) {
    const newTrack = new TrackModel(
      createTrack.name,
      createTrack.artistId,
      createTrack.albumId,
      createTrack.duration,
    );
    this.tracks.set(newTrack.id, newTrack);

    return this.tracks.get(newTrack.id);
  }

  updateTrack(id: string, updateTrack: Track) {
    const track = this.tracks.get(id);

    checkRecordExists(track);

    track.name = updateTrack.name;
    track.artistId = updateTrack.artistId;
    track.albumId = updateTrack.albumId;
    track.duration = updateTrack.duration;

    this.tracks.set(id, track);

    return this.tracks.get(id);
  }
  deleteTrack(id: string) {
    const track = this.tracks.get(id);

    checkRecordExists(track);

    return this.tracks.delete(id);
  }
  findTracksByAlbumId(albumId: string) {
    return Array.from(this.tracks.values()).filter(
      (track) => track.albumId === albumId,
    );
  }

  findTracksByArtistId(artistId: string) {
    return Array.from(this.tracks.values()).filter(
      (track) => track.artistId === artistId,
    );
  }

  removeAlbumFromTracks(albumId: string) {
    const tracks = this.findTracksByAlbumId(albumId);

    tracks.forEach((track) => (track.albumId = null));
  }
  removeArtistFromTracks(artistId: string) {
    const artists = this.findTracksByArtistId(artistId);

    artists.forEach((artist) => (artist.artistId = null));
  }
}

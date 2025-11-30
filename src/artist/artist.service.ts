import { Injectable } from '@nestjs/common';
import { checkUserExists } from '../utils/checks';
import { ArtistModel } from './artist.model';
import { Artist } from './types/artist.types';

@Injectable()
export class ArtistService {
  private readonly artists = new Map<string, ArtistModel>();

  findAll() {
    return Array.from(this.artists.values());
  }

  findById(id: string) {
    const artist = this.artists.get(id);
    checkUserExists(artist);

    return artist;
  }

  createArtist(createArtist: Artist) {
    const newArtist = new ArtistModel(createArtist.name, createArtist.grammy);
    this.artists.set(newArtist.id, newArtist);

    return this.artists.get(newArtist.id);
  }

  updateArtist(id: string, updateArtist: Artist) {
    const artist = this.artists.get(id);

    checkUserExists(artist);

    artist.name = updateArtist.name;
    artist.grammy = updateArtist.grammy;

    this.artists.set(id, artist);

    return this.artists.get(id);
  }
  deleteArtist(id: string) {
    const artist = this.artists.get(id);

    checkUserExists(artist);

    return this.artists.delete(id);
  }
}

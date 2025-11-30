import { Album } from '../album/types/album.types';
import { Artist } from '../artist/types/artist.types';
import { Track } from '../track/types/track.types';

export class FavoritesModel {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];

  constructor(artists: Artist[], albums: Album[], tracks: Track[]) {
    this.artists = artists;
    this.albums = albums;
    this.tracks = tracks;
  }
}

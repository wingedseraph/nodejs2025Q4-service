import {
  HttpException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { AlbumService } from '../album/album.service';
import { ArtistService } from '../artist/artist.service';
import { FAVORITES_MESSAGES, GENERIC_ERRORS } from '../const/messages';
import { TrackService } from '../track/track.service';
import { FavoritesModel } from './favorites.model';

@Injectable()
export class FavoritesService {
  private readonly favoritesTrackIds = new Set<string>();
  private readonly favoritesAlbumIds = new Set<string>();
  private readonly favoritesArtistIds = new Set<string>();

  constructor(
    private readonly artistService: ArtistService,
    private readonly albumService: AlbumService,
    private readonly trackService: TrackService,
  ) {}

  findAll() {
    return {
      artists: this.artistService
        .findAll()
        .filter((artist) => this.favoritesArtistIds.has(artist.id)),
      albums: this.albumService
        .findAll()
        .filter((album) => this.favoritesAlbumIds.has(album.id)),
      tracks: this.trackService
        .findAll()
        .filter((track) => this.favoritesTrackIds.has(track.id)),
    };
  }

  addTrack(trackId: string) {
    try {
      this.trackService.findById(trackId);
    } catch (err) {
      if (err instanceof HttpException && err.getStatus() === 404) {
        throw new UnprocessableEntityException(GENERIC_ERRORS.NOT_FOUND_ERROR);
      }
      throw err;
    }

    this.favoritesTrackIds.add(trackId);

    return { message: FAVORITES_MESSAGES.SUCCESSFUL_ADDED };
  }
  addAlbum(albumId: string) {
    try {
      this.albumService.findById(albumId);
    } catch (err) {
      if (err instanceof HttpException && err.getStatus() === 404) {
        throw new UnprocessableEntityException(GENERIC_ERRORS.NOT_FOUND_ERROR);
      }
      throw err;
    }

    this.favoritesAlbumIds.add(albumId);

    return { message: FAVORITES_MESSAGES.SUCCESSFUL_ADDED };
  }
  addArtist(artistId: string) {
    try {
      this.artistService.findById(artistId);
    } catch (err) {
      if (err instanceof HttpException && err.getStatus() === 404) {
        throw new UnprocessableEntityException(GENERIC_ERRORS.NOT_FOUND_ERROR);
      }
      throw err;
    }

    this.favoritesArtistIds.add(artistId);

    return { message: FAVORITES_MESSAGES.SUCCESSFUL_ADDED };
  }
  deleteTrack(trackId: string) {
    try {
      this.trackService.findById(trackId);
    } catch (err) {
      if (err instanceof HttpException && err.getStatus() === 404) {
        throw new UnprocessableEntityException(GENERIC_ERRORS.NOT_FOUND_ERROR);
      }
      throw err;
    }

    this.favoritesTrackIds.delete(trackId);

    return { message: FAVORITES_MESSAGES.SUCCESSFUL_DELETED };
  }
  deleteAlbum(albumId: string) {
    try {
      this.albumService.findById(albumId);
    } catch (err) {
      if (err instanceof HttpException && err.getStatus() === 404) {
        throw new UnprocessableEntityException(GENERIC_ERRORS.NOT_FOUND_ERROR);
      }
      throw err;
    }

    this.favoritesAlbumIds.delete(albumId);

    return { message: FAVORITES_MESSAGES.SUCCESSFUL_DELETED };
  }
  deleteArtist(artistId: string) {
    try {
      this.artistService.findById(artistId);
    } catch (err) {
      if (err instanceof HttpException && err.getStatus() === 404) {
        throw new UnprocessableEntityException(GENERIC_ERRORS.NOT_FOUND_ERROR);
      }
      throw err;
    }

    this.favoritesArtistIds.delete(artistId);

    return { message: FAVORITES_MESSAGES.SUCCESSFUL_DELETED };
  }

  // DELETE /favs/track/:id - delete track from favorites
  // Server should answer with status code 204 if the track was in favorites and now it's deleted id is found and deleted
  // Server should answer with status code 400 and corresponding message if trackId is invalid (not uuid)
  // Server should answer with status code 404 and corresponding message if corresponding track is not favorite
  // POST /favs/album/:id - add album to the favorites
  // Server should answer with status code 201 and corresponding message if album with id === albumId exists
  // Server should answer with status code 400 and corresponding message if albumId is invalid (not uuid)
  // Server should answer with status code 422 and corresponding message if album with id === albumId doesn't exist
  // DELETE /favs/album/:id - delete album from favorites
  // Server should answer with status code 204 if the album was in favorites and now it's deleted id is found and deleted
  // Server should answer with status code 400 and corresponding message if albumId is invalid (not uuid)
  // Server should answer with status code 404 and corresponding message if corresponding album is not favorite
  // POST /favs/artist/:id - add artist to the favorites
  // Server should answer with status code 201 and corresponding message if artist with id === artistId exists
  // Server should answer with status code 400 and corresponding message if artistId is invalid (not uuid)
  // Server should answer with status code 422 and corresponding message if artist with id === artistId doesn't exist
  // DELETE /favs/artist/:id - delete artist from favorites
  // Server should answer with status code 204 if the artist was in favorites and now it's deleted id is found and deleted
  // Server should answer with status code 400 and corresponding message if artistId is invalid (not uuid)
  // Server should answer with status code 404 and corresponding message if corresponding artist is not favorite
}

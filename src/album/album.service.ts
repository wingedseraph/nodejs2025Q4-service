import { Injectable } from '@nestjs/common';
import { checkRecordExists } from '../utils/checks';
import { AlbumModel } from './album.model';
import { Album } from './types/album';

@Injectable()
export class AlbumService {
  private readonly albums = new Map<string, AlbumModel>();

  findAll() {
    return Array.from(this.albums.values());
  }

  findById(id: string) {
    const album = this.albums.get(id);
    checkRecordExists(album);

    return album;
  }

  createAlbum(createAlbum: Album) {
    const newAlbum = new AlbumModel(
      createAlbum.name,
      createAlbum.year,
      createAlbum.artistId,
    );
    this.albums.set(newAlbum.id, newAlbum);

    return this.albums.get(newAlbum.id);
  }

  updateAlbum(id: string, updateAlbum: Album) {
    const album = this.albums.get(id);

    checkRecordExists(album);

    album.name = updateAlbum.name;
    album.year = updateAlbum.year;
    album.artistId = updateAlbum.artistId;

    this.albums.set(id, album);

    return this.albums.get(id);
  }
  deleteAlbum(id: string) {
    const album = this.albums.get(id);

    checkRecordExists(album);

    return this.albums.delete(id);
  }

  findAlbumsByArtistId(artistId: string) {
    return Array.from(this.albums.values()).filter(
      (album) => album.artistId === artistId,
    );
  }

  removeArtistFromAlbums(artistId: string) {
    const albums = this.findAlbumsByArtistId(artistId);
    albums.forEach((album) => {
      album.artistId = null;
    });
  }
}

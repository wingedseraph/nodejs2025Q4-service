import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AlbumModel } from '../album/album.model';
import { ArtistModel } from '../artist/artist.model';
import { TrackModel } from '../track/track.model';
import { checkEntityExistsById, checkRecordExistsById } from '../utils/checks';
import { FavoritesModel } from './favorites.model';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(FavoritesModel)
    private favoritesRepository: Repository<FavoritesModel>,
    @InjectRepository(ArtistModel)
    private artistRepository: Repository<ArtistModel>,
    @InjectRepository(AlbumModel)
    private albumRepository: Repository<AlbumModel>,
    @InjectRepository(TrackModel)
    private trackRepository: Repository<TrackModel>,
  ) {}

  private async getOrCreateFavorites() {
    const [favorites] = await this.favoritesRepository.find({
      relations: ['artists', 'albums', 'tracks'],
      take: 1,
    });

    if (!favorites) {
      const newFavorites = this.favoritesRepository.create({
        artists: [],
        albums: [],
        tracks: [],
      });
      return await this.favoritesRepository.save(newFavorites);
    }

    return favorites;
  }

  async findAll() {
    const favorites = await this.getOrCreateFavorites();
    return {
      artists: favorites.artists || [],
      albums: favorites.albums || [],
      tracks: favorites.tracks || [],
    };
  }

  async addTrack(trackId: string) {
    const track = await this.trackRepository.findOne({
      where: { id: trackId },
    });

    checkEntityExistsById(track, trackId);

    const favorites = await this.getOrCreateFavorites();
    const trackExists = favorites.tracks.some((track) => track.id === trackId);

    if (!trackExists) {
      favorites.tracks.push(track);
      await this.favoritesRepository.save(favorites);
    }
  }

  async addAlbum(albumId: string) {
    const album = await this.albumRepository.findOne({
      where: { id: albumId },
    });

    checkEntityExistsById(album, albumId);

    const favorites = await this.getOrCreateFavorites();
    const albumExists = favorites.albums.some((album) => album.id === albumId);

    if (!albumExists) {
      favorites.albums.push(album);
      await this.favoritesRepository.save(favorites);
    }
  }

  async addArtist(artistId: string) {
    const artist = await this.artistRepository.findOne({
      where: { id: artistId },
    });

    checkEntityExistsById(artist, artistId);

    const favorites = await this.getOrCreateFavorites();
    const artistExists = favorites.artists.some(
      (artist) => artist.id === artistId,
    );

    if (!artistExists) {
      favorites.artists.push(artist);
      await this.favoritesRepository.save(favorites);
    }
  }

  async deleteTrack(trackId: string) {
    const track = await this.trackRepository.findOne({
      where: { id: trackId },
    });

    checkRecordExistsById(track, trackId, 'Track not found');

    const favorites = await this.getOrCreateFavorites();
    const trackIndex = favorites.tracks.findIndex(
      (track) => track.id === trackId,
    );

    favorites.tracks.splice(trackIndex, 1);
    await this.favoritesRepository.save(favorites);
  }

  async deleteAlbum(albumId: string) {
    const album = await this.albumRepository.findOne({
      where: { id: albumId },
    });

    checkRecordExistsById(album, albumId, 'Album not found');

    const favorites = await this.getOrCreateFavorites();
    const albumIndex = favorites.albums.findIndex(
      (album) => album.id === albumId,
    );

    favorites.albums.splice(albumIndex, 1);
    await this.favoritesRepository.save(favorites);
  }

  async deleteArtist(artistId: string) {
    const artist = await this.artistRepository.findOne({
      where: { id: artistId },
    });

    checkRecordExistsById(artist, artistId, 'Artist not found');

    const favorites = await this.getOrCreateFavorites();
    const artistIndex = favorites.artists.findIndex(
      (artist) => artist.id === artistId,
    );

    favorites.artists.splice(artistIndex, 1);
    await this.favoritesRepository.save(favorites);
  }
}

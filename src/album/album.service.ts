import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { checkRecordExistsById } from '../utils/checks';
import { AlbumModel } from './album.model';
import { Album } from './types/album.types';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(AlbumModel)
    private albumRepository: Repository<AlbumModel>,
  ) {}

  async findAll() {
    return await this.albumRepository.find();
  }

  async findById(id: string) {
    const album = await this.albumRepository.findOne({ where: { id } });

    checkRecordExistsById(album, id);

    return album;
  }

  async createAlbum(createAlbum: Album) {
    const newAlbum = this.albumRepository.create({
      name: createAlbum.name,
      year: createAlbum.year,
      artistId: createAlbum.artistId ?? null,
    });

    const createdAlbum = await this.albumRepository.save(newAlbum);

    return createdAlbum;
  }

  async updateAlbum(id: string, updateAlbum: Album) {
    const album = await this.albumRepository.findOne({ where: { id } });

    checkRecordExistsById(album, id);

    album.name = updateAlbum.name;
    album.year = updateAlbum.year;
    album.artistId = updateAlbum.artistId ?? null;

    const updatedAlbum = await this.albumRepository.save(album);

    return updatedAlbum;
  }

  async deleteAlbum(id: string) {
    const result = await this.albumRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Album with ID ${id} not found`);
    }

    return true;
  }

  async findAlbumsByArtistId(artistId: string) {
    return await this.albumRepository.find({
      where: { artistId },
    });
  }

  async removeArtistFromAlbums(artistId: string) {
    const albums = await this.findAlbumsByArtistId(artistId);
    albums.forEach((album) => {
      album.artistId = null;
    });

    const updatedAlbums = await this.albumRepository.save(albums);
    return updatedAlbums;
  }
}

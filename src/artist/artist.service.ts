import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { checkRecordExistsById } from '../utils/checks';
import { ArtistModel } from './artist.model';
import { Artist } from './types/artist.types';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(ArtistModel)
    private artistRepository: Repository<ArtistModel>,
  ) {}

  async findAll() {
    const artists = await this.artistRepository.find();

    return artists;
  }

  async findById(id: string) {
    const artist = await this.artistRepository.findOne({ where: { id } });

    checkRecordExistsById(artist, id, 'Artist not found');

    return artist;
  }

  async createArtist(createArtist: Artist) {
    const artist = this.artistRepository.create(createArtist);
    const savedArtist = await this.artistRepository.save(artist);

    return savedArtist;
  }

  async updateArtist(id: string, updateArtist: Artist) {
    const artist = await this.findById(id);

    checkRecordExistsById(artist, id, 'Artist not found');

    const updatedArtist = await this.artistRepository.update(id, updateArtist);

    return updatedArtist;
  }
  async deleteArtist(id: string) {
    const result = await this.artistRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }

    return true;
  }
}

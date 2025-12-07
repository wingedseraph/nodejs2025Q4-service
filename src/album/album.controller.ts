import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { TrackService } from '../track/track.service';
import { AlbumService } from './album.service';
import { Album } from './types/album.types';

@Controller('album')
export class AlbumController {
  constructor(
    private readonly albumService: AlbumService,
    private readonly trackService: TrackService,
  ) {}
  @Get()
  findAll() {
    return this.albumService.findAll();
  }
  @Get(':id')
  findById(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.albumService.findById(id);
  }

  @Post()
  create(@Body() crateAlbum: Album) {
    return this.albumService.createAlbum(crateAlbum);
  }

  @Put(':id') updateAlbum(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateAlbum: Album,
  ) {
    return this.albumService.updateAlbum(id, updateAlbum);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    await this.trackService.removeAlbumFromTracks(id);
    await this.albumService.deleteAlbum(id);
  }
}

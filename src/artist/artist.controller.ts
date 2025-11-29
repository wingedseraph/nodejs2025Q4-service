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
import { AlbumService } from '../album/album.service';
import { TrackService } from '../track/track.service';
import { ArtistService } from './artist.service';
import { Artist } from './types/artist.types';

@Controller('artist')
export class ArtistController {
  constructor(
    private readonly artistService: ArtistService,
    private readonly trackService: TrackService,
    private readonly albumService: AlbumService,
  ) {}
  @Get()
  findAll() {
    return this.artistService.findAll();
  }
  @Get(':id')
  findById(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.artistService.findById(id);
  }

  @Post()
  create(@Body() createArtist: Artist) {
    return this.artistService.createArtist(createArtist);
  }

  @Put(':id') updatePassword(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateArtist: Artist,
  ) {
    return this.artistService.updateArtist(id, updateArtist);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    this.trackService.removeArtistFromTracks(id);
    this.albumService.removeArtistFromAlbums(id);
    this.artistService.deleteArtist(id);
  }
}

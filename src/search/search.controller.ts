import { Controller, Get, HttpCode, Param } from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private se: SearchService) {}

  @Get(':frase')
  async buscadata(@Param('frase') frase) {
    console.log(frase);
    return this.se.get(frase);
  }
}

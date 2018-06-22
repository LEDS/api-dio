import { Controller, Get, HttpCode, Param } from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
    constructor(private se : SearchService) {}
    @Get(':query')
    async latest(@Param('query') query){
        return  this.se.get(query)
    }
}

import { Controller, Get, HttpCode } from '@nestjs/common';
import { LatestService } from './latest.service';

@Controller('latest')
export class LatestController {
    constructor(private ls : LatestService) {}
    @Get()
    @HttpCode(200)
    async latest(){
        return  this.ls.get()
    }
}

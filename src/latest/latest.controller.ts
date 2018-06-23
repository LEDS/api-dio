import { Controller, Get, HttpCode,HttpException,HttpStatus } from '@nestjs/common';
import { LatestService } from './latest.service';

@Controller('latest')
export class LatestController {
    constructor(private ls : LatestService) {}
    @Get()
    @HttpCode(200)
    async search(){
        try{
            return this.ls.get()
        }catch(err){
            throw new HttpException({
                status: HttpStatus.InternalServerErrorException,
                error: 'Não há noticias no DIO',
              }, 400);
        }
        
    }
}

import { Controller, Get, HttpCode, HttpException, HttpStatus,Param} from '@nestjs/common';
import { DioService } from '../service/dio.service';
import { InformationNotFound } from '../model/exception/InformationNotFound';

@Controller()
export class DioController {

    constructor(
        private dioService: DioService)
    { }

    @Get('diarios')
    @HttpCode(200)
    async retornar_diarios() {
        try {
            return this.dioService.retornar_ultirmos_diarios();
        } catch (error) {
            throw new InformationNotFound();
        }
    }

    @Get('noticias')
    @HttpCode(200)
    async retornar_noticias() {
        try{
            return this.dioService.retornar_noticias();
        }catch (error){
            throw new InformationNotFound();
        }
    }
    @Get('busca/:query')
    async busca(@Param('query') query){
        try{
            return  this.dioService.buscar_diarios(query);
        }catch(error){
            throw new InformationNotFound();
        }
    }
}

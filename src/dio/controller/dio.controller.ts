import { Controller, Get, HttpCode, Param } from '@nestjs/common';
import { DioService } from '../service/dio.service';
import { ApiUseTags, ApiResponse } from '@nestjs/swagger';
import { InformationNotFound } from '../model/exception/InformationNotFound';
import { Dio } from '../model/dto/dio';
import { Noticia } from '../model/dto/noticia';

@Controller('dio/v1')
export class DioController {
    constructor(private dioService: DioService) { }

    @Get('/latest')
    @ApiUseTags('dio')
    @ApiResponse({ status: 200, description: 'Últimos Diários', type: Dio})
    @ApiResponse({ status: 204, description: 'Diarios não encontrados'})    
    async search() {
        try {
            return this.dioService.retornar_ultimas_noticias();
        } catch (error) {
            throw new InformationNotFound('Diarios não encontrados');
        }

    }
    
    @ApiUseTags('dio')
    @Get('/search/:frase')
    @ApiResponse({ status: 200, description: 'Noticias quye contenha a frase', type: Noticia})
    @ApiResponse({ status: 204, description: 'Noticicas não encontrados'}) 
    async buscafrase(@Param() params) {
        console.log(params.frase);
        console.log(params.di);
        console.log(params.df);
        return 'oi';
    }
    @ApiUseTags('dio')
    @Get('/search/:frase/:di/:df')
    @ApiResponse({ status: 200, description: 'Noticias que contenha a frase e esteja entre as datas', type: Noticia})
    @ApiResponse({ status: 204, description: 'Noticicas não encontrados'}) 
    async buscadata(@Param() params) {
        console.log(params.frase);
        console.log(params.di);
        console.log(params.df);
        return 'oi';
    }
    
    @ApiUseTags('dio')
    @Get('/noticias')
    @ApiResponse({ status: 200, description: 'Últimas noticias ', type: Noticia})
    @ApiResponse({ status: 204, description: 'Notiicas não encontrados'})   
    async noticias() {
        try {
            return this.dioService.realizar_paginacao(1)
        } catch (error) {
            throw new InformationNotFound('Notícias não encontradas');
        }

    }
}

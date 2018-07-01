import { Controller, Get, HttpCode, Param, HttpException, UseFilters } from '@nestjs/common';
import { DioService } from '../service/dio.service';
import { ApiUseTags, ApiResponse } from '@nestjs/swagger';
import { InformationNotFound } from '../model/exception/InformationNotFound';
import { Dio } from '../model/dto/dio';
import { Noticia } from '../model/dto/noticia';

@Controller('dio/v1')
export class DioController {
    constructor(private dioService: DioService) { }

    @Get('/recentes')
    @ApiUseTags('dio')
    @ApiResponse({ status: 200, description: 'Últimos Diários', type: Dio})
    @ApiResponse({ status: 204, description: 'Diarios não encontrados'})    
    async ultimas_noticias() {
        try {
            return this.dioService.retornar_ultimas_noticias();
        } catch (error) {
            throw new InformationNotFound('Diarios não encontrados');
        }
    }
    
    @ApiUseTags('dio')
    @Get('/busca/:frase')
    @ApiResponse({ status: 200, description: 'Noticias que contenha a frase', type: Noticia})
    @ApiResponse({ status: 204, description: 'Noticicas não encontrados'}) 
    async busca_frase(@Param() params) {
        try {
            return this.dioService.busca_simples(params.frase);
        } catch (error) {
            throw new InformationNotFound('');
        }
    }
    @ApiUseTags('dio')
    @Get('/busca/:frase/:di/:df')
    @ApiResponse({ status: 200, description: 'Noticias que contenha a frase e esteja entre as datas', type: Noticia})
    @ApiResponse({ status: 204, description: 'Noticicas não encontradas'}) 
    async busca_com_data(@Param() params) {
        try {
            return this.dioService.Busca_completa(params);
        } catch (error) {
            throw new InformationNotFound('Noticicas não encontrados');
        }
    }
    
    @ApiUseTags('dio')
    @Get('/noticias')
    @ApiResponse({ status: 200, description: 'Últimas noticias ', type: Noticia})
    @ApiResponse({ status: 204, description: 'Noticias não encontrados'})   
    async noticias() {
        try {
            return this.dioService.realizar_paginacao(1)  
        } catch (error) {
            throw new InformationNotFound('Notícias não encontradas');
        }
    }
    @ApiUseTags('dio')
    @Get('/noticias/:pg')
    @ApiResponse({ status: 200, description: 'Últimas noticias ', type: Noticia})
    @ApiResponse({ status: 204, description: 'Noticias não encontrados'})   
    async noticias_pagina(@Param() params) {
        try {
            return this.dioService.realizar_paginacao(params.pg)  
        } catch (error) {
            throw new InformationNotFound('Notícias não encontradas');
        }
    }
}

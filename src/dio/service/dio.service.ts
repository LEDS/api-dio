import { Injectable, HttpService } from '@nestjs/common';
import { Dio } from '../model/dto/dio';
import {Noticia} from '../model/dto/noticia'
import * as cheerio from 'cheerio';
import { InformationNotFound } from '../model/exception/InformationNotFound';
@Injectable()
export class DioService {
    private url_api = 'http://ioes.dio.es.gov.br/apifront/portal/edicoes/ultimas_edicoes/';
    private url_edicao = 'http://ioes.dio.es.gov.br/portal/edicoes/download/';
    private url_noticias = 'http://dio.es.gov.br/Noticias?page=';
    private url_busca = 'http://ioes.dio.es.gov.br/busca/busca/buscar/'

    constructor(private readonly httpService: HttpService) {}

    async retornar_ultimas_noticias(){
        const pagina = await this.retornar_pagina(this.url_api);        
        const lista = [];
        
        pagina.data.itens.forEach(element => {
            console.log()
            const noticia = new Dio(element.tipo_edicao_nome,this.url_edicao+element.id,element.data)
            lista.push(noticia)
        });

        if (lista.length > 0) return lista;

        throw new Error();
    }
    
    async busca_simples(frase) {       
       const pagina = await this.retornar_pagina(this.url_busca+frase+'/0/?sort=date')
       if (pagina.data.hits.total > 0)return pagina.data.hits;
       throw new Error();
      }
      async Busca_completa(query) {
        const pagina = await this.retornar_pagina(
            this.url_busca +'"'+
            query.frase +'"'+
            '/0/di:' +
            query.di +
            '/df:' +
            query.df +
            '/?sort=date')
        if (pagina.data.hits.total > 0) return pagina.data.hits;
        throw new Error;
      }

      async realizar_paginacao(quantPaginas){
        var listanoticias = []
         for (let index = 1; index <= quantPaginas; index++) {
           var noticias = await this.retornar_noticias(index)
           noticias.forEach(element => {
             listanoticias.push(element)
           });
         }
         return listanoticias
       }
       
       async retornar_noticias(numpagina){
          const pagina = await this.retornar_pagina(this.url_noticias+numpagina);

          const $ = cheerio.load(pagina.data);
          const titulos = this.buscar_titulos($);
          const datas = this.buscar_data($);
          const textos = this.buscar_texto($);
          const noticias = [];
     
          for (let index = 0; index < textos.length; index++) {
              const noticia = new Noticia(titulos[index], textos[index],datas[index]);
              noticias.push(noticia);
          }

          if (noticias.length > 0) {
              return noticias;
          }
          throw new Error('Error');
       
        }

       private buscar_texto($: any){
        const textos = $('.noticia .text-color-color.text-family-font-family');
        const texto = [];
        textos.text().split('\n').forEach(element => {
            if (element.length > 150) {
                texto.push(element.substring(16).substring(0, element.length - 26));
            }
        });
        return texto;
      }

    private buscar_data($: any){
        const data = [];
        const datas = $('div .text-color-color.text-family-font-family.published ');
        datas.toArray().forEach(element => {
            const div = element.firstChild.data.trimLeft().trimRight();
            data.push(div);
        });
        return data;
    }

    private buscar_titulos($: any){
        const titulos = $('a.link-color-color');
        const titulo = [];
        titulos.toArray().forEach(element => {
            const title = element.attribs.title;
            if ( title.length > 50 ){
                titulo.push(title);
            }
        });
        return titulo;
    }

    private async retornar_pagina(url:string){
        return this.httpService.get(url).toPromise();
     }
}

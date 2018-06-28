import { Injectable, HttpService } from '@nestjs/common';
import { Dio } from '../model/dto/dio';
import {Noticia} from '../model/dto/noticia'
import * as cheerio from 'cheerio';
@Injectable()
export class DioService {
    private url_api = 'http://ioes.dio.es.gov.br/apifront/portal/edicoes/ultimas_edicoes/';
    private url_edicao = 'http://ioes.dio.es.gov.br/portal/edicoes/download/';
    private url_noticias = 'http://dio.es.gov.br/Noticias?page=';
    private url_busca = 'http://ioes.dio.es.gov.br/busca#/p=1&q=';

    constructor(private readonly httpService: HttpService) {}

    async retornar_ultimas_noticias(){
        const pagina = await this.retornar_pagina(this.url_api);        
        const lista = [];
        
        pagina.data.itens.forEach(element => {
            const noticia = new Dio(element.description,element.url,this.url_edicao+element.data)
            lista.push(noticia)
        });

        if (lista.length > 0) return lista;

        throw new Error ();
    }

    async getSearch(frase) {
        const query = { frase: frase, di: '', df: '' };
        if (query.frase == '') {
          return { erro: 'Nenhuma query' };
        } else if (query.di == '' || query.df == '') {
          this.searchSimples(query);
        } else this.searchData(query);
      }
    
    async searchSimples(query) {       
        const pagina = await this.httpService
          .get(
            'http://ioes.dio.es.gov.br/busca/busca/buscar/' +
              query.frase +
              '/0/?sort=date',
          )
          .toPromise();
        return pagina.data;
      }
      async searchData(query) {
        console.log(query);
        const pagina =  await this.httpService
          .get(
            'http://ioes.dio.es.gov.br/busca/busca/buscar/' +
              query.frase +
              '/0/di:' +
              query.di +
              '/df:' +
              query.df +
              '/?sort=' +
              query.sort,
          )
          .toPromise();
        return pagina.data;
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

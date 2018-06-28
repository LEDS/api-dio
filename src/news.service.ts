import { Injectable, HttpService } from '@nestjs/common';
import { News } from 'news/news';
import * as cheerio from 'cheerio';
import { async } from 'rxjs/internal/scheduler/async';

@Injectable()
export class NewsService {
  constructor(private readonly httpService: HttpService) {}


  async paginas(quantPaginas){
   var listanoticias = []
    for (let index = 1; index <= quantPaginas; index++) {
      var noticias = await this.noticias(index)
      noticias.forEach(element => {
        listanoticias.push(element)
      });
    }
    return listanoticias
  }

  async noticias(numpagina){
    const pagina = await this.httpService
      .get('http://dio.es.gov.br/Noticias?page='+numpagina)
      .toPromise();
    const $ = cheerio.load(pagina.data);
    const noticias = [];
    var x = true;

    const titulos = $('a.link-color-color');
    const textos = $('.noticia .text-color-color.text-family-font-family');
    const datas = $('div .text-color-color.text-family-font-family.published ')

    const titulo = []
    const texto = []
    const data = []

    datas.toArray().forEach(element => {
      const div = element.firstChild.data.trimLeft().trimRight()
      data.push(div)
    });

    titulos.toArray().forEach(element => {
      const a = element.attribs.title
      if(a.length > 50){
        titulo.push(a)
      }
    });
    textos
    .text()
    .split('\n')
    .forEach(element => {
      if (element.length > 150) {
        texto.push(element.substring(16).substring(0, element.length - 26));
      }
    });
    for (let index = 0; index < texto.length; index++) {
      const etexto = texto[index];
      const etitulo = titulo[index]
      const edata = data[index]
      const noticia = new News()
      
      noticia.titulo = etitulo
      noticia.conteudo = etexto
      noticia.data = edata
      noticias.push(noticia)
    }
    return noticias;
  }
}

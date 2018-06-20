import { Controller, HttpService, Get, HttpCode } from '@nestjs/common';
import * as cheerio from 'cheerio';
import { text } from 'body-parser';

@Controller('news')
export class NewsController {
  constructor(private readonly httpService: HttpService) {}
  @Get()
  @HttpCode(200)
  async pega() {
    const pagina = await this.httpService
      .get('http://dio.es.gov.br/Noticias')
      .toPromise();
    const $ = cheerio.load(pagina.data);
    const titulos = [];
    const texto = [];

    var aux = $('a.link-color-color');
    console.log(aux.next().text());

    aux = $('.noticia .text-color-color.text-family-font-family');
    aux
      .text()
      .split('\n')
      .forEach(element => {
        if (element.length > 150) {
          texto.push(element.substring(16).substring(0, element.length - 26));
        }
      });
    const noticia = {
      titulos,
      texto,
    };
    noticia.texto = texto;
    noticia.titulos = titulos;

    return noticia;
    // return x;
  }
}

import { Controller, HttpService, Get, HttpCode } from '@nestjs/common';
import * as cheerio from 'cheerio';

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
    titulos.push($('.noticia .title-list').text());
    const aux = $('.noticia');

    console.log(aux.nextAll('text-color-color text-family-font-family'));

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

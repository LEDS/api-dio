import { Injectable, HttpService } from '@nestjs/common';

@Injectable()
export class SearchService {
  constructor(private readonly httpService: HttpService) {}

  async get(frase) {
    const query = { frase: frase, di: '', df: '' };
    if (query.frase == '') {
      return { erro: 'Nenhuma query' };
    } else if (query.di == '' || query.df == '') {
      this.getsimples(query);
    } else this.getdata(query);
  }

  async getsimples(query) {
    console.log(query);
    const pagina = await this.httpService
      .get(
        'http://ioes.dio.es.gov.br/busca/busca/buscar/' +
          query.frase +
          '/0/?sort=date',
      )
      .toPromise();
    return pagina.data;
  }
  async getdata(query) {
    console.log(query);
    const pagina = await this.httpService
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
}

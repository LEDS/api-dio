import { Injectable, HttpService } from '@nestjs/common';
import { Latest } from './latest';

@Injectable()
export class LatestService {
    constructor(private readonly httpService: HttpService) {}

    async get(){
        const pagina = await this.httpService
        .get('http://ioes.dio.es.gov.br/apifront/portal/edicoes/ultimas_edicoes/')
        .toPromise();
        const lista = []
        pagina.data.itens.forEach(element => {
            const noticia = new Latest()
            noticia.date = element.data
            noticia.description = element.tipo_edicao_nome
            noticia.url = 'http://ioes.dio.es.gov.br/portal/edicoes/download/'+element.id
            lista.push(noticia)
        });
      return lista
    }
}

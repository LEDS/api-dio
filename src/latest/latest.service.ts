import { Injectable, HttpService } from '@nestjs/common';
import { Noticia } from './dto/noticia';

@Injectable()
export class LatestService {

    private url_api = 'http://ioes.dio.es.gov.br/apifront/portal/edicoes/ultimas_edicoes/';
    private url_edicao = 'http://ioes.dio.es.gov.br/portal/edicoes/download/';
    
    constructor(private readonly httpService: HttpService) {}

    async get(){
        
        const pagina = await this.httpService.get(this.url_api)
        .toPromise();
        
        const noticias = [];

        pagina.data.itens.forEach(element => {
            
            const noticia = new Noticia()
            
            noticia.date = element.data
            noticia.description = element.tipo_edicao_nome
            noticia.url = this.url_edicao+element.id
            
            noticias.push(noticia)
        });
        
        if (noticias.length > 0) {
            return noticias
        }
        
        throw new Error('Error');    
    }
}

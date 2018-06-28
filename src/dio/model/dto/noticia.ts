import { ApiModelProperty } from "@nestjs/swagger";

export class Noticia {
    @ApiModelProperty()
    titulo: string
    @ApiModelProperty()
    conteudo :string
    @ApiModelProperty()
    data :string


    constructor(titulo: string, conteudo: string, data: string){
        this.titulo = titulo;
        this.conteudo = conteudo;
        this.data = data;
    }
}

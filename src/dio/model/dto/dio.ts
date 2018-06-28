import { ApiModelProperty } from '@nestjs/swagger';

export class Dio {
    @ApiModelProperty()
    readonly url: string
    @ApiModelProperty()
    readonly descricao :string
    @ApiModelProperty()
    readonly data :string

    constructor(descricao: string, url: string, data: string){
        this.descricao = descricao;
        this.url = url;
        this.data = data;
    }
}
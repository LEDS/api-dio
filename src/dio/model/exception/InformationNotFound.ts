import { HttpException, HttpStatus} from '@nestjs/common';
export class InformationNotFound extends HttpException {
    constructor(mensagem: string) {
      super(mensagem, HttpStatus.NO_CONTENT);
    }
  }
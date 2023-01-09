import { ResponseDTO } from './../common/dtos/common/ResponseDTO';
import { HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class ResponseHelper {
  response(data?, status?, error?) {
    return <ResponseDTO>{
      data: data,
      error: error,
      status: status ? status : HttpStatus.ACCEPTED,
      timestap: new Date().getTime(),
    };
  }
}

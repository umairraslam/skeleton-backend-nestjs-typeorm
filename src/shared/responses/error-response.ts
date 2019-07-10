import { ApiModelProperty } from '@nestjs/swagger';
import { NotFoundException } from '@nestjs/common';

export class ErrorResponse extends NotFoundException {

  @ApiModelProperty()
  description?: string;

}

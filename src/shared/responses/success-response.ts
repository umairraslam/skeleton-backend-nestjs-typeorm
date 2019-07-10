import { ApiModelProperty } from '@nestjs/swagger';

export class SuccessResponse {

  @ApiModelProperty()
  description?: string;

  constructor(description: string) {
    this.description = description;
  }

}

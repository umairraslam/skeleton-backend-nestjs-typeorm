import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UserDto {

    @ApiModelProperty({ required: true})
    @IsNotEmpty()
    name!: string;
}

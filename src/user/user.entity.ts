import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';

@Entity()
export class User {
    @ApiModelProperty()
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @ApiModelProperty({ required: true})
    @Column()
    name!: string;
}

import { Controller, Get, Post, Body, Param, ParseUUIDPipe, Put, NotFoundException, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UserDto } from './user.dto';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';
import { Any } from 'typeorm';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    getUsers(): Promise<User[]> {
        return this.userService.getUsers();
    }

    @Get('/:id')
    @ApiOkResponse({type: User})
    async getUser(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string): Promise<User | undefined> {
        const response = await this.userService.getUser(id);
        if (response === undefined) {
            throw new NotFoundException({ description: 'No User found with specified ID' });
        }
        return response;
    }

    @Post()
    @ApiCreatedResponse({ type: User })
    createSecureServer(@Body() userDto: UserDto): Promise<User> {
        return this.userService.createUser(userDto);
    }

    @Put(':id')
    @ApiOkResponse({ type: User })
    updateUser(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string, @Body() userDto: UserDto): Promise<User> {
        return this.userService.updateUser(id, userDto);
    }

    @Delete(':id')
    @ApiOkResponse({type: Any})
    async deleteAgent(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string): Promise<any> {
        const response = await this.userService.deleteUser(id);
        if (response.affected === 0) {
            throw new NotFoundException({ description: 'No User with specifiied ID' });
        }
        return {description: 'User deleted successfully!'};
    }
}

import { Controller, Get, Post, Body, Param, ParseUUIDPipe, Put, NotFoundException, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UserDto } from './user.dto';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiUseTags } from '@nestjs/swagger';
import { SuccessResponse, ErrorResponse } from '../shared/responses';

@Controller('user')
@ApiUseTags('Users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get('/')
    @ApiOkResponse({type: User, isArray: true})
    getUsers(): Promise<User[]> {
        return this.userService.getUsers();
    }

    @Get('/:id')
    @ApiOkResponse({type: User})
    @ApiNotFoundResponse({type: ErrorResponse})
    async getUser(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string): Promise<User | undefined> {
        const response = await this.userService.getUser(id);
        if (response === undefined) {
            throw new NotFoundException({ description: 'No User found with specified ID' });
        }
        return response;
    }

    @Post()
    @ApiCreatedResponse({ type: User })
    @ApiNotFoundResponse({type: ErrorResponse})
    createSecureServer(@Body() userDto: UserDto): Promise<User> {
        return this.userService.createUser(userDto);
    }

    @Put(':id')
    @ApiOkResponse({ type: User })
    @ApiNotFoundResponse({type: ErrorResponse})
    updateUser(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string, @Body() userDto: UserDto): Promise<User> {
        return this.userService.updateUser(id, userDto);
    }

    @Delete(':id')
    @ApiOkResponse({type: SuccessResponse})
    @ApiNotFoundResponse({type: ErrorResponse})
    async deleteAgent(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string): Promise<any> {
        const response = await this.userService.deleteUser(id);
        if (response.affected === 0) {
            throw new NotFoundException({ description: 'No User with specifiied ID' });
        }
        return new SuccessResponse('User deleted successfully!');
    }
}

import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { UserDto } from './user.dto';
import { DeleteResult } from 'typeorm';

@Injectable()
export class UserService {

    constructor(private userRepistory: UserRepository) {}

    getUsers(): Promise<User[]> {
        return this.userRepistory.getUsers();
    }

    getUser(id: string): Promise<User | undefined> {
        return this.userRepistory.getUser(id);
    }

    async createUser(userDto: UserDto): Promise<User> {
        return this.userRepistory.createUser(userDto);
    }

    async updateUser(id: string, userDto: UserDto): Promise<User> {
        return this.userRepistory.updateUser(id, userDto);
    }

    deleteUser(id: string): Promise<DeleteResult> {
        return this.userRepistory.deleteUser(id);
    }
}

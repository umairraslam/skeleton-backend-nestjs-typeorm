import { Repository, EntityRepository, DeleteResult } from 'typeorm';
import { User } from './user.entity';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { UserDto } from './user.dto';

@Injectable()
@EntityRepository(User)
export class UserRepository extends Repository<User> {

    getUsers(): Promise<User[]> {
        return this.find();
    }

    getUser(id: string): Promise<User | undefined> {
        return this.findOne(id);
    }

    async createUser(user: UserDto): Promise<User> {
        try {
            return await this.save(user);
        } catch (e) {
            Logger.error(e.message);
            throw new NotFoundException({description: e.message});
        }
    }

    async updateUser(id: string, user: UserDto): Promise<User> {
        try {
            const exists: User | undefined = await this.getUser(id);
            if (exists === undefined) {
                throw new NotFoundException({description: 'No User found with specified ID'});
            }
            return await this.save({id, ...user});
        } catch (e) {
            throw new Error('Unable to update User');
        }
    }

    deleteUser(id: string): Promise<DeleteResult> {
        return this.delete(id);
    }
}

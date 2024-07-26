import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Followers } from './entity/followers.entity';
import { FollowersDto } from './dto/followers.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class FollowersService {
    constructor(
        @InjectRepository(Followers)
        private readonly followersRepository: Repository<Followers>,
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>
        ) {}

    async follow({ userUuid, UuidUserToFollow }: FollowersDto): Promise<Followers> {
        const user = await this.usersRepository.findOne({
            where: {uuid: userUuid}
        });
        const UserToFollow = await this.usersRepository.findOne({
            where: {uuid: UuidUserToFollow}
        });
        if(!user || !UserToFollow) {
            throw new HttpException('User not found', HttpStatus.BAD_GATEWAY);
        }
        const follow = await this.followersRepository.create({
            uuid: userUuid,
            follow: UuidUserToFollow
        });
        return await this.followersRepository.save(follow);
    }

    async followers(userUuid: string): Promise<Followers[]> {
        const followers = await this.followersRepository.find({
            where: { follow: userUuid }
        });
        if(!followers) {
            throw new HttpException('Followers not found', HttpStatus.BAD_GATEWAY);
        }
        return followers;
    }
}

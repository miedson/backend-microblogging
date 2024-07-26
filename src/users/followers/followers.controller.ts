import { Controller, Get, HttpCode, Param } from '@nestjs/common';
import { FollowersService } from './followers.service';
import { FollowersDto } from './dto/followers.dto';
import { Followers } from './entity/followers.entity';
import { NotificationGateway } from 'src/gateways/notification/notification.gateway';
import { UsersService } from '../users.service';

@Controller('followers')
export class FollowersController {
  constructor(private readonly followersService: FollowersService,
    private readonly notificationGateway: NotificationGateway,
    private readonly userService: UsersService
    ) {}

  @Get('follow/:userUuid/:UuidUserToFollow')
  @HttpCode(201)
  async follow(@Param() { userUuid, UuidUserToFollow }: FollowersDto) {
    const follow = await this.followersService.follow({ userUuid, UuidUserToFollow });
    const { username } = await this.userService.findByUuid(userUuid);
    if(follow && username) {
      this.notificationGateway.sendNotificationForUser(UuidUserToFollow, 'follow', `Usuário ${username} começou a seguir você`);
    }
  }

  @Get(':userUuid')
  followers(@Param() { userUuid }: FollowersDto): Promise<Followers[]> {
    return this.followersService.followers(userUuid);
  }
}

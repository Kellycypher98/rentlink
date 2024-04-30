import { Injectable } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'
import { SocketService } from '@server/libraries/socket'
import { LeaseApplicationEvent } from '@server/modules/lease/application'
import { AuthorizationDomainFacade } from '@server/modules/authorization/domain'
import {
  Notification,
  NotificationDomainFacade,
} from '@server/modules/notification/domain'

@Injectable()
export class NotificationLeaseSubscriber {
  constructor(
    private notificationDomainFacade: NotificationDomainFacade,
    private authorizationDomainFacade: AuthorizationDomainFacade,
    private socketService: SocketService,
  ) {}

  @OnEvent(LeaseApplicationEvent.LeaseCreated.key)
  async handleCreation(data: LeaseApplicationEvent.LeaseCreated.Payload) {
    const values: Partial<Notification> = {
      title: 'Admin',
      message: 'A new lease has been created',
      senderName: 'API',
    }

    const role =
      await this.authorizationDomainFacade.role.findOneByNameOrFail('admin')

    for (const { userId } of role.roleUsers) {
      const isCreator = userId === data.userId

      if (isCreator) {
        continue
      }

      const notification = await this.notificationDomainFacade.create({
        ...values,
        userId,
      })

      this.socketService.send(userId, 'notification.created', notification)
    }
  }
}

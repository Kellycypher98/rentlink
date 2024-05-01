import { User } from '../user';

export class Notification {
  constructor() {
    this.id = '';
    this.title = '';
    this.message = '';
    this.senderName = undefined;
    this.senderEmail = undefined;
    this.senderPictureUrl = undefined;
    this.redirectUrl = undefined;
    this.userId = '';
    this.user = undefined;
    this.dateCreated = '';
  }
}

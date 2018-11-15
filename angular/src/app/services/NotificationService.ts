import { Injectable } from '@angular/core';
import * as models from '../models'
import { INotification } from '../models';

@Injectable()
export class NotificationService {
	
	notifications: models.INotification<any>[] = [];

	constructor() {
	}

	pushUserNotif(notification): Promise<INotification<any>[]> {
		this.notifications.push(<models.UserNotification>{ tag: "User",  instance: <models.User>notification, enable:true });
		return new Promise<models.INotification<any>[]> ( (resolve) => { resolve(this.notifications); })
	}

	pushChannelNotif(notification): Promise<INotification<any>[]> {
		this.notifications.push(<models.ChannelNotification>{ tag: "Channel",  instance: <models.Channel>notification, enable:true });
		return new Promise<models.INotification<any>[]> ( (resolve) => { resolve(this.notifications); })
	}

	pushCommentNotification(notification): Promise<INotification<any>[]> {
		this.notifications.push(<models.CommentNotification>{ tag: "Comment",  instance: <models.Comment>notification, enable:true });
		return new Promise<models.INotification<any>[]> ( (resolve) => { resolve(this.notifications); })
	}

	pushPostNotification(notification): Promise<INotification<any>[]> {
		this.notifications.push(<models.PostNotification>{ tag: "Post",  instance: <models.Post>notification, enable:true });
		return new Promise<models.INotification<any>[]> ( (resolve) => { resolve(this.notifications); })
	}
	
	pushLikeNotification(notification): Promise<INotification<any>[]> {
		this.notifications.push(<models.LikeNotification>{ tag: "Like",  instance: <models.Like>notification, enable:true });
		return new Promise<models.INotification<any>[]> ( (resolve) => { resolve(this.notifications); })
	}
}


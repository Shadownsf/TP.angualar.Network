import { Injectable } from '@angular/core';
import * as models from '../models'
import { INotification } from '../models';

@Injectable()
export class NotificationService {
	
	notifications: models.INotification<any>[] = [];

	constructor() {
	}

	pushUserNotif(notification): Promise<INotification<any>[]> {
		this.notifications.push(<models.UserNotification>{ id: notification.id, type: "User",  instance: <models.User>notification });
		localStorage.setItem( String(notification.id), "User");

		return new Promise<models.INotification<any>[]> ( (resolve) => { resolve(this.notifications); });
	}

	pushChannelNotif(notification): Promise<INotification<any>[]> {
		this.notifications.push(<models.ChannelNotification>{ id: notification.id, type: "Channel",  instance: <models.Channel>notification });
		localStorage.setItem( String(notification.id), "Channel");

		return new Promise<models.INotification<any>[]> ( (resolve) => { resolve(this.notifications); })
	}

	pushCommentNotification(notification): Promise<INotification<any>[]> {
		this.notifications.push(<models.CommentNotification>{ id: notification.id, type: "Comment",  instance: <models.Comment>notification });
		localStorage.setItem( String(notification.id), "Comment");

		return new Promise<models.INotification<any>[]> ( (resolve) => { resolve(this.notifications); });
	}

	pushPostNotification(notification): Promise<INotification<any>[]> {
		this.notifications.push(<models.PostNotification>{ id: notification.id, type: "Post",  instance: <models.Post>notification });
		localStorage.setItem( notification.id, "Post");

		return new Promise<models.INotification<any>[]> ( (resolve) => { resolve(this.notifications); });
	}
	
	pushLikeNotification(notification): Promise<INotification<any>[]> {
		this.notifications.push(<models.LikeNotification>{ id: notification.id, type: "Like",  instance: <models.Like>notification });
		localStorage.setItem( String(notification.id), "Like");

		return new Promise<models.INotification<any>[]> ( (resolve) => { resolve(this.notifications); });
	}

	clear() {
		try {
			this.notifications = [];
			localStorage.clear();
		} catch(e) {
			throw("the clear not working"); // <--put an error message here
		}
	}
	
	pop(id) {

		try {
			this.notifications.splice( this.notifications.indexOf(id), 1 );
			localStorage.removeItem(id);
		} catch(e) {
			throw("delete not working "); // <--put an error message here
		}
	}
}


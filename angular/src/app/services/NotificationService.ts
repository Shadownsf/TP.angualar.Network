import { Injectable } from '@angular/core';
import { User, Post, Like, Comment, Channel } from '../models'

@Injectable()
export class NotificationService {

	User:[{ id:number, type:User, enable:boolean }];
	Channel:[{ id:number, type:Channel, enable:boolean }];
	Post:[{ id:number, type:Post, enable:boolean }];
	Comment:[{ id:number, type:Comment, enable:boolean }];
	Like:[{ id:number, type:Like, enable:boolean }];

	constructor() {
	}

	pushUserNotif(notification): Promise<Object> {
		this.User.push({ id: notification.id,  type: <User>notification, enable:true });
		return new Promise<Object>( (resolve) => { resolve(this.User); })
	}

	pushChannelNotif(notification): Promise<Object> {
		this.Channel.push({ id: notification.id,  type: <Channel>notification, enable:true });
		return new Promise<Object>( (resolve) => { resolve(this.Channel); })
	}

	pushCommentNotification(notification): Promise<Object> {
		this.Comment.push({ id: notification.id,  type: <Comment>notification, enable:true });
		return new Promise<Object>( (resolve) => { resolve(this.Comment); })
	}

	pushPostNotification(notification): Promise<Object> {
		this.Post.push({ id: notification.id,  type: <Post>notification, enable:true });
		return new Promise<Object>( (resolve) => { resolve(this.Post); })
	}
	
	pushLikeNotification(notification): Promise<Object> {
		this.Like.push({ id: notification.id,  type: <Like>notification, enable:true });
		return new Promise<Object>( (resolve) => { resolve(this.Like); })
	}
}


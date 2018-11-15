import { Component, OnInit } from '@angular/core';
import { PostSocketService, NotificationService } from 'services';
import { Post, User, Channel, Like, Comment } from 'models';

@Component({
    selector: 'notification-bar',
    templateUrl: 'notification-bar.html'
})
export class NotificationBarComponent implements OnInit {
    User: Promise<Object>;
	Channel: Promise<Object>;
	Post: Promise<Object>;
	Comment: Promise<Object>;
	Like: Promise<Object>;
    
    constructor(
        private postSocket: PostSocketService,
        private notificationService: NotificationService
    ) { }

    ngOnInit() {
        this.postSocket.onUserConnect((user: User) => {
            this.User = this.notificationService.pushUserNotif(user)
        });
        this.postSocket.onNewChannel((channel: Channel) => {
            this.Channel = this.notificationService.pushChannelNotif(channel);
        });
        this.postSocket.onPost((post: Post) => {
            this.Post = this.notificationService.pushPostNotification(post);
        });
        this.postSocket.onLike((like: Like) => {
            this.Comment = this.notificationService.pushLikeNotification(like);
        });
        this.postSocket.onComment((comment: Comment) => {
            this.Like = this.notificationService.pushCommentNotification(comment);
        });
     }
}

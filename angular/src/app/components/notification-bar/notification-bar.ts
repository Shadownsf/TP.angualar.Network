import { Component, OnInit } from '@angular/core';
import { PostSocketService, NotificationService } from 'services';
import { Post, User, Channel, Like, Comment } from 'models';

@Component({
    selector: 'notification-bar',
    templateUrl: 'notification-bar.html'
})
export class NotificationBarComponent implements OnInit {
    Users: Promise<Object>;
	Channels: Promise<Object>;
	Posts: Promise<Object>;
	Comments: Promise<Object>;
	Likes: Promise<Object>;
    
    constructor(
        private postSocket: PostSocketService,
        private notificationService: NotificationService
    ) { }

    ngOnInit() {
        this.postSocket.onUserConnect((user: User) => {
            this.Users = this.notificationService.pushUserNotif(user)
        });
        this.postSocket.onNewChannel((channel: Channel) => {
            this.Channels = this.notificationService.pushChannelNotif(channel);
        });
        this.postSocket.onPost((post: Post) => {
            this.Posts = this.notificationService.pushPostNotification(post);
        });
        this.postSocket.onLike((like: Like) => {
            this.Comments = this.notificationService.pushLikeNotification(like);
        });
        this.postSocket.onComment((comment: Comment) => {
            this.Likes = this.notificationService.pushCommentNotification(comment);
        });
     }
}

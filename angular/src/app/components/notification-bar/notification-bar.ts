import { Component, OnInit } from '@angular/core';
import { PostSocketService, NotificationService } from 'services';
import { Post, User, Channel, Like, Comment, INotification } from 'models';

@Component({
    selector: 'notification-bar',
    templateUrl: 'notification-bar.html'
})
export class NotificationBarComponent implements OnInit {
    notifications: Promise<INotification<any>[]>;
  
    
    constructor(
        private postSocket: PostSocketService,
        private notificationService: NotificationService
    ) { }

    ngOnInit() {
        this.postSocket.onUserConnect((user: User) => {
            this.notifications = this.notificationService.pushUserNotif(user);

            this.notifications.then((notification)=>{
            });
        });
        this.postSocket.onNewChannel((channel: Channel) => {
            this.notifications = this.notificationService.pushChannelNotif(channel);
        });
        this.postSocket.onPost((post: Post) => {
            this.notifications = this.notificationService.pushPostNotification(post);
        });
        this.postSocket.onLike((like: Like) => {
            this.notifications = this.notificationService.pushLikeNotification(like);
        });
        this.postSocket.onComment((comment: Comment) => {
            this.notifications = this.notificationService.pushCommentNotification(comment);
        });
     }
}

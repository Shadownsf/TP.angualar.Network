import { Component, OnInit } from '@angular/core';
import { PostSocketService, NotificationService } from 'services';
import { Post, User, Channel, Like, Comment, INotification,NotificationView } from 'models';

@Component({
    selector: 'notification-bar',
    templateUrl: 'notification-bar.html'
})
export class NotificationBarComponent implements OnInit {
    notificationsPromise: Promise<INotification<any>[]>;
    notifications: NotificationView[]=[];
    
    constructor(
        private postSocket: PostSocketService,
        private notificationService: NotificationService
    ) { }

    ngOnInit() {
        this.postSocket.onUserConnect((user: User) => {
            this.notificationsPromise = this.notificationService.pushUserNotif(user)
        });
        this.postSocket.onNewChannel((channel: Channel) => {
            this.notificationsPromise = this.notificationService.pushChannelNotif(channel);
        });
        this.postSocket.onPost((post: Post) => {
            this.notificationsPromise = this.notificationService.pushPostNotification(post);
            this.notificationsPromise.then((notificationsStored) => {
                notificationsStored.map(notification=>{
                    this.notifications.push({
                        user: notification.instance.user.username,
                        action: "à posté dans",
                        channelName: notification.instance.channel.name,
                        channelId: notification.instance.channel.id,
                        creationTime: notification.instance.creationTime,
                        targetId: notification.instance.id
                    });
                })
            });
        });
        this.postSocket.onLike((like: Like) => {
            this.notificationsPromise = this.notificationService.pushLikeNotification(like);
        });
        this.postSocket.onComment((comment: Comment) => {
            this.notificationsPromise = this.notificationService.pushCommentNotification(comment);
        });
     }
}

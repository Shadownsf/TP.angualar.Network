export class UserLogin {
    username: string;
    password: string;
}

export interface AuthenticationResult {
    succeeded: boolean;
    accessToken?: string;
    user?: AuthenticatedUser;
}

export class UserRegistration {
    username: string;
    password: string;
    email?: string;
    pictureUrl?: string;
}

export class User {
    id: string;
    username: string;
    pictureUrl: string;
}

export class AuthenticatedUser {
    id: string;
    username: string;
    accessToken: string;
    pictureUrl: string;
}
export interface Channel {
    id: string;
    name: string;
}
export class Post {
    id: string;
    user: User;
    channel: Channel;
    creationTime: number;
    liked: boolean;
    message: string;
    content?: PostContent<any>[];
    comments: Comment[];
}

export class Comment extends Post {
    post?: Post;
}

export class Like {
    user: User;
    creationTime: number;
    id: string;
    post: Post;
}

export class NotificationView {
    user: string;
    action: string;
    channelName: string;
    channelId: string;
    creationTime: number;
    targetId: string;
}

export abstract class PostContent<T> {
    type: string;
    value: T;

    constructor();
    constructor(type: string, content: T);
    constructor(type?: string, content?: T) {
        this.type = type;
        this.value = content;
    }
}

export interface MediaContent {
    mediaUrl: string;
}

export interface YoutubeContent {
    videoId: string;
}

export class VideoPostContent extends PostContent<MediaContent> {
    constructor(videoUrl: string) {
        super('video', {
            mediaUrl: videoUrl
        });
    }
}

export class PicturePostContent extends PostContent<MediaContent> {
    constructor(pictureUrl: string) {
        super('picture', {
            mediaUrl: pictureUrl
        });
    }
}

export class YoutubePostContent extends PostContent<YoutubeContent> {
    constructor(videoId: string) {
        super('youtube', {
            videoId: videoId
        });
    }
}

export abstract class INotification<T> {
    tag: string;
    instance: T;
    enable: boolean;

    constructor(tag: string, instance: T, enable: boolean)
    constructor(tag: string, instance: T, enable: boolean= true) {
        this.tag = tag;
        this.instance = instance;
        this.enable = enable;
    }
}

export class UserNotification extends INotification<User>{
}

export class ChannelNotification extends INotification<Channel>{
}

export class PostNotification extends INotification<Post>{
}

export class LikeNotification extends INotification<Like>{
}

export class CommentNotification extends INotification<Comment>{
}
import { Component, Input } from '@angular/core';
import { Post, Comment, Like } from 'models';
import { PostService, PostSocketService, LoggedUser, MessageParser } from 'services';

/**
 * Affiche les poste
 */
@Component({
  selector: 'post',
  templateUrl: 'post.html'
})
export class PostComponent { 
    @Input() post: Post;
    
    constructor(
        private postSocket: PostSocketService, 
        private user: LoggedUser,
        private postService: PostService,
        private parser: MessageParser
    ) {}

    ngOnInit() {
        // détermine le bon type de contenu
        this.post.content = this.parser.parse(this.post);
        //nettoie les messages de leur contenu parsé s'il y en a
        if(this.post.content!=null) this.post.message = this.parser.clean(this.post);
        //abonnement aux nouvaux commentaire ou aux likes
        this.postSocket.onComment((comment: Comment) => {
            if (comment.post.id == this.post.id) {
                this.post.comments.push(comment);
            }
        });

        this.postSocket.onLike((like:Like)=>{
            if(like.post.id == this.post.id) this.post.liked = true;
        });
    }

    onComment(message: string) {
        this.postService.comment(this.post, message);
    }

    onLike(post:Post)
    {
        this.postService.like(post);
    }
}

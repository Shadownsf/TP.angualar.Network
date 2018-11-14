import { Component, Input } from '@angular/core';
import { Post, Comment } from 'models';
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
        this.postSocket.onComment((comment: Comment) => {
            console.log('post.id:', this.post.id);
            console.log('comment.id:', comment.post.id);

            if (comment.post.id === this.post.id) {
                this.post.comments.push(comment);
            }
        })
    }
    

    onComment(message: string) {
        this.postService.comment(this.post, message);
    }
}

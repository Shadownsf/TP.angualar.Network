import { Component, Input } from '@angular/core';
import { Comment } from 'models';
import { MessageParser } from 'services';


/**
 * Affiche le commentaire d'un post
 */
@Component({
    templateUrl: 'post-comment.html',
    selector: 'post-comment'
})
export class PostCommentComponent{
    @Input() comment: Comment;
    constructor(
        private parser: MessageParser
    ) {}
    ngOnInit() {
        // détermine le bon type de contenu
        this.comment.content = this.parser.parse(this.comment);
        //nettoie les messages de leur contenu parsé s'il y en a
        if(this.comment.content!=null) this.comment.message = this.parser.clean(this.comment);
    }
}
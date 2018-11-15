import { Component, Input } from '@angular/core';
import { PostContent } from 'models';

/**
 * Affiche les contenus
 */
@Component({
  selector: 'post-content',
  templateUrl: 'post-content.html'
})
export class PostContentComponent { 
    @Input() contents: PostContent<any>[];
}

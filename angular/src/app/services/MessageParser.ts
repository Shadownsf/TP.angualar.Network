import {
    Post,
    PostContent,
    YoutubePostContent,
    PicturePostContent,
    VideoPostContent
}
    from '../models';

const youtube = "https://youtu.be/";
const pictureRegex = /http[s]?:\/\/.+\.(jpeg|png|jpg|gif)/gmi;
const videoRegex = /http[s]?:\/\/.+\.(mp4|ogg|avi)/gmi;
const youtubeRegex = /(http[s]?:\/\/)?www\.(?:youtube\.com\/\S*(?:(?:\/e(?:mbed))?\/|watch\/?\?(?:\S*?&?v\=))|youtu\.be\/)([a-zA-Z0-9_-]{6,11})/gmi;
//const urlRegex =/http[s]?:\/\/.+\.[a-z0-9]+\/?/gmi;

/**
 * Parse le contenu d'un post pour en extraire le texte, les images, les vidéos et les liens Youtube.
 */
export class MessageParser {

    parse(post: Post): PostContent<any> {
        const pictureMatche = pictureRegex.exec(post.message);
        if (pictureMatche) {
            // retourner une instance de PicturePostContent
            return new PicturePostContent(pictureMatche[0]);
            
        }
        const videoMatche = videoRegex.exec(post.message);
        if (videoMatche) {
            // retourner une instance de VideoPostContent si match
            return new VideoPostContent(videoMatche[0])
        }
        const youtubeMatche = youtubeRegex.exec(post.message);
        if (youtubeMatche) {
            // retourner une instance de YoutubePostContent si match
            return new YoutubePostContent(youtubeMatche[2]);
        }
        return null;
    }
    clean(post: Post):string {
        //loop quand il y aura plusieurs type/fois de contenu
        return post.message.replace(eval(post.content.type+"Regex"),'');
    }
    /*
    addUrlHtml(post :Post):string{
        const urlMatche = urlRegex.exec(post.message);
        console.log(urlMatche);
        if(urlMatche)
        {
            return post.message.replace(urlRegex,'<a href="'+urlMatche[0]+'">'+urlMatche[0]+'</a>')
        }
        return post.message;
    }*/
}

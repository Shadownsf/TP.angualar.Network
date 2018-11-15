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

    parse(post: Post): PostContent<any>[] {
        var postContents:PostContent<any>[]=[];

        // retourner DES instanceS de PicturePostContent
        var pictureMatche;
        while ((pictureMatche = pictureRegex.exec(post.message)) !== null) {
            postContents.push(new PicturePostContent(pictureMatche[0]));
            }
        // retourner DES instanceS de VideoPostContent si match
        var videoMatche;
        while ((videoMatche = videoRegex.exec(post.message)) !== null) {
            postContents.push(new VideoPostContent(videoMatche[0]));
            }
        // retourner DES instanceS de YoutubePostContent si match
        var youtubeMatche;
        while ((youtubeMatche = youtubeRegex.exec(post.message)) !== null) {
            postContents.push(new YoutubePostContent(youtubeMatche[0]));
            }
        return postContents;
    }
    clean(post: Post):string {
        //loop quand il y aura plusieurs type/fois de contenu
        let contentTypes = post.content.map(content=>content.type);
        contentTypes.map(contentType=>{ 
            post.message = post.message.replace(eval(contentType+"Regex"),'');
        })
        return post.message;
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

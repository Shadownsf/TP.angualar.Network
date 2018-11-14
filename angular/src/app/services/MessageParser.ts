import {
    Post,
    PostContent,
    YoutubePostContent,
    PicturePostContent,
    VideoPostContent
}
    from '../models';

const youtube = "https://youtu.be/";

/**
 * Parse le contenu d'un post pour en extraire le texte, les images, les vidéos et les liens Youtube.
 */
export class MessageParser {

    parse(post: Post): PostContent<any> {
        const pictureRegex = /http[s]?:\/\/.+\.(jpeg|png|jpg|gif)/gmi;
        const pictureMatche = pictureRegex.exec(post.message);
        if (pictureMatche) {
            // retourner une instance de PicturePostContent
            //console.log("its a picture : ", pictureMatche[0]);
            //post.message.replace(pictureMatche[0],'');
            return new PicturePostContent(pictureMatche[0]);
            
        }

        const videoRegex = /http[s]?:\/\/.+\.(mp4|ogg|avi)/gmi;
        const videoMatche = videoRegex.exec(post.message);
        if (videoMatche) {
            // retourner une instance de VideoPostContent si match
            console.log("its a video :",videoMatche[0]);
            return new VideoPostContent(videoMatche[0])
             
        }
        const youtubeRegex = /(http[s]?:\/\/)?www\.(?:youtube\.com\/\S*(?:(?:\/e(?:mbed))?\/|watch\/?\?(?:\S*?&?v\=))|youtu\.be\/)([a-zA-Z0-9_-]{6,11})/gmi;
        const youtubeMatche = youtubeRegex.exec(post.message);
        if (youtubeMatche) {
            // retourner une instance de YoutubePostContent si match
            console.log("its a youtube video !",youtubeMatche[2]);
            //let temp =new YoutubePostContent(youtubeMatche[2]);
            //console.log(temp);
            return new YoutubePostContent(youtubeMatche[2]);
        }
        return null;
    }
}

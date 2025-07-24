import postModel from '../models/post.model.js';

export async function createPost(data){

    const { image, caption, mentions, user } = data;

    const post = await postModel.create({
        image,
        caption,
        mentions,
        user
    });

    return post;
}
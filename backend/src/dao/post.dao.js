import postModel from '../models/post.model.js';

export async function createPost(data) {

    const { image, caption, mentions, user } = data;

    const post = await postModel.create({
        image,
        caption,
        mentions,
        user
    });

    return post;
}

export async function getPosts(skip = 0, limit = 10) {

    const posts = await postModel
        .find()
        .sort({ createdAt: -1 })        // newest first
        .skip(skip)
        .limit(limit)

    return posts
}
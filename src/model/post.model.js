import {Schema, model} from "mongoose";

const postSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'comment'
  }],
  tags: [String]
});

const Post = model('post', postSchema);

export default Post;

export async function createPost(post) {
  const newEntry = new Post(post);
  const entry = await newEntry.save();
  return entry;
};

export async function addCommentsToPostById(postId, commentId) {
  const updatedPost = await Post.findByIdAndUpdate(
    {_id: postId},
    {$push: {comments: commentId}},
    {new: true}
  );
  return updatedPost;
};

export async function findPostById(postId) {
  const post = await Post.findById(postId).populate("comments");
  return post;
};


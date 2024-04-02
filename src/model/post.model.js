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
    ref: 'comments'
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

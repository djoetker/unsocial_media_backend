import {Schema, model} from "mongoose";

const commentSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: 'post'
  }
});

commentSchema.index({post: 1});

const Comment = model('comment', commentSchema);

export default Comment;

export async function createNewComment(comment) {
  const newEntry = new Comment(comment);
  const entry = await newEntry.save();
  return entry;
};
import { ObjectId } from "mongodb";
import { Schema, model } from "mongoose";

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
postSchema.index({ content: 'text' });
export default Post;

export async function createPost(post) {
  const newEntry = new Post(post);
  const entry = await newEntry.save();
  return entry;
};

export async function addCommentsToPostById(postId, commentId) {
  const updatedPost = await Post.findByIdAndUpdate(
    { _id: postId },
    { $push: { comments: commentId } },
    { new: true }
  );
  return updatedPost;
};

export async function findPostById(postId) {
  const post = await Post.findById(postId).populate("comments");
  return post;
};


export async function findRandomPosts(previousPostIds = []) {
  const prevIds = previousPostIds.map((id) => new ObjectId(id));
  const posts = await Post.aggregate([
    { $match: { _id: { $nin: prevIds } } },
    { $sample: { size: 8 } }
  ]);
  const fetchedPostIds = posts.map(post => post._id);
  const updatedPostIds = [...previousPostIds, ...fetchedPostIds];
  return { posts, updatedPostIds };
};

export async function updatePosts(previousPostIds = []) {
  const prevIds = previousPostIds.map((id) => new ObjectId(id));
  const response = await Post.aggregate([
    {
      $match: {
        _id: {
          $in: prevIds
        }
      }
    },
    {
      $facet: {
        order: [
          { $match: { _id: { $in: prevIds } } },
          { $addFields: { __order: { $indexOfArray: [prevIds, "$_id"] } } },
          { $sort: { __order: 1 } }
        ]
      }
    },
    { $unwind: "$order" },
    { $replaceRoot: { newRoot: "$order" } }
  ]);
  return response;
};

export async function searchPosts(previousPostIds = [], searchQuery) {
  try {
    const posts = await Post.find({
      $or: [
        { content: { $regex: new RegExp("\\b" + searchQuery + "\\b", "i") } },
        { tags: searchQuery }
      ],
      _id: { $nin: previousPostIds }
    }).limit(4);
    const fetchedPostIds = posts.map(post => post._id);
    const updatedPostIds = [...previousPostIds, ...fetchedPostIds];
    return { updatedPostIds, posts };
  } catch (error) {
    console.error("Error searching posts:", error);
    throw error;
  };
};

import { addCommentsToPostById, createPost, findPostById } from "../model/post.model.js";
import { createNewComment } from "../model/comment.model.js";

export async function postNewPost(req, res) {
    const {content, tags} = req.body;

  try {
    const tagsArray = tags.split(" ").filter(word => word.startsWith("#"));

    const newDate = new Date();

    const newEntry = {
      content,
      date: newDate,
      tags: tagsArray
    };

    const entry = await createPost(newEntry);

    res.status(201).send(entry);

  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  };
};

export async function postNewComment(req, res) {
  const {postId} = req.params;
  const {content} = req.body;

 try {
  const newDate = new Date();

  const newComment = {
    content,
    date: newDate,
    post: postId
  };

  const comment = await createNewComment(newComment);

  const updatedPost = await addCommentsToPostById(postId, comment._id);

  res.status(201).send({comment, updatedPost});

 } catch (error) {
  console.error(error);
  res.status(500).send(error);
 };
};

export async function getPost(req, res) {
  const {postId} = req.params;

  try {
    const post = await findPostById(postId);
    res.status(200).send(post);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  };
};
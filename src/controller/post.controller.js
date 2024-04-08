import { addCommentsToPostById, createPost, findPostById, findRandomPosts, searchPosts, updatePosts } from "../model/post.model.js";
import { createNewComment } from "../model/comment.model.js";

export async function postNewPost(req, res) {
  const { content, tags } = req.body;

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
  const { postId } = req.params;
  const { content } = req.body;

  try {
    const newDate = new Date();

    const newComment = {
      content,
      date: newDate,
      post: postId
    };

    const comment = await createNewComment(newComment);

    const updatedPost = await addCommentsToPostById(postId, comment._id);

    res.status(201).send({ comment, updatedPost });

  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  };
};

export async function getPost(req, res) {
  const { postId } = req.params;

  try {
    const post = await findPostById(postId);
    if (!post) {
      return res.status(404).send("Post not found");
    }
    res.status(200).send(post);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  };
};

export async function getRandomPosts(req, res) {
  let previousPostIds = [];
  if (req.query.previousPostIds) {
    previousPostIds = req.query.previousPostIds;
  };
  try {
    const rndPostsAndIds = await findRandomPosts(previousPostIds);
    res.status(200).send(rndPostsAndIds);
  } catch (error) {
    console.error("Error getting random posts:", error);

    if (error instanceof SyntaxError || error instanceof TypeError) {
      res.status(400).send("Invalid request");
    } else {
      res.status(500).send("Internal server error");
    };
  };
};

export async function updateVisiblePosts(req, res) {
  const prevPostIds = req.query.previousPostIds;
  try {
    const updatedPosts = await updatePosts(prevPostIds);
    res.status(200).send(updatedPosts);
  } catch (error) {
    console.error("Error updating visible posts:", error);

    if (error instanceof SyntaxError || error instanceof TypeError) {
      res.status(400).send("Invalid request");
    } else {
      res.status(500).send("Internal server error");
    };
  };
};

export async function searchPostsByQuery(req, res) {
  try {
    const { query, previousPostIds } = req.query;
    console.log("query: ", query);
    console.log("previouspostids: ", previousPostIds);

    const response = await searchPosts(previousPostIds, query);
    if (!response) {
      res.status(204).send({ message: "Nothing found!" });
    };

    res.status(200).send(response);
  } catch (error) {
    res.status(400).send("Error searching posts!");
  };
};
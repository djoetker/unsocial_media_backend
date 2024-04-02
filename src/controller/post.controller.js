import { createPost } from "../model/post.model.js";

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
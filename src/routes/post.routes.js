import {Router} from "express";

import * as postController from "../controller/post.controller.js";

const router = Router();

router.post("/new", postController.postNewPost);
router.post("/new/comment/:postId", postController.postNewComment);
router.get("/get/:postId", postController.getPost);


export default router;
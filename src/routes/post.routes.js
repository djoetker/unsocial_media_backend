import {Router} from "express";

import * as postController from "../controller/post.controller.js";

const router = Router();

router.post("/new", postController.postNewPost);


export default router;
import { Router } from "express";
import postController from "../controller/post.controller";

const router = Router();

router.get("/all", postController.fetchAllPost);
router.get("/:id", postController.fetchPostById);

router.post("/all", postController.fetchPostById);
router.post("/create", postController.createPost);
router.patch("/like/:id", postController.likePost);
router.put("/update/:id", postController.updatePost);
router.delete("/delete/:id", postController.deletePost);

export default router;

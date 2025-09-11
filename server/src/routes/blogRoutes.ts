import express from "express";
import { requireAuth } from "@clerk/express";
import {
  listPosts,
  getPostById,
  getPostBySlug,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/blogController";

const router = express.Router();

router.get("/", listPosts);
router.get("/slug/:slug", getPostBySlug);
router.get("/:id", getPostById);

// Authenticated routes for managing posts (teacher/admin)
router.post("/", requireAuth(), createPost);
router.put("/:id", requireAuth(), updatePost);
router.delete("/:id", requireAuth(), deletePost);

export default router;

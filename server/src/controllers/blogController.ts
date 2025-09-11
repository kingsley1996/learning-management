import { Request, Response, RequestHandler } from "express";
import { v4 as uuidv4 } from "uuid";
import BlogPost from "../models/blogPostModel";

export const listPosts: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      limit = "10",
      tag,
      published,
      startKey,
    } = req.query as Record<string, string>;
    const pageSize = Math.min(Math.max(parseInt(limit, 10) || 10, 1), 50);

    // Dynamoose scan with optional filters
    let scan = BlogPost.scan();
    if (tag) {
      scan = scan.where("tags").contains(tag);
    }
    if (published !== undefined) {
      scan = scan.where("published").eq(published === "true");
    }

    if (startKey) {
      try {
        const decoded = JSON.parse(
          Buffer.from(startKey, "base64").toString("utf-8")
        );
        scan = scan.startAt(decoded);
      } catch (_) {
        // ignore invalid cursor
      }
    }

    const results: any = await scan.limit(pageSize).exec();
    const nextStartKey = results?.lastKey
      ? Buffer.from(JSON.stringify(results.lastKey)).toString("base64")
      : null;
    res.json({ data: results, nextStartKey });
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Failed to fetch posts" });
  }
};

export const getPostById: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const post = await BlogPost.get({ id });
    if (!post) {
      res.status(404).json({ message: "Post not found" });
      return;
    }
    res.json({ data: post });
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Failed to fetch post" });
  }
};

export const getPostBySlug: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { slug } = req.params;
    const results = await BlogPost.query("slug")
      .eq(slug)
      .using("slugIndex")
      .limit(1)
      .exec();
    const post = results[0];
    if (!post) {
      res.status(404).json({ message: "Post not found" });
      return;
    }
    res.json({ data: post });
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Failed to fetch post" });
  }
};

export const createPost: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      slug,
      title,
      excerpt,
      content,
      coverImageUrl,
      tags,
      published,
      authorId,
      authorName,
    } = req.body;
    const id = uuidv4();
    const newPost = await BlogPost.create({
      id,
      slug,
      title,
      excerpt,
      content,
      coverImageUrl,
      tags,
      published: Boolean(published),
      authorId,
      authorName,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    res.status(201).json({ message: "Post created", data: newPost });
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Failed to create post" });
  }
};

export const updatePost: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    // Remove updatedAt from body since timestamps: true handles it automatically
    const { updatedAt, ...updates } = req.body;
    const updated = await BlogPost.update({ id }, updates);
    res.json({ message: "Post updated", data: updated });
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Failed to update post" });
  }
};

export const deletePost: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    await BlogPost.delete({ id });
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Failed to delete post" });
  }
};

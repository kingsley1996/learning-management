import * as dynamoose from "dynamoose";

const { Schema, model } = dynamoose;

const BlogPostSchema = new Schema(
  {
    id: {
      type: String,
      hashKey: true,
    },
    slug: {
      type: String,
      index: {
        name: "slugIndex",
        type: "global",
      },
    },
    title: String,
    excerpt: String,
    content: String,
    coverImageUrl: String,
    tags: {
      type: Array,
      schema: [String],
    },
    authorId: String,
    authorName: String,
    published: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  content: string;
  coverImageUrl?: string;
  tags?: string[];
  authorId?: string;
  authorName?: string;
  published: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const BlogPostModel = model("BlogPost", BlogPostSchema);
export default BlogPostModel;

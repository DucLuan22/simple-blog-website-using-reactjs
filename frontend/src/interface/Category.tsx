import { Post } from "./Post";

export interface Category {
  category_id: number;
  category_name: string;
  posts: Post[];
}

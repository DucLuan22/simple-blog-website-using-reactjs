export interface Post {
  post_id: string;
  title: string;
  thumbnail: string;
  content: string;
  user_id: number;
  category_id: number;
  createDate: Date;
  updateDate: Date;
  views: number;
  category_name: string;
}

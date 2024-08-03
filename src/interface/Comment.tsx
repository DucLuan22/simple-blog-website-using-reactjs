export interface Comment {
  comment_id: number;
  user_id: number;
  post_id: string;
  content: string;
  createdAt: Date;
  givenName: string;
  familyName: string;
  likes: number;
  dislikes: number;
}

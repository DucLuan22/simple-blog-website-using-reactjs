export interface Comment {
  id: number;
  user_id: number;
  post_id: string;
  content: string;
  createdAt: Date;
  givenName: string;
  familyName: string;
}

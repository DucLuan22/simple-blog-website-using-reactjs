import React from "react";
import { TableRow, TableCell } from "@/components/ui/table";
import PostEditorModal from "@/components/adminpage/PostEditorModal";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

interface PostItemProps {
  post: any;
  userId: number | undefined;
  onDelete: (user_id: number | undefined, post_id: string) => void;
}

export const PostMobileCard: React.FC<PostItemProps> = ({
  post,
  userId,
  onDelete,
}) => (
  <div
    key={post.post_id}
    className="border rounded-lg p-4 mb-4 shadow-sm space-y-2"
  >
    <div>
      <strong>ID:</strong> {post.post_id}
    </div>
    <div>
      <strong>Title:</strong> {post.title}
    </div>
    <div>
      <strong>Create Date:</strong> {post.formattedCreateDate}
    </div>
    <div>
      <strong>Modify Date:</strong> {post.formattedUpdateDate}
    </div>
    <div>
      <strong>Author:</strong> {post.authorName}
    </div>
    <div className="flex justify-center space-x-3">
      <PostEditorModal
        post_id={post.post_id}
        title={post.title}
        thumbnail={post.thumbnail}
        post_content={post.content}
        category_id={post.category_id}
      />
      <Button
        variant="destructive"
        onClick={() => onDelete(userId, post.post_id)}
      >
        <Trash className="w-4 h-4" />
      </Button>
    </div>
  </div>
);

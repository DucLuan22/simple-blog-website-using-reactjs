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

export const PostTableRow: React.FC<PostItemProps> = ({
  post,
  userId,
  onDelete,
}) => (
  <TableRow key={post.post_id}>
    <TableCell className="w-[100px] font-medium">{post.post_id}</TableCell>
    <TableCell className="max-w-xs truncate">{post.title}</TableCell>
    <TableCell>{post.formattedCreateDate}</TableCell>
    <TableCell>{post.formattedUpdateDate}</TableCell>
    <TableCell>{post.authorName}</TableCell>
    <TableCell className="space-x-3">
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
    </TableCell>
  </TableRow>
);

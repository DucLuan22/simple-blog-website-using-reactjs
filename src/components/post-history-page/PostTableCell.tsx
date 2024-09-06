import React from "react";

interface PostCellProps {
  post_id: string;
  user_id: string;
}
function PostTableCell({ post_id, user_id }: PostCellProps) {
  return <div>PostTableCell</div>;
}

export default PostTableCell;

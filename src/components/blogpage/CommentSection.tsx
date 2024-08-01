import React, { useEffect } from "react";
import useComments from "@/hooks/useLoadComments";
import { useQueryClient } from "react-query";
import Comment from "./Comments";

interface CommentSectionProps {
  post_id: string;
  newComment: any;
}

function CommentSection({ post_id, newComment }: CommentSectionProps) {
  const { data, error, isLoading } = useComments(post_id);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (newComment) {
      queryClient.invalidateQueries(["comments", post_id]);
    }
  }, [newComment, queryClient, post_id]);

  if (isLoading) {
    return <div>Loading comments...</div>;
  }

  if (error) {
    return <div>Error loading comments: {error.message}</div>;
  }

  if (!data || data.length === 0) {
    return <div className="mb-36">No comments found for this post.</div>;
  }

  return (
    <section className="w-full space-y-10 ">
      <hr className="border-t-[1px] border-gray-300" />
      <div className="space-y-10 overflow-y-scroll h-[700px] pr-3">
        {data.map((comment) => (
          <Comment
            key={comment.comment_id}
            familyName={comment.familyName}
            likes={comment.likes}
            givenName={comment.givenName}
            createdAt={comment.createdAt}
            content={comment.content}
            comment_id={comment.comment_id}
            user_id={comment.user_id}
            post_id={comment.post_id}
          />
        ))}
      </div>
    </section>
  );
}

export default CommentSection;

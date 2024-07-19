import React from "react";
import Comment from "./Comments";
import useComments from "@/hooks/useLoadComments";

interface CommentSectionProps {
  post_id: string;
}

function CommentSection({ post_id }: CommentSectionProps) {
  const { data, error, isLoading } = useComments(post_id);

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
            familyName={comment.familyName}
            likes={comment.likes}
            givenName={comment.givenName}
            createdAt={comment.createdAt}
            content={comment.content}
            id={comment.id}
            user_id={comment.user_id}
            post_id={comment.post_id}
          />
        ))}
      </div>
    </section>
  );
}

export default CommentSection;

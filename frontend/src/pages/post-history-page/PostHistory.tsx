import React, { useMemo, useCallback } from "react";
import {
  Table,
  TableBody,
  TableHeader,
  TableRow,
  TableHead,
} from "@/components/ui/table";
import { useCounterStore } from "@/store";
import usePostsByUserId from "@/hooks/getPostByUserId";
import { useDeletePosts } from "@/hooks/useDeletePosts";
import { format } from "date-fns";
import { PostTableRow } from "@/components/post-history-page/PostTableRow";
import { PostMobileCard } from "@/components/post-history-page/PostMobileCard";

function PostHistory() {
  const user = useCounterStore((state) => state.user);
  const { isLoading, error, data } = usePostsByUserId(user?.id);
  const deletePost = useDeletePosts();

  const handleDeletePost = useCallback(
    (user_id: number | undefined, post_id: string) => {
      if (user_id && post_id) {
        deletePost.mutate({ user_id, post_id });
      }
    },
    [deletePost]
  );

  const formattedData = useMemo(() => {
    if (data) {
      return data.map((item) => ({
        ...item,
        formattedCreateDate: format(item.createDate, "dd-MM-yyyy"),
        formattedUpdateDate: format(item.updateDate, "dd-MM-yyyy"),
        authorName: item.familyName + " " + item.givenName,
      }));
    }
    return [];
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading posts.</div>;

  return (
    <div className="h-full w-full">
      {/* Desktop Table */}
      <Table className="hidden md:table w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Create Date</TableHead>
            <TableHead>Modify Date</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {formattedData.map((item) => (
            <PostTableRow
              key={item.post_id}
              post={item}
              userId={user?.id}
              onDelete={handleDeletePost}
            />
          ))}
        </TableBody>
      </Table>

      {/* Mobile View */}
      <div className="md:hidden w-full">
        {formattedData.map((item) => (
          <PostMobileCard
            key={item.post_id}
            post={item}
            userId={user?.id}
            onDelete={handleDeletePost}
          />
        ))}
      </div>
    </div>
  );
}

export default PostHistory;

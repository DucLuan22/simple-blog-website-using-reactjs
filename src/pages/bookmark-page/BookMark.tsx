import BookmarkCard from "@/components/bookmark-page/BookmarkCard";
import useBookmarkById from "@/hooks/useGetBookMarkById";
import { useCounterStore } from "@/store";
import React from "react";

function BookMark() {
  const user = useCounterStore((state) => state.user);
  const { data, isError, isLoading } = useBookmarkById(user?.id);

  if (isLoading) {
    return <div></div>;
  }

  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold">Bookmark</h1>
      <hr className="border-[1px] my-2" />
      <div className="flex gap-6">
        {data?.map((post) => (
          <BookmarkCard
            thumbnail={post.thumbnail}
            post_id={post.post_id}
            views={post.views}
            title={post.title}
            category_id={post.category_id}
            category_name={post.category_name}
            content={post.content}
            createDate={post.createDate}
            updateDate={post.updateDate}
            user_id={post.user_id}
            familyName={post.familyName}
            givenName={post.givenName}
          />
        ))}
      </div>
    </div>
  );
}

export default BookMark;

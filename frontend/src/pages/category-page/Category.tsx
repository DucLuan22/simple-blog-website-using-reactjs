import RecentPostList from "@/components/homepage/RecentPostList";
import usePostsByCategoryId from "@/hooks/useGetPostByCategory";

import { useParams } from "react-router-dom";

function Category() {
  const { categoryId } = useParams();
  const { data, isLoading } = usePostsByCategoryId(categoryId);

  const postObjects = data?.posts.map((e) => ({
    title: e.title,
    post_id: e.post_id,
    createDate: e.createDate,
    content: e.content,
    key: e.post_id,
    thumbnail: e.thumbnail,
    category: { category_name: data.category_name },

    user_id: e.user_id || null,
    updateDate: e.updateDate,
    views: e.views,
  })) as any;

  return (
    <div className="space-y-14 mb-36">
      <p className="text-2xl p-2 capitalize md:text-3xl lg:text-5xl tracking-wide w-full text-center bg-foreground text-primary-foreground font-semibold">
        {!isLoading && data?.category_name}
      </p>

      <RecentPostList data={postObjects} isLoading={isLoading} />
    </div>
  );
}

export default Category;

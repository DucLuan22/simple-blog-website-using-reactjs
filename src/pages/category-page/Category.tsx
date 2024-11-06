import RecentPostList from "@/components/homepage/RecentPostList";
import usePostsByCategoryId from "@/hooks/useGetPostByCategory";

import { useParams } from "react-router-dom";

function Category() {
  const { categoryId } = useParams();
  const { data, isLoading, error } = usePostsByCategoryId(categoryId);

  return (
    <div className="space-y-14 mb-36">
      <p className="text-2xl p-2 capitalize md:text-3xl lg:text-5xl tracking-wide w-full text-center bg-foreground text-primary-foreground font-semibold">
        {!isLoading && data && data[0]?.category_name}
      </p>
      <RecentPostList data={data} isLoading={isLoading} error={error} />
    </div>
  );
}

export default Category;

import Categories from "@/components/homepage/Categories";
import EditorPick from "@/components/homepage/EditorPick";
import PopularPost from "@/components/homepage/PopularPost";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import usePostById from "@/hooks/useGetPostById";
import { useIncrementOnLoad } from "@/hooks/useUpdateViewCount";
import { htmlStringToElements } from "@/lib/utils";
import { BookMarked, Eye, View } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function BlogPost() {
  const [isLogin, setIsLogin] = useState(true);
  const { post_id } = useParams<{ post_id: string }>();

  const { data: post, isLoading, isError, error } = usePostById(post_id || "");

  const { count } = useIncrementOnLoad(post_id || null);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !post) {
    return <div>Error: {error?.message || "Post not found"}</div>;
  }

  function htmlStringToElements(htmlString: any) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");
    return Array.from(doc.body.children).map((element, index) => {
      return (
        <div
          key={index}
          dangerouslySetInnerHTML={{ __html: element.outerHTML }}
        />
      );
    });
  }

  const submitComment = () => {};
  return (
    <div className="space-y-7 w-full">
      <div className="w-full mx-auto md:mx-0 md:max-w-6xl">
        <div className="flex flex-col gap-y-5 md:gap-y-6 lg:gap-y-10">
          <div className="w-full">
            <img
              src={post?.thumbnail}
              alt="Thumbnail"
              className="w-full h-auto md:h-full object-cover"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row md:gap-x-16 md:mx-0">
        <div className="space-y-10 basis-full ">
          <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold">
            {post?.title}
          </h1>
          <div className="flex justify-between">
            <div className="flex gap-x-3 items-center">
              <div className="rounded-full border-[1px] border-black w-10 h-10 overflow-hidden">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTb3SrkE0mHISTLOlX7loaRSitX5-jWw3-6cGIsm11duw&s"
                  alt="Author"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-sm">
                <p>Martin Bread</p>
                <p className="text-gray-500">21.08.2023</p>
              </div>
            </div>

            <div className="flex gap-x-3 items-center">
              <BookMarked className="w-6 h-6" />
              <div className="flex items-center gap-x-3">
                <Eye className="w-6 h-6" />
                <span>{post?.views}</span>
              </div>
            </div>
          </div>

          <section className="space-y-10">
            {htmlStringToElements(post?.content)}
          </section>
          <section className="lg:basis-[10%]">
            <div className="space-y-3">
              <h2 className="text-2xl">Comments</h2>
              {!isLogin && (
                <p className="underline hover:cursor-pointer">
                  Login to write a comment
                </p>
              )}
              <div className="h-[80px] flex w-full items-center space-x-2">
                <Input
                  type="text"
                  placeholder="Type your comment..."
                  className="h-full"
                />
                <Button type="submit">Submit</Button>
              </div>
            </div>
          </section>
          <section className="w-full"></section>
        </div>

        <div className="space-y-10">
          <PopularPost />
          <Categories />
          <EditorPick />
        </div>
      </div>
    </div>
  );
}

export default BlogPost;

import Categories from "@/components/homepage/Categories";
import EditorPick from "@/components/homepage/EditorPick";
import PopularPost from "@/components/homepage/PopularPost";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import usePostById from "@/hooks/useGetPostById";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function BlogPost() {
  const [isLogin, setIsLogin] = useState(true);
  const { post_id } = useParams<{ post_id: string }>();

  const { data: post, isLoading, isError, error } = usePostById(post_id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

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
          <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold">
            Easiest Way for React State Management
          </h1>
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
        </div>
      </div>
      <div className="flex flex-col lg:flex-row md:gap-x-16 md:mx-0">
        <div className="space-y-10 basis-full ">
          <section className="space-y-10">
            <p className="text-justify">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
              veniam illo, aut tempore blanditiis explicabo quam, exercitationem
              qui rerum quia magnam vitae repudiandae minima quos iusto sunt
              adipisci? Modi, laboriosam. Nostrum cum voluptate nobis deleniti
              nulla, enim architecto consequuntur iure ipsa nesciunt quo. Illum
              atque consequuntur tenetur maxime, unde numquam nisi, sit nobis
              tempora autem libero laboriosam animi vero est. Laborum
              cupiditate, eos tempore quia quo iusto asperiores rerum. Omnis
              maxime necessitatibus enim odio suscipit voluptatem unde, numquam
              voluptas eos deserunt ut eum! Libero voluptate facilis inventore,
              accusantium necessitatibus possimus. Voluptate perspiciatis atque
              quia nulla molestias quod, vitae quidem quibusdam ab ad
              exercitationem culpa deleniti explicabo aut est ea, animi a
              laboriosam dicta odio modi nihil? Perspiciatis nesciunt sunt
              earum. Dolor enim minima doloribus, asperiores, quo voluptate
              dicta at corrupti fugiat deleniti ab alias modi laboriosam est
              facilis beatae ea eius id molestias laborum accusamus mollitia
              vitae excepturi. Iste, ullam.
            </p>
            <p className="text-justify">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
              veniam illo, aut tempore blanditiis explicabo quam, exercitationem
              qui rerum quia magnam vitae repudiandae minima quos iusto sunt
              adipisci? Modi, laboriosam. Nostrum cum voluptate nobis deleniti
              nulla, enim architecto consequuntur iure ipsa nesciunt quo. Illum
              atque consequuntur tenetur maxime, unde numquam nisi, sit nobis
              tempora autem libero laboriosam animi vero est. Laborum
              cupiditate, eos tempore quia quo iusto asperiores rerum. Omnis
              maxime necessitatibus enim odio suscipit voluptatem unde, numquam
              voluptas eos deserunt ut eum! Libero voluptate facilis inventore,
              accusantium necessitatibus possimus. Voluptate perspiciatis atque
              quia nulla molestias quod, vitae quidem quibusdam ab ad
              exercitationem culpa deleniti explicabo aut est ea, animi a
              laboriosam dicta odio modi nihil? Perspiciatis nesciunt sunt
              earum. Dolor enim minima doloribus, asperiores, quo voluptate
              dicta at corrupti fugiat deleniti ab alias modi laboriosam est
              facilis beatae ea eius id molestias laborum accusamus mollitia
              vitae excepturi. Iste, ullam.
            </p>
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
                <Button type="submit">Subscribe</Button>
              </div>
            </div>
          </section>
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

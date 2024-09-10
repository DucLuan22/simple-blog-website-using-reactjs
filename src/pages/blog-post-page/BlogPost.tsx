import { useState } from "react";
import axios from "axios";
import CommentSection from "@/components/blogpage/CommentSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import usePostById from "@/hooks/useGetPostById";
import { useIncrementOnLoad } from "@/hooks/useUpdateViewCount";
import { useCounterStore } from "@/store";
import { BookMarked, Eye } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import PopularPost from "@/components/homepage/PopularPost";
import Categories from "@/components/homepage/Categories";
import EditorPick from "@/components/homepage/EditorPick";

function BlogPost() {
  const { post_id } = useParams<{ post_id: string }>();
  const [comment, setComment] = useState("");
  const [newComment, setNewComment] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false); // New state for bookmark
  const { data: post, isLoading, isError, error } = usePostById(post_id || "");
  const user = useCounterStore((state) => state.user);
  const isAuthenticate = useCounterStore((state) => state.isAuthenticated);
  const { count } = useIncrementOnLoad(post_id || null);
  const navigation = useNavigate();

  if (isLoading || !post_id) {
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

  const submitComment = async () => {
    if (!comment) return;

    if (user?.id === null) {
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/comments/postComment`,
        {
          user_id: user?.id,
          post_id: post_id,
          content: comment,
        }
      );

      if (response.status === 201) {
        setComment("");
        setNewComment(response.data.data);
      } else {
        alert(response.data.error || "An error occurred");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        alert(error.response.data.error || "An error occurred");
      } else {
        alert("An error occurred while submitting the comment");
      }
    }
  };

  const handleBookmark = async () => {
    if (!isAuthenticate) {
      navigation("/login");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/posts/bookmark`,
        {
          user_id: user?.id,
          post_id: post_id,
        }
      );

      if (response.data.success) {
        setIsBookmarked((prev) => !prev);
        alert(response.data.message);
      } else {
        alert(response.data.error || "An error occurred");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        alert(error.response.data.error || "An error occurred");
      } else {
        alert("An error occurred while handling the bookmark");
      }
    }
  };

  return (
    <div className="space-y-7 w-full mb-36">
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
              <BookMarked
                className={`w-6 h-6 ${isBookmarked ? "text-yellow-500" : ""}`}
                onClick={handleBookmark}
              />
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
              {isAuthenticate ? (
                <div className="h-[80px] flex w-full items-center space-x-2">
                  <Input
                    type="text"
                    placeholder="Type your comment..."
                    className="h-full"
                    onChange={(e) => setComment(e.target.value)}
                    value={comment}
                  />

                  <Button type="submit" onClick={submitComment}>
                    Submit
                  </Button>
                </div>
              ) : (
                <p
                  className="underline hover:cursor-pointer"
                  onClick={() => navigation("/login")}
                >
                  Login to write a comment
                </p>
              )}
            </div>
          </section>
          <CommentSection post_id={post_id} newComment={newComment} />
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

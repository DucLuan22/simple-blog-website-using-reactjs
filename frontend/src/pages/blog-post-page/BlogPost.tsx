import React, { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import usePostById from "@/hooks/useGetPostById";
import { useIncrementOnLoad } from "@/hooks/useUpdateViewCount";
import { useCounterStore } from "@/store";
import { BookMarked, Eye } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";
import useCreateShare from "@/hooks/useCreateShare";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

const CommentSection = React.lazy(
  () => import("@/components/blogpage/CommentSection")
);
const PopularPost = React.lazy(
  () => import("@/components/homepage/PopularPost")
);
const Categories = React.lazy(() => import("@/components/homepage/Categories"));
const UsersPick = React.lazy(() => import("@/components/homepage/UsersPick"));

function BlogPost() {
  const { post_id } = useParams<{ post_id: string }>();
  const [comment, setComment] = useState("");
  const [newComment, setNewComment] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { data: post, isLoading, isError, error } = usePostById(post_id || "");
  const user = useCounterStore((state) => state.user);
  const isAuthenticated = useCounterStore((state) => state.isAuthenticated);
  const { count } = useIncrementOnLoad(post_id);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { mutate: createShare } = useCreateShare();
  const shareUrl = window.location.href;

  const handleShare = (platform: string) => {
    if (!post_id) {
      return null;
    }
    createShare({ post_id, flatform: platform });
  };

  const submitComment = async () => {
    if (!comment) return;
    if (!user?.id) return;

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/comment`,
        {
          user_id: user?.id,
          post_id,
          content: comment,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      if (response.status === 201) {
        setComment("");
        setNewComment(response.data);
      } else {
        toastError(response.data.error);
      }
    } catch (error) {
      // toastError(error.response?.data?.error || "An error occurred");
    }
  };

  const handleBookmark = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/bookmark/toggle`,
        { user_id: user?.id, post_id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      if (response.data.success) {
        setIsBookmarked(response.data.isBookmark);
        toast({
          title: response.data.isBookmark
            ? "Added to Bookmarks"
            : "Removed from Bookmarks",
          description: response.data.message,
          variant: response.data.isBookmark ? "default" : "destructive",
        });
      } else {
        toastError(response.data.message);
      }
    } catch (error) {
      // toastError(error.response?.data?.error || "An error occurred");
    }
  };

  const toastError = (message: string) => {
    toast({
      title: "Error",
      description: message,
      variant: "destructive",
    });
  };

  const renderHtmlContent = (htmlString: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");
    return Array.from(doc.body.children).map((element, index) => (
      <div
        key={index}
        dangerouslySetInnerHTML={{ __html: element.outerHTML }}
      />
    ));
  };

  if (isLoading || !post_id) return <div>Loading...</div>;
  if (isError || !post)
    return <div>Error: {error?.message || "Post not found"}</div>;

  return (
    <div className="space-y-7 w-full mb-36">
      <div className="w-full mx-auto md:mx-0 md:max-w-6xl">
        <div className="flex flex-col gap-y-5 md:gap-y-6 lg:gap-y-10">
          <img
            src={post?.thumbnail}
            alt="Thumbnail"
            className="w-full h-auto md:h-full object-cover"
          />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row md:gap-x-16 md:mx-0">
        <div className="space-y-10 lg:basis-[70%] xl:basis-[80%]">
          <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold">
            {post?.title}
          </h1>

          <div className="flex justify-between">
            <div className="flex gap-x-3 items-center">
              <img
                src={user?.avatar_url}
                alt="Author"
                className="rounded-full border-[1px] border-black w-10 h-10 object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="text-sm">
                <p>{`${user?.familyName} ${user?.givenName}`}</p>
                <p className="text-gray-500">
                  {format(new Date(post.createDate), "dd.MM.yyyy")}
                </p>
              </div>
            </div>

            <div className="flex gap-x-3 items-center">
              {post.user_id !== user?.id && (
                <BookMarked
                  className={`w-6 h-6 ${isBookmarked ? "text-yellow-500" : ""}`}
                  onClick={handleBookmark}
                />
              )}
              <div className="flex items-center gap-x-3">
                <Eye className="w-6 h-6" />
                <span>{post?.views}</span>
              </div>
            </div>
          </div>

          <section className="">
            <div className="ql-editor space-y-3">
              {renderHtmlContent(post?.content)}
            </div>
          </section>

          <div className="flex items-center gap-x-2 mt-4">
            <span>Share</span>
            <FacebookShareButton
              url={shareUrl}
              onShareWindowClose={() => handleShare("facebook")}
            >
              <FacebookIcon size={32} round />
            </FacebookShareButton>
            <TwitterShareButton
              url={shareUrl}
              title={post.title}
              onShareWindowClose={() => handleShare("twitter")}
            >
              <TwitterIcon size={32} round />
            </TwitterShareButton>
            <LinkedinShareButton
              url={shareUrl}
              title={post.title}
              onShareWindowClose={() => handleShare("linkedin")}
            >
              <LinkedinIcon size={32} round />
            </LinkedinShareButton>
          </div>

          <section className="lg:basis-[10%]">
            <div className="space-y-3">
              <h2 className="text-2xl">Comments</h2>
              {isAuthenticated ? (
                <div className="h-[80px] flex w-full items-center space-x-2">
                  <Input
                    type="text"
                    placeholder="Type your comment..."
                    className="h-full"
                    onChange={(e) => setComment(e.target.value)}
                    value={comment}
                  />
                  <Button onClick={submitComment}>Submit</Button>
                </div>
              ) : (
                <p
                  className="underline cursor-pointer"
                  onClick={() => navigate("/login")}
                >
                  Login to write a comment
                </p>
              )}
            </div>
          </section>

          <React.Suspense fallback={<div>Loading comments...</div>}>
            <CommentSection
              post_id={post_id}
              newComment={newComment}
              post_user_id={post.user_id}
            />
          </React.Suspense>
        </div>

        <div className="space-y-10">
          <React.Suspense fallback={<div>Loading...</div>}>
            <PopularPost />
            <Categories />
            <UsersPick />
          </React.Suspense>
        </div>
      </div>
    </div>
  );
}

export default BlogPost;

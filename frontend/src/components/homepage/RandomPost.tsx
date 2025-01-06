import { Post } from "@/interface/Post";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

interface PostListProps {
  isLoading: boolean;
  data?: Post[];
}

function extractFirstParagraph(content: string): string {
  // Use DOMParser to extract the first <p> tag's content
  const parser = new DOMParser();
  const doc = parser.parseFromString(content, "text/html");
  const firstParagraph = doc.querySelector("p");
  return firstParagraph ? firstParagraph.textContent || "" : "";
}

function RandomPost({ isLoading, data }: PostListProps) {
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!data || data.length === 0) {
    return <p>No posts available.</p>;
  }

  const randomIndex = Math.floor(Math.random() * data.length);
  const randomPost = data[randomIndex];

  // Extract and clean up the content
  const cleanedContent = extractFirstParagraph(randomPost.content);

  return (
    <div className="flex md:flex-row flex-col md:justify-start items-start md:items-center gap-5">
      <div className="max-w-[600px] overflow-hidden basis-1/2">
        <img
          src={randomPost.thumbnail || "https://via.placeholder.com/600x400"}
          alt={randomPost.title}
          className="w-full"
        />
      </div>

      <div className="basis-1/2 space-y-3">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold line">
          {randomPost.title}
        </h2>
        <p className="line-clamp-2 md:line-clamp-3 lg:line-clamp-none">
          {cleanedContent}
        </p>
        <Button aria-label="Read More" variant={"outline"}>
          <Link to={`/posts/${randomPost.post_id}`}>Read More</Link>
        </Button>
      </div>
    </div>
  );
}

export default RandomPost;

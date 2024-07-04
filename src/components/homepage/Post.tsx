import type { Post } from "@/interface/Post";
import { Button } from "../ui/button";
import { format } from "date-fns";
import { getTextFromParagraphString } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

function Post({
  post_id,
  category_name,
  createDate,
  title,
  thumbnail,
  content,
}: Post) {
  const navigate = useNavigate();
  const handleRedirect = () => {
    navigate(`/posts/${post_id}`);
  };

  return (
    <div
      className="flex md:flex-row flex-col md:justify-start items-start md:items-center gap-5"
      key={post_id}
    >
      <div className="w-full h-full overflow-hidden basic lg:basis-1/2">
        <img src={thumbnail} alt={title} className="" />
      </div>

      <div className="basis-1/2 space-y-3 md:space-y-4 lg:space-y-7">
        <div className="text-gray-400 text-sm">
          {format(createDate, "dd-MM-yyyy")} -{" "}
          <span className="text-pink-800">{category_name.toUpperCase()}</span>
        </div>
        <h2 className="text-xl font-semibold line">{title}</h2>
        <p className="line-clamp-2">{getTextFromParagraphString(content)}</p>
        <Button
          aria-label="Read More"
          variant={"outline"}
          onClick={handleRedirect}
        >
          Read More
        </Button>
      </div>
    </div>
  );
}

export default Post;

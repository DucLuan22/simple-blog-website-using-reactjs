import type { Post } from "@/interface/Post";
import { Button } from "../ui/button";
import { format } from "date-fns";
function Post({ post_id, category_id, createDate, title, thumbnail }: Post) {
  return (
    <div
      className="flex md:flex-row flex-col md:justify-start items-start md:items-center gap-5"
      key={post_id}
    >
      <div className="w-full h-full overflow-hidden basic lg:basis-1/2">
        <img src={thumbnail} alt="test" className="" />
      </div>

      <div className="basis-1/2 space-y-3 md:space-y-4 lg:space-y-7">
        <div className="text-gray-400 text-sm">
          {format(createDate, "dd-MM-yyyy")} -{" "}
          <span className="text-pink-800">CODING</span>
        </div>
        <h2 className="text-xl font-semibold line">{title}</h2>
        <p className="line-clamp-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente quos
          quas sequi beatae fugit nesciunt aliquam, a eveniet aspernatur ducimus
          tenetur repellendus earum in inventore alias, perferendis provident?
          Cumque, tenetur.
        </p>
        <Button aria-label="Read More" variant={"outline"}>
          Read More
        </Button>
      </div>
    </div>
  );
}

export default Post;

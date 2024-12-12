import { Post } from "@/interface/Post";
import { Eye, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { useDeleteBookmark } from "@/hooks/useDeleteBookmark";
function BookmarkCard({
  thumbnail,
  post_id,
  views,
  title,
  user_id,
  givenName,
  familyName,
}: Post) {
  const deleteBookmark = useDeleteBookmark();

  const handleDelete = () => {
    if (user_id && post_id) {
      deleteBookmark.mutate({ user_id, post_id });
    }
  };

  return (
    <div
      className="w-[350px] h-[250px] border rounded-lg overflow-hidden shadow-lg flex flex-col relative"
      key={post_id}
    >
      <div className="h-2/3 relative">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover"
        />
        <Button
          className="absolute top-2 right-2"
          variant={"destructive"}
          onClick={handleDelete}
        >
          <Trash className="w-4 h-4" />
        </Button>
      </div>

      <div className="p-4 flex flex-col justify-between flex-1 bg-white">
        <div>
          <h3 className="text-sm font-bold truncate">{title}</h3>
        </div>
        <div className="text-sm text-gray-600 flex justify-between">
          <div className="flex gap-1 items-center">
            <span className="font-medium">{views}</span>
            <Eye className="w-4 h-4" />
          </div>
          <div>
            <span>by {familyName + " " + givenName}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookmarkCard;

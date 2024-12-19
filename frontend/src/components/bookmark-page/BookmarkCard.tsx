import { Post } from "@/interface/Post";
import { Eye, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { useDeleteBookmark } from "@/hooks/useDeleteBookmark";
import { useState } from "react";

function BookmarkCard({
  thumbnail,
  post_id,
  views,
  title,
  user_id,
  givenName,
  familyName,
}: Post) {
  const { mutate: deleteBookmark, isLoading: isDeleting } = useDeleteBookmark();
  const [isImageError, setImageError] = useState(false);

  const handleDelete = () => {
    if (user_id && post_id) {
      deleteBookmark({ user_id, post_id });
    }
  };

  return (
    <div className="w-full max-w-[350px] h-[250px] border rounded-lg overflow-hidden shadow-lg flex flex-col relative">
      <div className="h-2/3 relative">
        <img
          src={isImageError ? "/placeholder.jpg" : thumbnail}
          alt={title}
          className="w-full h-full object-cover"
          onError={() => setImageError(true)}
        />
        <Button
          className="absolute top-2 right-2"
          variant="destructive"
          onClick={handleDelete}
          disabled={isDeleting}
        >
          {isDeleting ? "..." : <Trash className="w-4 h-4" />}
        </Button>
      </div>

      <div className="p-4 flex flex-col justify-between flex-1 bg-white">
        <h3 className="text-sm font-bold truncate">{title}</h3>
        <div className="text-sm text-gray-600 flex justify-between items-center mt-2">
          <div className="flex gap-1 items-center">
            <Eye className="w-4 h-4 text-gray-500" />
            <span className="font-medium">{views}</span>
          </div>
          <span className="truncate">by {`${familyName} ${givenName}`}</span>
        </div>
      </div>
    </div>
  );
}

export default BookmarkCard;

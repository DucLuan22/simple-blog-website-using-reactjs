import { format } from "date-fns";

interface PopularPropsProps {
  post_id: string;
  title: string;
  thumbnail: string;
  category_name: string;
  createDate: Date;
  familyName: string;
  givenName: string;
}
function PopularPostCard({
  category_name,
  createDate,
  post_id,
  title,
  familyName,
  givenName,
}: PopularPropsProps) {
  return (
    <div className="space-y-3" key={post_id}>
      <span className="bg-orange-400 p-y-3 px-4 rounded-3xl">
        {category_name}
      </span>

      <h2 className="font-semibold text-lg">{title}</h2>
      <span className="text-xs">
        {familyName + " " + givenName} -{" "}
        <span className="text-gray-500">
          {format(createDate, "dd.MM.yyyy")}
        </span>
      </span>
    </div>
  );
}

export default PopularPostCard;

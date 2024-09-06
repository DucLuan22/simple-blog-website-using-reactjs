import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import usePostsByUserId from "@/hooks/getPostByUserId";
import { useDeletePosts } from "@/hooks/useDeletePosts";
import { useCounterStore } from "@/store";
import { format } from "date-fns";
import { Edit, Trash } from "lucide-react";

function PostHistory() {
  const user = useCounterStore((state) => state.user);

  const { isLoading, error, data } = usePostsByUserId(user?.id);

  const deletePost = useDeletePosts();

  const handleDeletePost = (user_id: number, post_id: string) => {
    if (user_id && post_id) {
      deletePost.mutate({ user_id, post_id });
    }
  };

  if (isLoading) return <div></div>;

  console.log(data);
  return (
    <div className="h-full w-full">
      <Table className="hidden md:table w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Create Date</TableHead>
            <TableHead className="">Modify Date</TableHead>
            <TableHead className="">Author</TableHead>
            <TableHead className="">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((item) => (
            <TableRow
              onClick={() => handleDeletePost(item.user_id, item.post_id)}
            >
              <TableCell className="w-[100px] font-medium">
                {item.post_id}
              </TableCell>
              <TableCell className="max-w-xs truncate">{item.title}</TableCell>
              <TableCell>{format(item.createDate, "dd-MM-yyyy")}</TableCell>
              <TableCell className="">
                {format(item.updateDate, "dd-MM-yyyy")}
              </TableCell>
              <TableCell className="">
                <strong>Author:</strong>{" "}
                {item.familyName + " " + item.givenName}
              </TableCell>
              <TableCell className="space-x-3">
                <Button className="bg-blue-500">
                  <Edit className="w-4 h-4" />
                </Button>
                <Button variant="destructive">
                  <Trash className="w-4 h-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="md:hidden w-full">
        {data?.map((item) => (
          <div
            key={item.post_id}
            className="border rounded-lg p-4 mb-4 shadow-sm space-y-2"
          >
            <div>
              <strong>ID:</strong> {item.post_id}
            </div>
            <div>
              <strong>Title:</strong> {item.title}
            </div>
            <div>
              <strong>Create Date:</strong>{" "}
              {format(item.createDate, "dd-MM-yyyy")}
            </div>
            <div>
              <strong>Modify Date:</strong>{" "}
              {format(item.updateDate, "dd-MM-yyyy")}
            </div>
            <div>
              <strong>Author:</strong> {item.familyName + " " + item.givenName}
            </div>
            <div className="flex justify-center space-x-3">
              <Button className="bg-blue-500">
                <Edit className="w-4 h-4" />
              </Button>
              <Button variant="destructive">
                <Trash className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PostHistory;

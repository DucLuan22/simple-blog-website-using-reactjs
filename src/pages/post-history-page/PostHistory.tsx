import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Trash } from "lucide-react";

function PostHistory() {
  const data = [
    {
      id: "INV001",
      title:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi sit quae, dolor eligendi id repellendus, commodi at unde mollitia voluptates quibusdam iusto illo distinctio aliquam, magnam blanditiis eum dolores nulla.",
      createDate: "May 3rd 2024",
      modifyDate: "May 6th 2024",
      author: "Dang Duc Luan",
    },
    // Add more data as needed
  ];

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
          <TableRow>
            <TableCell className="w-[100px] font-medium">INV001</TableCell>
            <TableCell className="max-w-xs truncate">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi
              sit quae, dolor eligendi id repellendus, commodi at unde mollitia
              voluptates quibusdam iusto illo distinctio aliquam, magnam
              blanditiis eum dolores nulla.
            </TableCell>
            <TableCell>May 3rd 2024</TableCell>
            <TableCell className="">May 6th 2024</TableCell>
            <TableCell className="">Dang Duc Luan</TableCell>
            <TableCell className="space-x-3">
              <Button className="bg-blue-500">
                <Edit className="w-4 h-4" />
              </Button>
              <Button variant="destructive">
                <Trash className="w-4 h-4" />
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <div className="md:hidden w-full">
        {data.map((item) => (
          <div
            key={item.id}
            className="border rounded-lg p-4 mb-4 shadow-sm space-y-2"
          >
            <div>
              <strong>ID:</strong> {item.id}
            </div>
            <div>
              <strong>Title:</strong> {item.title}
            </div>
            <div>
              <strong>Create Date:</strong> {item.createDate}
            </div>
            <div>
              <strong>Modify Date:</strong> {item.modifyDate}
            </div>
            <div>
              <strong>Author:</strong> {item.author}
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

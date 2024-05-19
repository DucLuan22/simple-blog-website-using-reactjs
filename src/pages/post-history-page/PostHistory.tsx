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
  return (
    <div className="h-full w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Create Date</TableHead>
            <TableHead className="text-right">Modify Date</TableHead>
            <TableHead className="text-center">Author</TableHead>
            <TableHead className="text-center">Actions</TableHead>
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
            <TableCell className="text-right">May 6th 2024</TableCell>
            <TableCell className="text-center">Dang Duc Luan</TableCell>
            <TableCell className="text-center space-x-3">
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
    </div>
  );
}

export default PostHistory;

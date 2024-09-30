import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Edit } from "lucide-react";

function PostEditorModal() {
  return (
    <Dialog>
      <DialogTrigger>
        <Button className="bg-blue-500">
          <Edit className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-[90%] h-[90%]">
        <DialogHeader>
          <DialogTitle>Post Editor</DialogTitle>
          <div className="">
            <div></div>
            <div></div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default PostEditorModal;

import React, { useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Edit } from "lucide-react";
import ReactQuill from "react-quill";

function PostEditorModal() {
  const reactQuillRef = useRef<ReactQuill>(null);
  return (
    <Dialog>
      <DialogTrigger>
        <Button className="bg-blue-500">
          <Edit className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-[90%] max-h-[90%]">
        <DialogHeader>
          <DialogTitle>Post Editor</DialogTitle>
        </DialogHeader>
        <div className="w-full h-auto flex flex-col lg:flex-row">
          {/* Left Side - Responsive width */}
          <div className="w-full lg:w-2/3">
            <ReactQuill
              theme="snow"
              ref={reactQuillRef}
              placeholder="Tell your story..."
              modules={{
                toolbar: {
                  container: [
                    [{ header: "1" }, { header: "2" }, { font: [] }],
                    [{ size: [] }],
                    ["bold", "italic", "underline", "strike", "blockquote"],
                    [
                      { list: "ordered" },
                      { list: "bullet" },
                      { indent: "-1" },
                      { indent: "+1" },
                    ],
                    ["link", "image", "video"],
                    ["code-block"],
                    ["clean"],
                  ],
                },
                clipboard: {
                  matchVisual: false,
                },
              }}
              formats={[
                "header",
                "font",
                "size",
                "bold",
                "italic",
                "underline",
                "strike",
                "blockquote",
                "list",
                "bullet",
                "indent",
                "link",
                "image",
                "video",
                "code-block",
              ]}
              value={""}
              className="w-full text-foreground h-[400px] lg:h-[600px] mb-10"
            />
          </div>

          {/* Right Side - Responsive width */}
          <div className="w-full lg:w-1/3 p-4 mt-6 lg:mt-0">
            <h2 className="text-lg font-semibold">Right Side Content</h2>
            <p>This is the right side of the editor.</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default PostEditorModal;

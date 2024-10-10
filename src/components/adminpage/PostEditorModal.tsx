import React, { useRef, useState } from "react";
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
import { Input } from "../ui/input";

function htmlStringToElements(htmlString: any) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");
  return Array.from(doc.body.children).map((element, index) => {
    return (
      <div
        key={index}
        dangerouslySetInnerHTML={{ __html: element.outerHTML }}
      />
    );
  });
}

function PostEditorModal() {
  const reactQuillRef = useRef<ReactQuill>(null);
  const [content, setContent] = useState("");
  return (
    <Dialog>
      <DialogTrigger>
        <Button className="bg-blue-500">
          <Edit className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-[95%] lg:max-w-[80%] p-4">
        <DialogHeader>
          <DialogTitle>Post Editor</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4 lg:gap-6">
          {/* Left Side - Editor with full width on mobile, 2/3 on larger screens */}
          <div className="flex flex-col">
            <Input className="mb-4" placeholder="Post title..." />
            <div>
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
                value={content}
                onChange={setContent}
                className="text-foreground h-[300px] lg:h-[500px] lg:w-[1000px] mb-4"
              />
            </div>
            <Button className="self-end mt-16 md:mt-12">Save</Button>
          </div>

          {/* Right Side - Preview with overflow handling */}
          <div className="h-auto overflow-y-auto break-words overflow-clip">
            <div className="h-[250px] w-full border"></div>
            <div className=" ">
              {content ? (
                htmlStringToElements(content)
              ) : (
                <p className="text-gray-500">
                  Your preview will appear here...
                </p>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default PostEditorModal;

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
  const [image, setImage] = useState<string | null>(null);

  // Function to handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl); // Preview the uploaded image
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button className="bg-blue-500">
          <Edit className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[95%] lg:max-w-[80%] p-4">
        <DialogHeader>
          <DialogTitle>Post Editor</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr] md:gap-4 lg:gap-6">
          {/* Left Side - Editor with full width on mobile, 50/50 on medium screens, and 2/3 on larger screens */}
          <div className="flex flex-col w-full">
            <Input className="mb-4" placeholder="Post title..." />
            <div className="w-full">
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
                className="text-foreground h-[300px] md:h-[500px] w-full mb-4"
              />
            </div>

            {/* Fix the Save button alignment */}
            <div className="flex justify-end mt-24 mb-5 md:mt-12 md:mb-0">
              <Button>Save</Button>
            </div>
          </div>

          {/* Right Side - Image Upload as Button and Preview */}
          <div className="flex flex-col items-center">
            {/* Image Input (Hidden) */}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="image-upload"
            />

            {/* Label acts as the button to trigger file input */}
            <label htmlFor="image-upload" className="cursor-pointer w-full">
              {image ? (
                <img
                  src={image}
                  alt="Preview"
                  className="h-[200px] w-full md:h-[250px] border object-cover mb-4"
                />
              ) : (
                <div className="h-[200px] w-full md:h-[250px] border mb-4 flex items-center justify-center text-gray-500">
                  Click to select an image
                </div>
              )}
            </label>

            {/* Content Preview */}
            <div className=" self-start space-y-4 overflow-y-auto break-words pr-3 max-h-[200px] md:max-h-[300px] lg:max-h-[600px]">
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

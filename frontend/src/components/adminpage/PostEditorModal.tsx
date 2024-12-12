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
import { useEditPost } from "@/hooks/useEditPost";

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

interface PostEditorModelProps {
  post_id: string;
  title: string;
  post_content: string;
  thumbnail: string;
}

function PostEditorModal({
  post_id,
  post_content,
  thumbnail,
  title,
}: PostEditorModelProps) {
  const reactQuillRef = useRef<ReactQuill>(null);
  const [content, setContent] = useState<string>(post_content);
  const [image, setImage] = useState<string | null>(thumbnail);
  const [post_title, setTitle] = useState<string>(title);
  const [modelOpen, setModelOpen] = useState(false);

  const mutation = useEditPost();

  // Function to handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl); // Preview the uploaded image
    }
  };

  const handleSave = () => {
    mutation.mutate({
      post_id,
      title: post_title,
      thumbnail: image || "",
      content,
    });
    setModelOpen(false);
  };

  return (
    <Dialog onOpenChange={() => setModelOpen(!modelOpen)} open={modelOpen}>
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
          <div className="flex flex-col w-full">
            <Input
              className="mb-4"
              placeholder="Post title..."
              value={post_title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <div className="max-w-[1000px]">
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
                className="text-foreground h-[300px] md:h-[500px] w-full mb-4 lg:max-w-[600px] 2xl:max-w-[980px]"
              />
            </div>

            <div className="flex justify-end mt-24 mb-5 md:mt-12 md:mb-0">
              <Button onClick={handleSave} disabled={mutation.isLoading}>
                {mutation.isLoading ? "Saving..." : "Save"}
              </Button>
            </div>
          </div>

          <div className="flex flex-col items-center break-words">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="image-upload"
            />

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

            <div className="self-start pr-3 overflow-y-auto break-words max-h-[200px] max-w-full lg:max-w-[300px] xl:max-h-[400px] 2xl:max-w-[480px]">
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

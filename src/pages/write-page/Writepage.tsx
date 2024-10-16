import React, { useRef, useState } from "react";
import ReactQuill from "react-quill";
import "../../index.css";
import "react-quill/dist/quill.snow.css";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useCategory from "@/hooks/useCategories";
import { useCounterStore } from "@/store";
import axios from "axios";
import { Input } from "@/components/ui/input";

function Writepage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const reactQuillRef = useRef<ReactQuill>(null);
  const { data, error, isLoading } = useCategory();
  const user = useCounterStore((state) => state.user);

  const handleSetTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnail(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadPost = async () => {
    if (!title || !content || !category || !user) {
      alert("Please fill all fields and ensure you are logged in.");
      return;
    }
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/posts/upload`,
        {
          title,
          content,
          user_id: user?.id,
          category_id: parseInt(category),
          thumbnail: thumbnail || "thumbnail_placeholder",
        }
      );

      if (response.data.success) {
        alert("Post uploaded successfully");
      } else {
        alert("Failed to upload post");
      }
    } catch (error) {
      alert("An error occurred while uploading the post");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-full w-full space-y-5 mb-96">
      <div className="w-full flex justify-end">
        <Button variant={"default"} onClick={handleUploadPost}>
          Publish
        </Button>
      </div>
      <div className="flex w-full">
        <input
          type="text"
          placeholder="Title"
          onChange={handleSetTitle}
          value={title}
          className="border-none p-[20px] md:p-[30px] lg:p-[40px] md:text-[40px] lg:text-[50px] outline-none w-full focus:text-foreground bg-primary-foreground"
        />
      </div>

      <div className="flex gap-3">
        <Select onValueChange={setCategory}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {data?.map((category) => (
              <SelectItem
                value={category.category_id.toString()}
                key={category.category_id}
              >
                {category.category_name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="w-[250px]">
          <Input
            type="file"
            accept="image/jpeg, image/png"
            onChange={handleThumbnailChange}
          />
        </div>
      </div>

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
        className="w-full text-foreground h-full"
      />
    </div>
  );
}

export default Writepage;

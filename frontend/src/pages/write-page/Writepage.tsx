import React, { useRef, useState } from "react";
import ReactQuill from "react-quill";
import "../../index.css";
import "react-quill/dist/quill.snow.css";

import useCategory from "@/hooks/useCategories";
import { useCounterStore } from "@/store";
import { uploadPost } from "@/hooks/uploadPost";
import Header from "@/components/writepage/Header";
import TitleInput from "@/components/writepage/TitleInput";
import CategoryAndThumbnail from "@/components/writepage/CategoryAndThumbNail";
import RichTextEditor from "@/components/writepage/RichTextEditor";

function Writepage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [thumbnail, setThumbnail] = useState<string | null>(null);

  const reactQuillRef = useRef<ReactQuill>(null);
  const { data: categories = [], isLoading } = useCategory(); // Default categories to empty array
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
    if (!title || !content || !category || !user?.id) {
      alert("Please fill all fields and ensure you are logged in.");
      return;
    }

    try {
      const response = await uploadPost({
        title,
        content,
        category_id: parseInt(category, 10),
        thumbnail: thumbnail || "thumbnail_placeholder",
        user_id: user.id,
      });

      if (response) {
        alert("Post uploaded successfully");
        resetForm();
      }
    } catch (error) {
      alert("An error occurred while uploading the post");
    }
  };

  const resetForm = () => {
    setTitle("");
    setContent("");
    setCategory("");
    setThumbnail(null);
  };

  if (isLoading) {
    return <div>Loading categories...</div>;
  }

  return (
    <div className="h-full w-full space-y-5 mb-96">
      <Header onPublish={handleUploadPost} />
      <TitleInput value={title} onChange={handleSetTitle} />
      <CategoryAndThumbnail
        categories={categories}
        selectedCategory={category}
        onCategoryChange={setCategory}
        onThumbnailChange={handleThumbnailChange}
      />
      <RichTextEditor
        value={content}
        onChange={setContent}
        quillRef={reactQuillRef}
      />
    </div>
  );
}

export default Writepage;
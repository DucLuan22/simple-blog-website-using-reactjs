import React from "react";
import ReactQuill from "react-quill";

interface RichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
  quillRef: React.RefObject<ReactQuill>;
}

function RichTextEditor({ value, onChange, quillRef }: RichTextEditorProps) {
  return (
    <div>
      <ReactQuill
        theme="snow"
        ref={quillRef}
        value={value}
        onChange={onChange}
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
          clipboard: { matchVisual: false },
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
        className="lg:max-w-[600px] xl:max-w-[800px] 2xl:max-w-[1000px] text-foreground "
      />
    </div>
  );
}

export default RichTextEditor;

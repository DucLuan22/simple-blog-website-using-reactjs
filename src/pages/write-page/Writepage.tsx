import { ExternalLink, FileVideo, Image, PlusCircle } from "lucide-react";
import React, { useRef, useState } from "react";
import ReactQuill from "react-quill";
import "../../index.css";
import "react-quill/dist/quill.snow.css";
import { Button } from "@/components/ui/button";
function Writepage() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [text, setText] = useState("");
  const [value, setValue] = useState("");
  const reactQuillRef = useRef<ReactQuill>(null);
  const handleOpenFileUploader = () => {
    setIsOpen(!isOpen);
  };

  const handleSetText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const data = e.target.value;
    setText(data);
  };

  const openFileSelector = () => {
    const input = document.getElementById("file-input");

    if (input) {
      input.click();
    }
  };

  return (
    <div className="h-full w-full space-y-5">
      <div className="w-full flex justify-end">
        <Button variant={"default"}>Publish</Button>
      </div>
      <div className="flex w-full">
        <input
          type="text"
          placeholder="Title"
          onChange={handleSetText}
          value={text}
          className="border-none p-[20px] md:p-[30px] lg:p-[40px] md:text-[40px] lg:text-[50px] outline-none w-full focus:text-foreground bg-primary-foreground"
        />
      </div>
      {/* <div className="flex gap-4">
        <button className="" onClick={handleOpenFileUploader}>
          <PlusCircle className="w-7 h-7 text-foreground" />
        </button>

        {isOpen && (
          <div className="flex gap-x-4">
            <input type="file" id="file-input" style={{ display: "none" }} />
            <button>
              <Image
                onClick={openFileSelector}
                className="w-6 h-6 text-foreground"
              />
            </button>
            <button>
              <FileVideo className="w-6 h-6 text-foreground" />
            </button>
            <button>
              <ExternalLink className="w-6 h-6 text-foreground" />
            </button>
          </div>
        )}
      </div> */}

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
          value={value}
          onChange={setValue}
          className="w-full text-foreground"
        />
      </div>
    </div>
  );
}

export default Writepage;

import { ExternalLink, FileVideo, Image, PlusCircle } from "lucide-react";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "../../index.css";
import "react-quill/dist/quill.bubble.css";
function Writepage() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [text, setText] = useState("");
  const [value, setValue] = useState("");
  const handleOpenFileUploader = () => {
    setIsOpen(!isOpen);
  };

  const handleSetText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const data = e.target.value;
    setText(data);
  };
  return (
    <div className="">
      <input
        type="text"
        placeholder="Title"
        onChange={handleSetText}
        value={text}
        className="border-none p-[50px] text-[64px] outline-none"
      />
      <div className="flex gap-4">
        <button className="" onClick={handleOpenFileUploader}>
          <PlusCircle className="w-7 h-7 text-foreground" />
        </button>

        {isOpen && (
          <div className="flex gap-x-4">
            <button>
              <Image className="w-6 h-6 text-foreground" />
            </button>
            <button>
              <FileVideo className="w-6 h-6 text-foreground" />
            </button>
            <button>
              <ExternalLink className="w-6 h-6 text-foreground" />
            </button>
          </div>
        )}
      </div>
      <ReactQuill
        theme="bubble"
        placeholder="Tell your story..."
        value={value}
        onChange={setValue}
        className="w-full"
      />
    </div>
  );
}

export default Writepage;

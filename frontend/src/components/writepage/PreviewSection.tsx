import React, { useMemo } from "react";
import { cn } from "@/lib/utils";
import placeholderImage from "/src/assets/placeholder.png";

interface PostPreviewProps {
  title: string;
  thumbnail: string;
  content: string;
}

const PreviewSection: React.FC<PostPreviewProps> = React.memo(
  ({ thumbnail, title, content }) => {
    const parsedContent = useMemo(() => {
      try {
        const parser = new DOMParser();
        const doc = parser.parseFromString(content, "text/html");
        return Array.from(doc.body.children).map((element, index) => (
          <div
            key={index}
            dangerouslySetInnerHTML={{ __html: element.outerHTML }}
          />
        ));
      } catch (error) {
        console.error("Error parsing HTML content:", error);
        return <p>Invalid content</p>;
      }
    }, [content]);

    return (
      <section>
        <h1>Previews</h1>
        <div>
          <div className="w-full border h-[250px] lg:h-[300px] xl:h-[400px] bg-gray-100 rounded-xl">
            <img
              src={thumbnail || placeholderImage}
              alt={title || "Placeholder"}
              className={cn(
                "w-full h-full rounded-xl",
                thumbnail ? "object-cover" : "object-contain"
              )}
              loading="lazy"
            />
          </div>
          <p className="text-xl lg:text-2xl xl:text-3xl font-bold">{title}</p>
          <div className="text-2xl ql-editor">{parsedContent}</div>
        </div>
      </section>
    );
  }
);

export default PreviewSection;

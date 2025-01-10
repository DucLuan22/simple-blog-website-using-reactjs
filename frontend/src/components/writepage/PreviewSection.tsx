import { cn } from "@/lib/utils";
import React from "react";

interface PostPreviewProps {
  title: string;
  thumbnail: string;
  content: string;
}

function PreviewSection({ thumbnail, title, content }: PostPreviewProps) {
  const placeholderImage = "/src/assets/placeholder.png";

  function htmlStringToElements(htmlString: string) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");
    return Array.from(doc.body.children).map((element, index) => (
      <div
        key={index}
        dangerouslySetInnerHTML={{ __html: element.outerHTML }}
      />
    ));
  }

  return (
    <section>
      <h1>Previews</h1>
      <div>
        <div className="w-full border-[1px] h-[250px] lg:h-[300px] xl:h-[400px] bg-gray-100 rounded-xl">
          <img
            src={thumbnail || placeholderImage}
            alt={title || "Placeholder"}
            className={cn(
              "w-full h-full",
              thumbnail ? "object-cover" : "object-contain"
            )}
          />
        </div>
        <p className="text-xl lg:text-2xl xl:text-3xl font-bold">{title}</p>
        <div className="text-2xl">{htmlStringToElements(content)}</div>
      </div>
    </section>
  );
}

export default PreviewSection;

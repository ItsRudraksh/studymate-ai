import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useRef } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css"; // You can choose different themes

export function ChapterContent({ chapter }) {
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      // Find all <pre><code> blocks and apply highlighting
      const codeBlocks = contentRef.current.querySelectorAll("pre code");
      codeBlocks.forEach((block) => {
        hljs.highlightElement(block);
      });
    }
  }, [chapter]); // Re-run when chapter changes

  if (!chapter) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-2rem)] text-gray-500">
        Select a chapter to view its content
      </div>
    );
  }

  return (
    <Card className="border-0 shadow-none py-2">
      <CardContent>
        <div
          ref={contentRef}
          className="prose prose-blue max-w-none dark:prose-invert prose-pre:whitespace-pre-wrap prose-pre:break-words prose-img:max-w-full prose-img:object-contain prose-pre:bg-[#0d1117] prose-pre:p-4 prose-pre:rounded-lg"
          dangerouslySetInnerHTML={{ __html: chapter.chapterContent }}
        />
      </CardContent>
    </Card>
  );
}

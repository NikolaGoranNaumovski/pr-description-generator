import React from "react";

interface MarkdownOutputProps {
  content: string;
}

export function MarkdownOutput({ content }: MarkdownOutputProps) {
  // Simple markdown parser for common elements
  const parseMarkdown = (text: string) => {
    const lines = text.split("\n");
    const elements: React.ReactNode[] = [];
    let currentList: string[] = [];
    let listType: "ul" | "ol" | null = null;
    let elementKey = 0; // Unique key counter

    const flushList = () => {
      if (currentList.length > 0 && listType) {
        const ListTag = listType;
        elements.push(
          <ListTag
            key={`list-${elementKey++}`}
            className={
              listType === "ul"
                ? "list-disc list-inside space-y-1"
                : "list-decimal list-inside space-y-1"
            }
          >
            {currentList.map((item, i) => (
              <li key={i} className="text-green-400">
                {item}
              </li>
            ))}
          </ListTag>
        );
        currentList = [];
        listType = null;
      }
    };

    lines.forEach((line) => {
      // Headers
      if (line.startsWith("# ")) {
        flushList();
        elements.push(
          <h1 key={`h1-${elementKey++}`} className="text-cyan-400 mb-2">
            {line.slice(2)}
          </h1>
        );
      } else if (line.startsWith("## ")) {
        flushList();
        elements.push(
          <h2 key={`h2-${elementKey++}`} className="text-cyan-400 mt-4 mb-2">
            {line.slice(3)}
          </h2>
        );
      } else if (line.startsWith("### ")) {
        flushList();
        elements.push(
          <h3 key={`h3-${elementKey++}`} className="text-green-400 mt-3 mb-2">
            {line.slice(4)}
          </h3>
        );
      }
      // Unordered list
      else if (line.match(/^[-*]\s/)) {
        if (listType !== "ul") {
          flushList();
          listType = "ul";
        }
        currentList.push(line.slice(2));
      }
      // Ordered list
      else if (line.match(/^\d+\.\s/)) {
        if (listType !== "ol") {
          flushList();
          listType = "ol";
        }
        currentList.push(line.replace(/^\d+\.\s/, ""));
      }
      // Code block
      else if (line.startsWith("```")) {
        flushList();
        // Skip code block markers
      }
      // Bold text
      else if (line.includes("**")) {
        flushList();
        const parts = line.split("**");
        elements.push(
          <p key={`p-bold-${elementKey++}`} className="text-green-400 mb-2">
            {parts.map((part, i) =>
              i % 2 === 1 ? (
                <strong key={i} className="text-cyan-300">
                  {part}
                </strong>
              ) : (
                part
              )
            )}
          </p>
        );
      }
      // Empty line
      else if (line.trim() === "") {
        flushList();
        elements.push(<div key={`empty-${elementKey++}`} className="h-2" />);
      }
      // Regular paragraph
      else if (line.trim()) {
        flushList();
        // Check for inline code
        if (line.includes("`")) {
          const parts = line.split("`");
          elements.push(
            <p key={`p-code-${elementKey++}`} className="text-green-400 mb-2">
              {parts.map((part, i) =>
                i % 2 === 1 ? (
                  <code
                    key={i}
                    className="bg-cyan-950/50 border border-cyan-900/50 px-2 py-0.5 rounded text-cyan-300 text-sm font-mono"
                  >
                    {part}
                  </code>
                ) : (
                  part
                )
              )}
            </p>
          );
        } else {
          elements.push(
            <p key={`p-${elementKey++}`} className="text-green-400 mb-2">
              {line}
            </p>
          );
        }
      }
    });

    flushList();
    return elements;
  };

  return (
    <div className="bg-black/60 border border-cyan-900/50 rounded-lg p-6 font-mono text-sm overflow-auto max-h-[600px]">
      <div className="prose prose-invert max-w-none">
        {parseMarkdown(content)}
      </div>
    </div>
  );
}

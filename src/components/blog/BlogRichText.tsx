import type { ReactNode } from "react";

function formatInline(text: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-navy">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

export default function BlogRichText({ text }: { text: string }) {
  const blocks = text.replace(/\r\n/g, "\n").trim().split(/\n\n+/);

  return (
    <div className="space-y-2.5">
      {blocks.map((block, i) => {
        const lines = block
          .split("\n")
          .map((l) => l.trim())
          .filter(Boolean);
        const isList = lines.length > 0 && lines.every((l) => l.startsWith("- "));

        if (isList) {
          return (
            <ul
              key={i}
              className="list-disc space-y-1 pl-5 text-[15px] leading-[1.65] text-navy/65"
            >
              {lines.map((line, j) => (
                <li key={j}>{formatInline(line.replace(/^- /, ""))}</li>
              ))}
            </ul>
          );
        }

        if (block.startsWith("**") && block.includes(":**")) {
          const [boldPart, ...rest] = block.split(":**");
          return (
            <p key={i} className="text-[15px] leading-[1.65] text-navy/65">
              <strong className="font-semibold text-navy">
                {boldPart.replace(/\*\*/g, "")}:
              </strong>
              {formatInline(rest.join(":**"))}
            </p>
          );
        }

        return (
          <p key={i} className="text-[15px] leading-[1.65] text-navy/65">
            {formatInline(block)}
          </p>
        );
      })}
    </div>
  );
}

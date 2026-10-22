import type { CSSProperties, ElementType } from "react";

type AnimatedTitleProps = {
  lines: string[];
  as?: ElementType;
  className?: string;
};

export function AnimatedTitle({ lines, as: Tag = "h1", className = "" }: AnimatedTitleProps) {
  let index = 0;
  const label = lines.join(" ");

  return <Tag className={`animated-title ${className}`} aria-label={label}>
    <span aria-hidden="true">
      {lines.map((line, lineIndex) => <span className="animated-title-line" key={line}>
        {Array.from(line).map((character) => {
          const delay = index++;
          return <span
            className="animated-letter"
            key={`${character}-${delay}`}
            style={{ "--letter-index": delay } as CSSProperties}
          >{character === " " ? "\u00a0" : character}</span>;
        })}
        {lineIndex < lines.length - 1 && <br/>}
      </span>)}
    </span>
  </Tag>;
}

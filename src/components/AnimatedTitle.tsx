import type { ElementType } from "react";
type AnimatedTitleProps = { lines: string[]; as?: ElementType; className?: string };
export function AnimatedTitle({lines,as:Tag="h1",className=""}:AnimatedTitleProps) {
  return <Tag className={`editorial-title ${className}`}>{lines.map((line,index)=><span key={line}>{index>0&&<br/>}{line}</span>)}</Tag>;
}

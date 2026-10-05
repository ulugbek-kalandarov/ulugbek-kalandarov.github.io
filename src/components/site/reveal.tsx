import type { ReactNode } from "react";

/** Static wrapper (scroll animations intentionally removed for a formal look). */
export function Reveal({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "li" | "article";
}) {
  const Component = Tag as "div";
  return <Component className={className}>{children}</Component>;
}

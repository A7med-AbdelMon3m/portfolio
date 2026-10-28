import type { ReactNode } from "react";
import { reveal } from "@/lib/fx";

interface PageHeadProps {
  title: string;
  intro?: ReactNode;
}

export function PageHead({ title, intro }: PageHeadProps) {
  return (
    <div className="border-b border-line pb-12 pt-14 md:pb-16 md:pt-20">
      <h1 data-lit className="lit-title text-[clamp(2.5rem,7vw,5.5rem)] font-extrabold">
        {title}
      </h1>
      {intro && (
        <p className="mt-5 max-w-prose text-lg text-ink-soft md:text-xl" {...reveal(150)}>
          {intro}
        </p>
      )}
    </div>
  );
}

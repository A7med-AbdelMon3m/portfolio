import type { ReactNode } from "react";

interface PageHeadProps {
  title: string;
  intro?: ReactNode;
}

export function PageHead({ title, intro }: PageHeadProps) {
  return (
    <div className="border-b border-line pb-10 pt-12 md:pb-14 md:pt-16">
      <h1 className="text-4xl font-bold md:text-5xl">{title}</h1>
      {intro && <p className="mt-4 max-w-prose text-lg text-ink-soft">{intro}</p>}
    </div>
  );
}

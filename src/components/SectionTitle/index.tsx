import React from "react";
interface SectionTitleProps {
  title: string;
  subTitle: string;
}
export default function SectionTitle({ title, subTitle }: SectionTitleProps) {
  return (
    <section>
      <div className="text-4xl text-gray-400 mb-3 font-extrabold">{title}</div>
      <p className="text-gray-400 mb-6">{subTitle}</p>
    </section>
  );
}

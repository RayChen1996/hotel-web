import clsx from "clsx";
import React from "react";

type FieldLabelProps = {
  label: string;
  required?: boolean;
};
export default function FieldLabel({
  label = "",
  required = false,
}: FieldLabelProps) {
  return (
    <div className="label">
      <span
        className={clsx(
          "label-text",
          required
            ? "after:content-['*'] after:ml-0.5 after:text-red-500"
            : undefined
        )}
      >
        {label}
      </span>
    </div>
  );
}

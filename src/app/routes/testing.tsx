import { useState } from "react";
// import { cn } from "./cn"; // adjust path if needed
import { cn } from "../../utils/cn";
import { cva } from "class-variance-authority";

const buttonVariants = cva(
  "rounded font-medium", // base styles
  {
    variants: {
      variant: {
        primary: "bg-blue-500",
        secondary: "bg-gray-200",
      },
      size: {
        sm: "px-2 py-1",
        lg: "px-6 py-3",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "sm",
    },
  },
);

export function Button({ className, variant, size, ...props }) {
  return (
    <button className={cn(buttonVariants({ variant, size }), className)}>
      add
    </button>
  );
}
// import { useState } from "react";
// import { Button } from "./Button";

export default function TestCVA() {
  // const [variant, setVariant] = useState<"primary" | "secondary" | "danger">(
  //   "primary",
  // );
  // const [size, setSize] = useState<"sm" | "md" | "lg">("md");

  return (
    <div>
      <Button />
    </div>
  );
}

import { cn } from "@/utils/helper";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  type?: "button" | "submit" | "reset";
}

export default function Button({
  children,
  onClick,
  className = "",
  type = "button",
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={cn(
        "outline-1 p-3 rounded-lg font-semibold hover:text-blue-200 transition-transform duration-200 hover:scale-105 cursor-pointer",
        className
      )}
    >
      {children}
    </button>
  );
}

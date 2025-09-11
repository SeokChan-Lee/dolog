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
        "w-full flex justify-center items-center gap-1 text-xl font-bold  transition-transform duration-200 hover:scale-105 text-black bg-blue-200/75 p-2 rounded-xl cursor-pointer shadow-blue-200 shadow-sm",
        className
      )}
    >
      {children}
    </button>
  );
}

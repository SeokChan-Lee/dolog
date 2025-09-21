interface ChipProps {
  children: React.ReactNode;
  className?: string;
}

export default function Chip({ children, className }: ChipProps) {
  return (
    <span
      className={`inline-flex items-center bg-[#111827] text-[#808fa9] text-sm font-medium px-3 py-1 rounded-full border-1 ${className}`}
    >
      {children}
    </span>
  );
}

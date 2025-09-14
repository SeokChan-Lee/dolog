import Image from "next/image";
import Button from "./Button";

interface FloatingButtonProps {
  iconSrc: string;
  label: string;
  href?: string;
  onClick?: () => void;
}

export default function FloatingButton({
  iconSrc,
  label,
  href,
  onClick,
}: FloatingButtonProps) {
  const content = (
    <Button
      className="w-fit h-fit rounded-full p-3 mb-3 hover:scale-110"
      onClick={onClick}
    >
      <Image src={iconSrc} alt={`${label} 아이콘`} width={45} height={45} />
    </Button>
  );

  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {content}
    </a>
  ) : (
    content
  );
}

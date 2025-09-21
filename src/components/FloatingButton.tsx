import Image from "next/image";
import Button from "./Button";

interface FloatingButtonProps {
  iconSrc: string;
  label: string;
  href?: string;
  onClick?: () => void;
  isTopScroll?: boolean;
}

export default function FloatingButton({
  iconSrc,
  label,
  href,
  onClick,
  isTopScroll = false,
}: FloatingButtonProps) {
  const content = (
    <Button
      className="w-fit h-fit rounded-full p-2.5 mb-3 hover:scale-110"
      onClick={onClick}
    >
      {isTopScroll ? (
        <div className="w-[35px] h-[35px] flex items-center justify-center">
          <Image src={iconSrc} alt={`${label} 아이콘`} width={20} height={20} />
        </div>
      ) : (
        <Image src={iconSrc} alt={`${label} 아이콘`} width={35} height={35} />
      )}
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

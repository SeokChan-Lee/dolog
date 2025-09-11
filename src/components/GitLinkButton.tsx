import Image from "next/image";
import Button from "./Button";

export default function GitLinkButton() {
  return (
    <a
      href="https://github.com/SeokChan-Lee"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Button className="mb-2 h-[56px]">
        <Image
          src="/assets/icon/git_icon.png"
          alt="깃 아이콘"
          width={35}
          height={35}
        />
        <p>GitHub</p>
      </Button>
    </a>
  );
}

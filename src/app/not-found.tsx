import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="h-screen w-screen flex items-center justify-center flex-col gap-5">
      <Image
        src={"/assets/icon/dot_question.png"}
        width={300}
        height={300}
        alt="물음표 이미지"
      />
      <span className="font-bold text-l md:text-xl lg:text-2xl">
        페이지를 찾을 수 없습니다.
      </span>
      <Link href={"/"}>
        <span className="cursor-pointer">홈으로 돌아가기</span>
      </Link>
    </div>
  );
}

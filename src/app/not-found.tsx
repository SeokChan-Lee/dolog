"use client";

import Image from "next/image";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

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
      <Button className="cursor-pointer" onClick={() => router.push("/")}>
        <span>홈으로 돌아가기</span>
      </Button>
    </div>
  );
}

"use client";

import Image from "next/image";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="h-screen w-screen flex items-center justify-center flex-col gap-5">
      <Image
        src={"/assets/notFound_img/dolog_notFound_img.png"}
        width={300}
        height={300}
        alt="물음표 이미지"
        className="rounded-full"
      />
      <span className="font-bold text-2xl">페이지를 찾을 수 없습니다.</span>
      <Link href={"/"}>
        <Button className="mt-4" onClick={() => router.push("/")}>
          <span>홈으로 돌아가기</span>
        </Button>
      </Link>
    </div>
  );
}

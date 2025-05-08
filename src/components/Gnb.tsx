import Image from "next/image";
import Link from "next/link";

export default function Gnb() {
  return (
    <div className="fixed backdrop-blur-md w-full p-3 ">
      <div className="flex justify-between max-w-3xl mx-auto items-center">
        <Link href="/">
          <div className="flex items-center gap-3">
            <Image
              src="/assets/Logo/Dolog_Logo_Img.png"
              alt="로고"
              width={65}
              height={10}
            />
            <Image
              src="/assets/Logo/Dolog_Logo_Text.png"
              alt="로고"
              width={110}
              height={90}
            />
          </div>
        </Link>
        <h1 className="font-bold">검색</h1>
      </div>
    </div>
  );
}

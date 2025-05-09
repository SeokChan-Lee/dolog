import Image from "next/image";
import Link from "next/link";
import CategoryList from "./CategoryList";

export default function Gnb() {
  return (
    <div className="fixed backdrop-blur-md w-full p-3 z-10">
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
        <Link href="/search">
          <h1 className="text-xl font-bold hover:text-blue-200 transition-transform duration-200 hover:scale-105">
            검색
          </h1>
        </Link>
      </div>
      <div className="max-w-3xl mx-auto mt-3">
        <CategoryList />
      </div>
    </div>
  );
}

import Image from "next/image";
import Link from "next/link";
import CategoryList from "./CategoryList";

export default function Gnb() {
  return (
    <div className="fixed backdrop-blur-md w-full px-5 py-3 z-10 md:px-3">
      <div className="flex justify-between max-w-3xl mx-auto items-center">
        <Link href="/">
          <div className="flex items-center gap-3 transition-transform duration-200 hover:scale-105">
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
        <div className="flex items-center gap-3.5">
          <Link
            className="transition-transform duration-200 hover:scale-105"
            href="/minesweeper"
          >
            💣
          </Link>
          <Link href="/search">
            <Image
              src="/assets/icon/search_icon.svg"
              alt="검색 아이콘"
              width={40}
              height={40}
              className="transition-transform duration-200 hover:scale-110 text-blu"
            />
          </Link>
        </div>
      </div>
      <div className="max-w-3xl mx-auto mt-3">
        <CategoryList />
      </div>
    </div>
  );
}

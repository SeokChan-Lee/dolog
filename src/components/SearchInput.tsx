"use client";

interface Props {
  keyword: string;
  setKeyword: (value: string) => void;
}

export default function SearchInput({ keyword, setKeyword }: Props) {
  return (
    <div className="mx-5 sm:mx-0">
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="포스트 제목을 검색해주세요."
        className="w-full px-4 py-2 border-b-3 border-gray-300  focus:outline-none  focus:border-blue-200 mb-10 "
      />
    </div>
  );
}

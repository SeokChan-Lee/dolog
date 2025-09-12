import Image from "next/image";
import Chip from "./Chip";

interface ProjectProps {
  projectName: string;
  period: string;
  personnel: string;
  introduction: React.ReactNode;
  deployLinkAddress: string;
  deployLink: string;
  isIntern?: boolean;
  isRepoLink?: boolean;
  repoAddress?: string;
  chips?: string[][];
}

export default function Project({
  projectName,
  period,
  personnel,
  introduction,
  deployLinkAddress,
  deployLink,
  isIntern = false,
  isRepoLink = false,
  repoAddress,
  chips = [],
}: ProjectProps) {
  return (
    <article className="flex flex-col">
      <div className="flex items-end gap-1">
        <h2 className="text-xl font-semibold">{projectName}</h2>
        {isIntern && <p className="text-sm text-[#808fa9]">(인턴)</p>}
      </div>
      <p className="text-sm mb-4 text-[#808fa9]">
        {period}
        <br />
        {personnel}
      </p>

      <p className="mb-4 text-[#808fa9]">{introduction}</p>

      {chips && chips.length > 0 && (
        <div className="flex flex-col gap-2 mb-4">
          {chips.map((line, lineIdx) => (
            <div key={lineIdx} className="flex gap-2 flex-wrap">
              {line.map((chip, idx) => (
                <Chip key={idx}>{chip}</Chip>
              ))}
            </div>
          ))}
        </div>
      )}

      <div className="flex gap-5">
        <a
          href={deployLinkAddress}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline flex bg-blue-200 w-fit rounded-lg px-2 py-1 text-black gap-1 items-center text-sm transition-transform duration-200 hover:scale-105"
        >
          <Image
            src="/assets/icon/link_icon.png"
            alt="링크 아이콘"
            width={20}
            height={20}
          />
          {deployLink}
        </a>
        {isRepoLink && (
          <a
            href={repoAddress}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline flex bg-blue-200 w-fit rounded-lg px-2 py-1 text-black gap-2 items-center text-sm transition-transform duration-200 hover:scale-105"
          >
            <Image
              src="/assets/icon/git_icon.png"
              alt="깃 아이콘"
              width={20}
              height={20}
            />
            Repo
          </a>
        )}
      </div>
    </article>
  );
}

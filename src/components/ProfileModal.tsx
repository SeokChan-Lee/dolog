"use client";

import Image from "next/image";
import Modal from "./Modal";
import { useState } from "react";
import Project from "./Project";

export default function ProfileModal() {
  const [isOpen, setIsOpen] = useState(false);
  const SEMI_TITLE = "font-bold text-2xl mb-6.5 text-blue-200 ";
  const SEMI_TITLE_BORDER = "border-l-3 border-l-blue-200 pl-4";
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-1 text-xl font-bold  transition-transform duration-200 hover:scale-105 text-black bg-blue-200 p-2 rounded-xl cursor-pointer shadow-blue-200 shadow-sm"
      >
        <Image
          src="/assets/icon/profile_icon.png"
          alt="프로필 아이콘"
          width={40}
          height={40}
        />
        Profile
      </button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="lg:flex lg:justify-between lg:items-center">
          <section className="mb-15 lg:mb-0 grid grid-cols-1 ">
            <div className="grid grid-cols-1 border-l-3 border-l-blue-200 pl-4 mb-8">
              <p className="text-4xl font-bold mb-2">이석찬</p>
              <p className="text-2xl">프론트엔드 개발자</p>
            </div>
            <p className="text-lg text-[#808fa9] border-l-blue-200 pl-4 border-l-3">
              사용자 경험과 코드 품질 모두에 집중하는 프론트엔드 개발자
              이석찬입니다.
            </p>
          </section>
          <section className="grid grid-cols-1 gap-8 ">
            <div className={SEMI_TITLE_BORDER}>
              <p className={SEMI_TITLE}>스킬</p>
              <span className="text-[#808fa9]">
                React, Next.js, TypeScript, JavaScript, HTML, CSS <br />
                Tailwind CSS, Styled Components
              </span>
            </div>
            <div className={SEMI_TITLE_BORDER}>
              <p className={SEMI_TITLE}>프로젝트</p>
              <div className="grid grid-cols-1">
                <Project
                  projectName="위리브"
                  period="2025.05 ~ 2025.06 (4주)"
                  personnel="인원 : 팀프로젝트(팀장) / FE(3명), BE(2명)"
                  introduction={
                    <>
                      위리브는 아파트 거주 주민들과 관리 주체를 위한 상호
                      커뮤니케이션 및 행정 관리 플랫폼입니다.
                      <br />
                      해당 서비스는 공지사항 전달, 민원 접수, 투표, 입주 승인 등
                      공동체 운영에 필수적인 기능들을 온라인화합니다.
                    </>
                  }
                  deployLinkAddress="https://project-welive-fe.vercel.app"
                  deployLink="project-welive-fe.vercel.app"
                />
              </div>
            </div>
            <div className={SEMI_TITLE_BORDER}>
              <p className={SEMI_TITLE}>교육 이력</p>
              <div className="grid grid-cols-1">
                <div className="grid grid-cols-1">
                  <span className="text-xl font-semibold">
                    코드잇 프론트엔드 12기 수료
                  </span>
                  <span className="text-sm mb-4 text-[#808fa9]">
                    2024.10 ~ 2025.04
                  </span>
                  <span className="text-[#808fa9]">
                    React, TypeScript, Next.js 중심의 실무 프로젝트 기반 교육
                    이수
                  </span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </Modal>
    </>
  );
}

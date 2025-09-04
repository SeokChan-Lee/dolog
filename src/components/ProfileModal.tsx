"use client";

import Image from "next/image";
import Modal from "./Modal";
import { useState } from "react";

export default function ProfileModal() {
  const [isOpen, setIsOpen] = useState(false);
  const SEMI_TITLE = "font-semibold text-2xl mb-1.5";
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-1 text-xl font-bold  transition-transform duration-200 hover:scale-105 text-black bg-blue-200 p-2 rounded-xl cursor-pointer"
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
        <div className="lg:flex lg:justify-between ">
          <section className="mb-15 lg:mb-0 grid grid-cols-1 gap-8 h-[500px]">
            <p className="text-4xl font-bold">이석찬</p>
            <p className="text-2xl">프론트엔드 개발자</p>
            <p className="text-lg">
              사용자 경험과 코드 품질 모두에 집중하는 프론트엔드 개발자
              이석찬입니다.
            </p>
          </section>
          <section className="grid grid-cols-1 gap-8 border-l-3 border-l-blue-200 pl-4">
            <div>
              <p className={SEMI_TITLE}>소개</p>
            </div>
            <div>
              <p className={SEMI_TITLE}>스킬</p>
              <span>
                React, Next.js, TypeScript, JavaScript, HTML, CSS <br />
                Tailwind CSS, Styled Components
              </span>
            </div>
            <div>
              <p className={SEMI_TITLE}>프로젝트</p>
              <div className="flex flex-col">
                <span>위리브</span>
                <span>
                  2025.05 ~ 2025.06 (4주)
                  <br />
                  역할 : 팀프로젝트(팀장) / FE(3명), BE(2명)
                </span>

                <span>
                  위리브는 아파트 거주 주민들과 관리 주체를 위한 상호
                  커뮤니케이션 및 행정 관리 플랫폼입니다.
                  <br />
                  해당 서비스는 공지사항 전달, 민원 접수, 투표, 입주 승인 등
                  공동체 운영에 필수적인 기능들을 온라인화합니다.
                </span>
              </div>
            </div>
            <div>
              <p className={SEMI_TITLE}>교육 이력</p>
              <div className="grid grid-cols-1">
                <span>코드잇 프론트엔드 12기 수료</span>
                <span>2024.10 ~ 2025.04</span>
                <span>
                  React, TypeScript, Next.js 중심의 실무 프로젝트 기반 교육 이수
                </span>
              </div>
            </div>
          </section>
        </div>
      </Modal>
    </>
  );
}

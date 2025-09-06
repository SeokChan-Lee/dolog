"use client";

import Image from "next/image";
import Modal from "./Modal";
import { useState } from "react";
import Project from "./Project";
import Experience from "./Experience";

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
        <div className="lg:flex lg:justify-between lg:items-start">
          <section className="mb-15 lg:mb-0 flex flex-col justify-center self-center">
            <div className="grid grid-cols-1 border-l-3 border-l-blue-200 pl-4 mb-8">
              <p className="text-4xl font-bold mb-2">이석찬</p>
              <p className="text-2xl">프론트엔드 개발자</p>
            </div>
            <p className="text-lg text-[#808fa9] border-l-blue-200 pl-4 border-l-3">
              사용자 경험과 코드 품질 모두에 집중하는
              <br />
              프론트엔드 개발자 이석찬입니다.
            </p>
          </section>

          <div className="pr-4 overflow-visible lg:max-h-[70vh] lg:overflow-y-auto">
            <section className="grid grid-cols-1 gap-8">
              <div className={SEMI_TITLE_BORDER}>
                <p className={SEMI_TITLE}>스킬</p>
                <span className="text-[#808fa9]">
                  React, Next.js, TypeScript, JavaScript, HTML, CSS <br />
                  Tailwind CSS, Styled Components
                </span>
              </div>

              <div className={SEMI_TITLE_BORDER}>
                <p className={SEMI_TITLE}>프로젝트</p>
                <div className="grid grid-cols-1 gap-6">
                  <Project
                    projectName="위리브"
                    isIntern
                    period="2025.05 ~ 2025.06 (4주)"
                    personnel="인원 : 팀프로젝트(팀장) / FE(3명), BE(2명)"
                    introduction={
                      <>
                        위리브는 아파트 거주 주민들과 관리 주체를 위한
                        상호커뮤니케이션 및 행정 관리 플랫폼입니다.
                        <br />
                        해당 서비스는 공지사항 전달, 민원 접수, 투표, 입주
                        승인등
                        <br />
                        공동체 운영에 필수적인 기능들을 온라인화합니다.
                      </>
                    }
                    deployLinkAddress="https://project-welive-fe.vercel.app"
                    deployLink="project-welive-fe.vercel.app"
                  />
                  <Project
                    projectName="에피그램"
                    period="2025.03 ~ 2025.04 (4주)"
                    personnel="인원 : 팀프로젝트 / FE(4명)"
                    introduction={
                      <>
                        Epigram은 명언을 공유하고 사람들과 댓글로 소통하며,
                        <br />
                        나의 감정을 기록하고 통계로 시각화하여 감정 변화를
                        <br />
                        한눈에 확인할 수 있는 커뮤니티 플랫폼입니다.
                      </>
                    }
                    deployLinkAddress="https://epigram-gilv.vercel.app/"
                    deployLink="epigram-gilv.vercel.app"
                    isRepoLink
                    repoAddress="https://github.com/kss761036/Epigram"
                  />
                </div>
              </div>
              <div className={SEMI_TITLE_BORDER}>
                <p className={SEMI_TITLE}>경력 요약</p>
                <div className="grid grid-cols-1 gap-6">
                  <Experience
                    company="코드잇"
                    position="프론트엔드 | 인턴"
                    period="2025.05 ~ 2025.06"
                    task="주요 업무 : Next.js 기반 백엔드 부트캠프 교육 프로젝트 예시 페이지 설계"
                  />
                  <Experience
                    company="패스트뷰"
                    position="광고사업실 | 애드매니저"
                    period="2023.10 ~ 2024.02"
                    task="주요 업무 : 자사 웹페이지 광고 영역 운영 및 관리"
                  />
                  <Experience
                    company="엔터프라이즈블록체인"
                    position="커뮤니케이션팀 | 퍼포먼스/CRM 마케터"
                    period="2023.03 ~ 2023.09"
                    task="주요 업무 : 광고 집행 및 성과 분석, CRM 캠페인 기획·운영"
                  />
                  <Experience
                    company="(주)휴먼데크"
                    position="Quality팀 | 파트장"
                    period="2021.06 ~ 2023.02"
                    task="주요 업무 : 칭따오 생맥주 유통 영업 및 업장 관리"
                  />
                  <Experience
                    company="대찬태권도"
                    position="태권도 사범"
                    period="2018.03 ~ 2021.03"
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
        </div>
      </Modal>
    </>
  );
}

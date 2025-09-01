"use client";

import Modal from "./Modal";
import { useState } from "react";

export default function ProfileModal() {
  const [isOpen, setIsOpen] = useState(false);
  const SEMI_TITLE = "font-semibold text-2xl mb-1.5";
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-xl font-bold  transition-transform duration-200 hover:scale-105 text-black bg-blue-200 p-2 rounded-xl cursor-pointer"
      >
        Profile
      </button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="lg:flex lg:justify-between ">
          <section className="mb-15 lg:mb-0 grid grid-cols-1 gap-8">
            <p className="text-4xl font-bold">이석찬</p>
            <p className="text-2xl">프론트엔드 개발자</p>
            <p className="text-lg">
              사용자 경험과 코드 품질 모두에 집중하는 프론트엔드 개발자
              이석찬입니다.
            </p>
          </section>
          <section className="grid grid-cols-1 gap-8">
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

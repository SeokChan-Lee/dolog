"use client";

import Modal from "./Modal";
import { useState } from "react";

export default function PortfolioModal() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-xl font-bold  transition-transform duration-200 hover:scale-105 text-black bg-blue-200 p-2 rounded-xl cursor-pointer"
      >
        Portfolio
      </button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <p>내용 추가 및 플로팅 버튼으로 변경 예정</p>
        <p>내용 추가 및 플로팅 버튼으로 변경 예정</p>
        <p>내용 추가 및 플로팅 버튼으로 변경 예정</p>
        <p>내용 추가 및 플로팅 버튼으로 변경 예정</p>
        <p>내용 추가 및 플로팅 버튼으로 변경 예정</p>
        <p>내용 추가 및 플로팅 버튼으로 변경 예정</p>
        <p>
          내용 추가 및 플로팅 버튼으로 변경 예정내용 추가 및 플로팅 버튼으로
          변경 예정내용 추가 및 플로팅 버튼으로 변경 예정내용 추가 및 플로팅
          버튼으로 변경 예정
        </p>
      </Modal>
    </>
  );
}

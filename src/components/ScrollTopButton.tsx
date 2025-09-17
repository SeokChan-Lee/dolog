"use client";

import { useEffect, useState } from "react";
import FloatingButton from "./FloatingButton";
import { motion, AnimatePresence } from "motion/react";

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <FloatingButton
          iconSrc="/assets/icon/up_arrow.png"
          label="스크롤 최상단 버튼"
          onClick={scrollToTop}
          isTopScroll
        />
      </motion.div>
    </AnimatePresence>
  );
}

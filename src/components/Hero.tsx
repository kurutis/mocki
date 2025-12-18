"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Hero() {
  const [text, setText] = useState("");
  const [showStamp, setShowStamp] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const fullText = "Portfolio";
  
  useEffect(() => {
    // Проверка мобильного устройства
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    let currentIndex = 0;
    
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => {
          setShowStamp(true);
        }, 300);
      }
    }, 100);
    
    return () => {
      clearInterval(typingInterval);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#1D1D1B] flex items-center justify-center relative overflow-hidden px-[5%] py-8 md:py-0">
      {/* Контейнер адаптивный */}
      <div className="w-full md:w-[90%] mx-auto flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">
        
        {/* Левая часть - Portfolio */}
        <div className="flex-1 order-2 md:order-1 text-center md:text-left mt-4 md:mt-0">
          <motion.div
            initial={{ opacity: 0, x: isMobile ? 0 : -20, y: isMobile ? -20 : 0 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <h1 className="text-[64px] sm:text-[80px] md:text-[120px] lg:text-[140px] xl:text-[180px] leading-none font-bold relative inline-block" style={{
              fontFamily: 'Constantia, serif',
              background: 'linear-gradient(180deg, #D88152 23%, #CC5C37 53%, #C23E20 83%, #BE3217 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              {text}
              <span className="text-transparent animate-pulse">|</span>
            </h1>
            
            {/* by MOCKI - адаптивное позиционирование */}
            <AnimatePresence>
              {showStamp && (
                <motion.div
                  initial={{ 
                    scale: 0, 
                    opacity: 0,
                    rotate: isMobile ? 0 : -180 
                  }}
                  animate={{ 
                    scale: 1, 
                    opacity: 1,
                    rotate: 0 
                  }}
                  transition={{ 
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                    delay: 0.2
                  }}
                  className="absolute left-1/2 md:left-[52%] top-full mt-[-5px] md:mt-[-10px] transform -translate-x-1/2 md:translate-x-0"
                >
                  <div 
                    className="text-[24px] sm:text-[32px] md:text-[42px] font-medium whitespace-nowrap"
                    style={{
                      fontFamily: 'Constantia, serif',
                      color: '#C13317'
                    }}
                  >
                    by MOCKI
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
        
        {/* Правая часть - Phoenix */}
        <div className="relative flex-shrink-0 order-1 md:order-2 w-[70%] sm:w-[50%] md:w-[35%] mb-4 md:mb-0 md:ml-[-40px]">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.5, ease: "backOut" }}
            className="relative"
          >
            {/* Птица Phoenix */}
            <div className="w-full aspect-square">
              <img 
                src="/phoenix.svg" 
                alt="Phoenix" 
                className="w-full h-full object-contain"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
// app/bereza-derevo/page.tsx
"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function BerezaDerevoPage() {
  const logoRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const patternRef = useRef<HTMLDivElement>(null);
  
  const logoControls = useAnimation();
  const titleControls = useAnimation();
  const patternControls = useAnimation();

  const [isHoveringLogo, setIsHoveringLogo] = useState(false);
  const [isLogoLoaded, setIsLogoLoaded] = useState(false);
  const [isPatternLoaded, setIsPatternLoaded] = useState(false);

  // Анимация при скролле
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            titleControls.start({
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.8,
                ease: "easeOut"
              }
            });

            logoControls.start({
              opacity: 1,
              scale: 1,
              transition: {
                duration: 1,
                delay: 0.2,
                ease: [0.16, 1, 0.3, 1]
              }
            });

            patternControls.start({
              opacity: 0.3,
              transition: {
                duration: 1.5,
                delay: 0.5
              }
            });
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
      }
    );

    if (logoRef.current) {
      observer.observe(logoRef.current);
    }

    return () => {
      if (logoRef.current) {
        observer.unobserve(logoRef.current);
      }
    };
  }, [logoControls, titleControls, patternControls]);

  // Параллакс эффект для паттерна
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!patternRef.current) return;
      
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const x = (clientX / innerWidth - 0.5) * 20;
      const y = (clientY / innerHeight - 0.5) * 20;
      
      patternRef.current.style.transform = `translate(${x}px, ${y}px)`;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAF6F0] via-[#F5F0E6] to-[#F0ECE0] relative overflow-hidden">
      {/* Лиственный паттерн фона */}
      <motion.div
        ref={patternRef}
        initial={{ opacity: 0 }}
        animate={patternControls}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-20">
          {!isPatternLoaded && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#F5F0E6]" />
          )}
          <Image
            src="/bereza-derevo/pattern.png"
            alt="Лиственный паттерн"
            fill
            className="object-cover object-left"
            onLoadingComplete={() => setIsPatternLoaded(true)}
            priority
          />
          
          {/* Дополнительные декоративные элементы */}
          <div className="absolute inset-0">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                animate={{
                  rotate: [0, 360],
                  y: [0, Math.random() * 20 - 10]
                }}
                transition={{
                  duration: Math.random() * 20 + 20,
                  repeat: Infinity,
                  ease: "linear",
                  delay: Math.random() * 5
                }}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  opacity: Math.random() * 0.1 + 0.05
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#2E7D32">
                  <path d="M12,2 C8,2 4,6 4,10 C4,14 8,18 12,22 C16,18 20,14 20,10 C20,6 16,2 12,2 Z M12,6 C14,6 16,8 16,10 C16,12 14,14 12,14 C10,14 8,12 8,10 C8,8 10,6 12,6 Z" />
                </svg>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Градиентная маска для плавного перехода */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-[#F5F0E6]/50 to-[#F5F0E6]" />
      </motion.div>

      {/* Кнопка "Назад к работам" */}
      <div className="fixed top-6 left-6 z-50">
        <Link href="/#works">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            whileHover={{ 
              x: 5,
              backgroundColor: "#4CAF50",
              borderColor: "#388E3C",
              boxShadow: "0 8px 25px rgba(76, 175, 80, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all duration-300"
            style={{
              backgroundColor: "#81C784",
              border: "2px solid #66BB6A",
              boxShadow: "0 4px 12px rgba(76, 175, 80, 0.2)"
            }}
          >
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 16 16" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="transition-transform group-hover:-translate-x-0.5"
            >
              <path 
                d="M10 12L6 8L10 4L11 5L8 8L11 11L10 12Z" 
                fill="#FFFFFF"
              />
            </svg>
            <span className="text-sm font-medium tracking-tight text-white">
              Назад к работам
            </span>
          </motion.div>
        </Link>
      </div>

      {/* Заголовок страницы */}
      <div ref={titleRef} className="pt-24 pb-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={titleControls}
          className="mb-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-2"
            style={{ backgroundColor: "rgba(139, 195, 74, 0.1)" }}>
            <span className="text-lg">🌿</span>
            <span className="text-sm font-medium tracking-wide uppercase" style={{ color: "#558B2F" }}>
              Фирменный стиль
            </span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={titleControls}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
          style={{
            color: "#33691E",
            fontFamily: "'Merriweather', serif"
          }}
        >
          Берёза & Дерево
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="h-px w-32 mx-auto mb-6"
          style={{
            background: "linear-gradient(90deg, transparent, #8BC34A, transparent)"
          }}
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-lg tracking-wide max-w-2xl mx-auto px-4"
          style={{ color: "#689F38" }}
        >
          Мастерская, где рождаются вещи с характером
        </motion.p>
      </div>

      {/* Основной контент - логотип */}
      <div className="container mx-auto px-4 pb-20 relative z-10">
        <motion.div
          ref={logoRef}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={logoControls}
          className="relative"
        >
          {/* Контейнер логотипа */}
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            {/* Основной логотип */}
            <motion.div
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.3 }
              }}
              onMouseEnter={() => setIsHoveringLogo(true)}
              onMouseLeave={() => setIsHoveringLogo(false)}
              className="relative w-full max-w-4xl mx-auto"
            >
              {/* Фон для логотипа */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl p-8 md:p-12"
                style={{
                  backgroundColor: "#FFFFFF",
                  border: "2px solid #E8F5E9",
                  boxShadow: isHoveringLogo 
                    ? "0 25px 50px rgba(139, 195, 74, 0.15)" 
                    : "0 15px 35px rgba(0, 0, 0, 0.05)"
                }}
              >
                {/* Контент логотипа */}
                <div className="relative aspect-video w-full">
                  {!isLogoLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 border-4 border-t-transparent rounded-full animate-spin"
                        style={{ borderColor: "#8BC34A" }} />
                    </div>
                  )}
                  
                  <Image
                    src="/bereza-derevo/logo-with-bg.png"
                    alt="Логотип Берёза & Дерево"
                    fill
                    className="object-contain p-4"
                    onLoadingComplete={() => setIsLogoLoaded(true)}
                    priority
                  />
                  
                  {/* Свечение при наведении */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHoveringLogo ? 0.4 : 0 }}
                    className="absolute inset-0 bg-gradient-to-br from-[#8BC34A]/20 to-[#4CAF50]/20 pointer-events-none rounded-2xl"
                  />
                </div>

                {/* Декоративные элементы */}
                <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-[#8BC34A]/30 rounded-tl-lg" />
                <div className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-[#8BC34A]/30 rounded-tr-lg" />
                <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b-2 border-l-2 border-[#8BC34A]/30 rounded-bl-lg" />
                <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-[#8BC34A]/30 rounded-br-lg" />
              </div>

              {/* Подпись под логотипом */}
              <motion.div
                animate={{ opacity: isHoveringLogo ? 1 : 0.7 }}
                className="mt-8 text-center"
              >
                <p className="text-sm tracking-wider uppercase mb-2" style={{ color: "#558B2F" }}>
                  Экологичный дизайн с характером
                </p>
                <div className="flex items-center justify-center gap-4">
                  <div className="w-8 h-px bg-gradient-to-r from-transparent to-[#8BC34A]" />
                  <span className="text-xs text-gray-500">Наведите для деталей</span>
                  <div className="w-8 h-px bg-gradient-to-r from-[#8BC34A] to-transparent" />
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Детали проекта */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-20 max-w-4xl mx-auto"
          >
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center shadow-lg">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: "rgba(139, 195, 74, 0.1)" }}>
                  <span className="text-xl" style={{ color: "#558B2F" }}>🎨</span>
                </div>
                <h4 className="font-bold mb-2" style={{ color: "#33691E" }}>
                  Концепция
                </h4>
                <p className="text-gray-700 text-sm">
                  Соединение природной эстетики с современным дизайном
                </p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center shadow-lg">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: "rgba(139, 195, 74, 0.1)" }}>
                  <span className="text-xl" style={{ color: "#558B2F" }}>🌳</span>
                </div>
                <h4 className="font-bold mb-2" style={{ color: "#33691E" }}>
                  Эко-философия
                </h4>
                <p className="text-gray-700 text-sm">
                  Уважение к природным материалам и sustainable подходу
                </p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center shadow-lg">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: "rgba(139, 195, 74, 0.1)" }}>
                  <span className="text-xl" style={{ color: "#558B2F" }}>✨</span>
                </div>
                <h4 className="font-bold mb-2" style={{ color: "#33691E" }}>
                  Уникальность
                </h4>
                <p className="text-gray-700 text-sm">
                  Каждая вещь обладает собственным характером и историей
                </p>
              </div>
            </div>

            {/* Дополнительная информация */}
            <div className="mt-12 bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold mb-6 text-center" style={{ color: "#33691E" }}>
                О проекте «Берёза & Дерево»
              </h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2" style={{ color: "#558B2F" }}>
                    <span>🎯</span>
                    Задачи проекта
                  </h4>
                  <ul className="text-gray-700 space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-[#8BC34A] mt-1">•</span>
                      Создание узнаваемой визуальной идентификации
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#8BC34A] mt-1">•</span>
                      Передача философии бережного отношения к природе
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#8BC34A] mt-1">•</span>
                      Разработка фирменного стиля для ремесленной мастерской
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#8BC34A] mt-1">•</span>
                      Создание эмоциональной связи с целевой аудиторией
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2" style={{ color: "#558B2F" }}>
                    <span>⚙️</span>
                    Технические детали
                  </h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Формат логотипа:</span>
                      <span className="font-medium" style={{ color: "#33691E" }}>Vector (SVG)</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Цветовая палитра:</span>
                      <span className="font-medium" style={{ color: "#33691E" }}>Natural Green</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Год создания:</span>
                      <span className="font-medium" style={{ color: "#33691E" }}>2025</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Программы:</span>
                      <span className="font-medium" style={{ color: "#33691E" }}>Illustrator</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Цветовая палитра */}
              <div className="mt-8 pt-8 border-t border-gray-100">
                <h4 className="font-semibold mb-4 text-center" style={{ color: "#558B2F" }}>
                  Цветовая палитра бренда
                </h4>
                <div className="flex justify-center gap-4">
                  {[
                    { color: "#3B5144", name: "Goblin" },
                    { color: "#7DA896", name: "Acapulco" },
                    { color: "#F5F0E6", name: "Cream white" }
                  ].map((item, index) => (
                    <div key={index} className="text-center">
                      <div 
                        className="w-12 h-12 rounded-lg mx-auto mb-2 shadow-md border border-gray-200"
                        style={{ backgroundColor: item.color }}
                      />
                      <div className="text-xs text-gray-600 max-w-[80px] mx-auto">
                        {item.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Интерактивный элемент */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-12 text-center"
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full"
              style={{ backgroundColor: "rgba(139, 195, 74, 0.1)" }}>
              <span className="text-lg">🌱</span>
              <p className="text-sm font-medium" style={{ color: "#558B2F" }}>
                Качество, вдохновленное природой • Экологичный подход • Уникальный характер
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Футер */}
      <div className="border-t border-[#E8F5E9] py-8 text-center bg-white/50">
        <div className="container mx-auto px-4">
          <p className="text-gray-600 text-sm mb-2">
            «Берёза & Дерево» • Фирменный стиль для ремесленной мастерской • 2025
          </p>
          <div className="flex justify-center gap-4 mt-2">
            <span className="text-xs text-gray-500 px-3 py-1 rounded-full"
              style={{ backgroundColor: "rgba(139, 195, 74, 0.1)" }}>
              Brand Identity
            </span>
            <span className="text-xs text-gray-500 px-3 py-1 rounded-full"
              style={{ backgroundColor: "rgba(139, 195, 74, 0.1)" }}>
              Logo Design
            </span>
            <span className="text-xs text-gray-500 px-3 py-1 rounded-full"
              style={{ backgroundColor: "rgba(139, 195, 74, 0.1)" }}>
              Eco Design
            </span>
          </div>
        </div>
      </div>

      {/* Декоративные плавающие элементы */}
      <div className="fixed bottom-4 left-4 z-20 opacity-10">
        <div className="w-16 h-16">
          <svg viewBox="0 0 100 100" fill="#8BC34A">
            <path d="M50,10 C70,10 90,30 90,50 C90,70 70,90 50,90 C30,90 10,70 10,50 C10,30 30,10 50,10 Z M50,20 C35,20 20,35 20,50 C20,65 35,80 50,80 C65,80 80,65 80,50 C80,35 65,20 50,20 Z" />
          </svg>
        </div>
      </div>

      <div className="fixed top-1/4 right-8 z-20 opacity-10">
        <div className="w-12 h-12">
          <svg viewBox="0 0 100 100" fill="#33691E">
            <path d="M30,50 Q50,30 70,50 Q50,70 30,50 Z" />
          </svg>
        </div>
      </div>
    </div>
  );
}
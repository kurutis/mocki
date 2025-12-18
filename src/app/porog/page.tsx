// app/porog/page.tsx
"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function PorogPage() {
  const posterRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  
  const posterControls = useAnimation();
  const contentControls = useAnimation();
  const titleControls = useAnimation();

  const [isHoveringPoster, setIsHoveringPoster] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Анимация появления постера при скролле
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            posterControls.start({
              opacity: 1,
              y: 0,
              scale: 1,
              transition: {
                duration: 1.2,
                ease: [0.16, 1, 0.3, 1]
              }
            });

            titleControls.start({
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.8,
                delay: 0.3,
                ease: "easeOut"
              }
            });

            contentControls.start({
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.8,
                delay: 0.5,
                ease: "easeOut"
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

    if (posterRef.current) {
      observer.observe(posterRef.current);
    }

    return () => {
      if (posterRef.current) {
        observer.unobserve(posterRef.current);
      }
    };
  }, [posterControls, contentControls, titleControls]);

  // Эффект параллакса для постера
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isHoveringPoster || !posterRef.current) return;
      
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const x = (clientX / innerWidth - 0.5) * 20;
      const y = (clientY / innerHeight - 0.5) * 20;
      
      posterRef.current.style.transform = `
        perspective(1000px)
        rotateX(${-y}deg)
        rotateY(${x}deg)
        scale(${isHoveringPoster ? 1.02 : 1})
      `;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isHoveringPoster]);

  // Цитаты из произведения для анимации
  const quotes = [
    "Порог — это не преграда. Это граница между тем, кто ты есть, и тем, кем можешь стать.",
    "Каждый выбор приближает нас к своему порогу.",
    "За гранью страха начинается настоящая жизнь."
  ];
  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] via-[#111111] to-[#0a0a0a] text-white relative overflow-hidden">
      {/* Декоративный звездный фон */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(80)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-[1px] h-[1px] bg-white rounded-full"
            animate={{
              opacity: [0.1, 0.8, 0.1],
              scale: [0.5, 1.2, 0.5]
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
        {/* Туманность */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-900/10 to-blue-900/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-900/10 to-cyan-900/10 rounded-full blur-3xl" />
      </div>

      {/* Кнопка "Назад к работам" */}
      <div className="fixed top-6 left-6 z-50">
        <Link href="/#works">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ 
              x: 5,
              backgroundColor: "rgba(255, 255, 255, 0.15)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all duration-300"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.08)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)"
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
                fill="rgba(255, 255, 255, 0.9)"
              />
            </svg>
            <span className="text-sm font-medium tracking-tight" style={{ color: "rgba(255, 255, 255, 0.9)" }}>
              Назад к работам
            </span>
          </motion.div>
        </Link>
      </div>

      {/* Заголовок страницы */}
      <div ref={titleRef} className="pt-24 pb-12 text-center relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={titleControls}
          className="text-4xl md:text-5xl font-light tracking-wider mb-4"
          style={{
            fontFamily: "'Times New Roman', serif",
            letterSpacing: "0.1em",
            color: "rgba(255, 255, 255, 0.95)"
          }}
        >
          СЕРГЕЙ ЛУКЬЯНЕНКО
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="h-px w-48 mx-auto mb-6"
          style={{
            background: "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.3) 50%, transparent 100%)"
          }}
        />
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-6xl md:text-7xl font-bold tracking-tight"
          style={{
            fontFamily: "'Playfair Display', serif",
            color: "rgba(255, 255, 255, 0.98)",
            textShadow: "0 2px 20px rgba(0, 0, 0, 0.5)"
          }}
        >
          «ПОРОГ»
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-6 text-lg tracking-wide text-gray-300 max-w-2xl mx-auto px-4"
        >
          Шрифтовой плакат для обложки научно-фантастического произведения
        </motion.p>
      </div>

      {/* Основной контент */}
      <div className="container mx-auto px-4 pb-20 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 items-start max-w-7xl mx-auto">
          {/* Постер - ЗАНИМАЕТ ВСЮ ШИРИНУ КОНТЕЙНЕРА */}
          <motion.div
            ref={posterRef}
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            animate={posterControls}
            onMouseEnter={() => setIsHoveringPoster(true)}
            onMouseLeave={() => setIsHoveringPoster(false)}
            className="relative cursor-pointer w-full lg:w-1/2"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="relative">
              {/* Рамка постера */}
              <div className="absolute inset-0 border-2 border-white/10 rounded-2xl pointer-events-none z-10" />
              
              {/* Сам плакат */}
              <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-xl overflow-hidden shadow-2xl h-full">
                {/* Контент плаката */}
                <div className="relative w-full h-full min-h-[600px] lg:min-h-[700px]">
                  {/* Реальный файл плаката */}
                  <Image
                    src="/porog/porog.png"
                    alt="Плакат 'Порог' Сергея Лукьяненко"
                    fill
                    className="object-contain p-6 lg:p-8"
                    onLoadingComplete={() => setImageLoaded(true)}
                    priority
                    sizes="(max-width: 768px) 100vw, 66vw"
                  />
                  
                  {/* Лоадер пока грузится изображение */}
                  {!imageLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 border-4 border-t-transparent border-cyan-500 rounded-full animate-spin" />
                    </div>
                  )}
                  
                  {/* Наложение градиента по краям */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/20 pointer-events-none" />
                </div>

                {/* Эффект свечения при наведении */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isHoveringPoster ? 0.3 : 0 }}
                  className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 pointer-events-none rounded-xl"
                />
              </div>

              {/* Декоративные уголки */}
              <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-white/20 z-20" />
              <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-white/20 z-20" />
              <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-white/20 z-20" />
              <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-white/20 z-20" />
              
              {/* Подсветка при наведении */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isHoveringPoster ? 1 : 0 }}
                className="absolute inset-0 border-2 border-cyan-400/30 rounded-2xl pointer-events-none z-10"
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Подпись под постером */}
            <motion.div
              animate={{ opacity: isHoveringPoster ? 1 : 0.7 }}
              className="mt-6 text-center text-gray-400 text-sm"
            >
              <p className="mb-1">Шрифтовой плакат для книжной обложки • 2023</p>
              <p className="text-xs text-gray-500">Наведите для эффекта параллакса • Перетащите для изменения угла обзора</p>
            </motion.div>
          </motion.div>

          {/* Информация о проекте - теперь узкая колонка справа */}
          <motion.div
            ref={contentRef}
            initial={{ opacity: 0, y: 40 }}
            animate={contentControls}
            className="space-y-8 w-full lg:w-1/2"
          >
            {/* О проекте */}
            <div className="bg-gradient-to-br from-white/5 to-transparent rounded-xl p-6 border border-white/10">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <span className="text-cyan-400">✦</span>
                Концепция плаката
              </h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                Плакат создан для обложки научно-фантастического романа Сергея Лукьяненко «Порог». 
                Основная идея — визуализация перехода, границы между мирами.
              </p>
              <p className="text-gray-300 leading-relaxed text-sm">
                Типографика становится основным выразительным средством, передавая космическую атмосферу и философскую глубину произведения.
              </p>
            </div>

            {/* Типографика */}
            <div className="bg-gradient-to-br from-white/5 to-transparent rounded-xl p-6 border border-white/10">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <span className="text-cyan-400">✺</span>
                Типографическое решение
              </h3>
              <div className="space-y-3">
                <div>
                  <div className="text-cyan-300 font-medium mb-1 text-sm">Основной шрифт</div>
                  <div className="text-lg" style={{ fontFamily: "'Cinzel', serif" }}>
                    Anvyl Regular
                  </div>
                </div>
                <div>
                  <div className="text-cyan-300 font-medium mb-1 text-sm">Второстепенный текст</div>
                  <div className="text-base" style={{ fontFamily: "'Inter', sans-serif" }}>
                    Sagewold
                  </div>
                </div>
                <div className="pt-3 border-t border-white/10">
                  <div className="text-cyan-300 font-medium mb-2 text-sm">Особенности:</div>
                  <ul className="text-gray-300 text-xs space-y-1">
                    <li>• Строгая модульная сетка</li>
                    <li>• Контраст размеров</li>
                    <li>• Точные межбуквенные расстояния</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Технические детали */}
            <div className="bg-gradient-to-br from-white/5 to-transparent rounded-xl p-6 border border-white/10">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <span className="text-cyan-400">⚙️</span>
                Технические характеристики
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="text-gray-400 text-xs mb-1">Формат</div>
                  <div className="text-white font-medium text-sm">A4 (210 × 297 мм)</div>
                </div>
                <div>
                  <div className="text-gray-400 text-xs mb-1">Разрешение</div>
                  <div className="text-white font-medium text-sm">300 DPI</div>
                </div>
                <div>
                  <div className="text-gray-400 text-xs mb-1">Цветовая модель</div>
                  <div className="text-white font-medium text-sm">CMYK</div>
                </div>
                <div>
                  <div className="text-gray-400 text-xs mb-1">Год</div>
                  <div className="text-white font-medium text-sm">2023</div>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-white/10">
                <div className="text-gray-400 text-xs mb-1">Программы</div>
                <div className="flex flex-wrap gap-1">
                  <span className="px-2 py-0.5 bg-gray-800/50 rounded text-xs">Illustrator</span>
                </div>
              </div>
            </div>

            {/* Кнопка деталей */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowDetails(!showDetails)}
              className="w-full py-3 rounded-xl text-center transition-all duration-300"
              style={{
                background: "linear-gradient(135deg, rgba(6, 182, 212, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)",
                border: "1px solid rgba(6, 182, 212, 0.3)",
                backdropFilter: "blur(10px)"
              }}
            >
              <div className="flex items-center justify-center gap-2">
                <span className="font-medium text-sm">
                  {showDetails ? "Скрыть детали" : "Показать детали"}
                </span>
                <motion.svg
                  animate={{ rotate: showDetails ? 180 : 0 }}
                  width="16"
                  height="16"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </motion.svg>
              </div>
            </motion.button>

            {/* Дополнительные материалы */}
            <motion.div
              initial={false}
              animate={{ 
                height: showDetails ? "auto" : 0,
                opacity: showDetails ? 1 : 0 
              }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="space-y-3 pt-3 border-t border-white/10">
                <div>
                  <h4 className="font-semibold mb-2 text-cyan-300 text-sm">Процесс создания</h4>
                  <div className="text-gray-300 text-xs space-y-1">
                    <p>• Исследование творчества автора</p>
                    <p>• Разработка концепции</p>
                    <p>• Создание эскизов</p>
                    <p>• Подбор шрифтовой пары</p>
                    <p>• Верстка и проработка</p>
                    <p>• Подготовка для печати</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Анимированная цитата */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-16 max-w-3xl mx-auto text-center"
        >
          <div className="relative">
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-6xl text-white/10">"</div>
            <motion.div
              key={currentQuote}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="text-xl italic text-gray-300 mb-4 leading-relaxed px-4"
              style={{ fontFamily: "'Cormorant Garamond', serif", minHeight: "80px" }}
            >
              {quotes[currentQuote]}
            </motion.div>
            <div className="flex justify-center space-x-1">
              {quotes.map((_, index) => (
                <motion.div
                  key={index}
                  className={`w-2 h-2 rounded-full ${index === currentQuote ? 'bg-cyan-400' : 'bg-gray-600'}`}
                  animate={{ scale: index === currentQuote ? 1.2 : 1 }}
                  transition={{ duration: 0.3 }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Футер с информацией */}
      <div className="border-t border-white/10 py-8 text-center">
        <div className="container mx-auto px-4">
          <p className="text-gray-500 text-sm">
            Проект «Порог» • Шрифтовой плакат для книжной обложки • 2023
          </p>
          <p className="text-gray-600 text-xs mt-2">
            Все права на произведение принадлежат Сергею Лукьяненко и издательству «АСТ»
          </p>
        </div>
      </div>
    </div>
  );
}
// app/eco-posters/page.tsx
"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function EcoPostersPage() {
  const postersRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  
  const postersControls = useAnimation();
  const titleControls = useAnimation();

  const [hoveredPoster, setHoveredPoster] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState([false, false, false]);

  // Эко-плакаты данные
  const posters = [
    {
      id: 1,
      image: "/eco/eco-1.png",
      title: "СДЕЛАЙ МУСОР СТИЛЬНЫМ!",
      slogan: "Дайте мусору шанс!",
      color: "#2E7D32",
      description: "Плакат о переосмыслении отходов"
    },
    {
      id: 2,
      image: "/eco/eco-2.png",
      title: "НЕТ, ЭТО ТРЕНД!",
      slogan: "Вторая жизнь мусора...",
      color: "#388E3C",
      description: "Плакат о модных экологических решениях"
    },
    {
      id: 3,
      image: "/eco/eco-3.png",
      title: "ЭКО - ЭТО СТИЛЬНО",
      slogan: "Будущее за осознанным потреблением",
      color: "#43A047",
      description: "Плакат о стильном подходе к экологии"
    }
  ];

  // Определение мобильного устройства
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Анимация при скролле
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            titleControls.start({
              opacity: 1,
              y: 0,
              transition: { duration: 0.8, ease: "easeOut" }
            });

            postersControls.start({
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.8,
                delay: 0.3,
                ease: [0.16, 1, 0.3, 1]
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

    if (postersRef.current) {
      observer.observe(postersRef.current);
    }

    return () => {
      if (postersRef.current) {
        observer.unobserve(postersRef.current);
      }
    };
  }, [postersControls, titleControls]);

  // Карусель для мобильных устройств
  useEffect(() => {
    if (!isMobile) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % posters.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isMobile, posters.length]);

  const handleImageLoad = (index: number) => {
    setImagesLoaded(prev => {
      const newLoaded = [...prev];
      newLoaded[index] = true;
      return newLoaded;
    });
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + posters.length) % posters.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % posters.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F1F8E9] via-white to-[#E8F5E9] relative overflow-hidden">
      {/* Эко-паттерн фона */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, #4CAF50 1px, transparent 1px),
            radial-gradient(circle at 75% 75%, #2E7D32 1px, transparent 1px),
            repeating-linear-gradient(45deg, transparent, transparent 2px, #81C784 2px, #81C784 3px)
          `,
          backgroundSize: '50px 50px, 50px 50px, 20px 20px'
        }} />
        
        {/* Декоративные листья */}
        <div className="absolute top-10 right-10 w-32 h-32 opacity-10">
          <svg viewBox="0 0 100 100" fill="#2E7D32">
            <path d="M50,20 C60,10 80,15 85,30 C90,45 75,60 65,70 C55,80 40,85 30,75 C20,65 15,50 25,40 C35,30 40,30 50,20 Z" />
          </svg>
        </div>
        <div className="absolute bottom-10 left-10 w-24 h-24 opacity-10">
          <svg viewBox="0 0 100 100" fill="#4CAF50">
            <path d="M30,50 C20,40 25,20 40,15 C55,10 70,20 75,35 C80,50 70,65 55,70 C40,75 25,70 20,55 C15,40 20,30 30,50 Z" />
          </svg>
        </div>
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
              backgroundColor: "#4CAF50",
              borderColor: "#2E7D32"
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
      <div ref={titleRef} className="pt-24 pb-12 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={titleControls}
          className="mb-6"
        >
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full mb-4"
            style={{ backgroundColor: "rgba(76, 175, 80, 0.1)" }}>
            <span className="text-2xl">🌿</span>
            <span className="text-sm font-semibold tracking-wider uppercase" style={{ color: "#2E7D32" }}>
              Экологическая кампания
            </span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={titleControls}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-6xl font-bold tracking-tight mb-4"
          style={{
            color: "#1B5E20",
            fontFamily: "'Montserrat', sans-serif"
          }}
        >
          Эко-плакаты
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="h-1 w-32 mx-auto mb-6"
          style={{
            background: "linear-gradient(90deg, #4CAF50, #2E7D32, #4CAF50)"
          }}
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-lg tracking-wide max-w-2xl mx-auto px-4"
          style={{ color: "#388E3C" }}
        >
          Визуальная кампания, превращающая экологичное потребление в стиль жизни
        </motion.p>
      </div>

      {/* Основной контент - плакаты */}
      <div className="container mx-auto px-4 pb-20 relative z-10">
        <motion.div
          ref={postersRef}
          initial={{ opacity: 0, y: 40 }}
          animate={postersControls}
          className="relative"
        >
          {/* Десктопная версия - 3 плаката в ряд */}
          {!isMobile ? (
            <div className="flex justify-center items-center gap-8 lg:gap-12 xl:gap-16">
              {posters.map((poster, index) => (
                <motion.div
                  key={poster.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ 
                    scale: 1.05,
                    y: -10,
                    transition: { duration: 0.3 }
                  }}
                  onMouseEnter={() => setHoveredPoster(poster.id)}
                  onMouseLeave={() => setHoveredPoster(null)}
                  className="relative flex-1 max-w-[400px]"
                >
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl"
                    style={{
                      border: `3px solid ${poster.color}20`,
                      boxShadow: hoveredPoster === poster.id 
                        ? `0 20px 40px ${poster.color}40` 
                        : "0 10px 30px rgba(0, 0, 0, 0.1)"
                    }}
                  >
                    {/* Плакат */}
                    <div className="relative aspect-[3/4] bg-white">
                      <Image
                        src={poster.image}
                        alt={poster.title}
                        fill
                        className="object-cover"
                        onLoadingComplete={() => handleImageLoad(index)}
                        priority={index === 0}
                      />
                      
                      {/* Лоадер */}
                      {!imagesLoaded[index] && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                          <div className="w-12 h-12 border-4 border-t-transparent rounded-full animate-spin"
                            style={{ borderColor: poster.color }} />
                        </div>
                      )}
                      
                      {/* Наложение при наведении */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: hoveredPoster === poster.id ? 1 : 0 }}
                        className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none"
                      />
                    </div>

                    {/* Информация о плакате */}
                    <div className="p-6 bg-white">
                      <motion.h3
                        animate={{ color: hoveredPoster === poster.id ? poster.color : "#1B5E20" }}
                        className="text-xl font-bold mb-2 text-center tracking-tight"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        {poster.title}
                      </motion.h3>
                      <p className="text-gray-600 text-sm text-center font-light italic">
                        {poster.slogan}
                      </p>
                      
                      {/* Описание появляется при наведении */}
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ 
                          opacity: hoveredPoster === poster.id ? 1 : 0,
                          height: hoveredPoster === poster.id ? "auto" : 0
                        }}
                        className="text-gray-500 text-xs mt-3 text-center overflow-hidden"
                      >
                        {poster.description}
                      </motion.p>
                    </div>

                    {/* Декоративный уголок */}
                    <div className="absolute top-4 right-4 w-8 h-8">
                      <svg viewBox="0 0 24 24" fill={poster.color}>
                        <path d="M12,2 L22,12 L12,22 L2,12 Z" />
                      </svg>
                    </div>
                  </div>

                  {/* Индикатор загрузки */}
                  <div className="mt-4 flex justify-center">
                    <div className="w-2 h-2 rounded-full mx-1"
                      style={{
                        backgroundColor: imagesLoaded[index] ? poster.color : "#E0E0E0",
                        opacity: imagesLoaded[index] ? 1 : 0.5
                      }} />
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            /* Мобильная версия - карусель */
            <div className="relative">
              {/* Карусель */}
              <div className="overflow-hidden">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="relative"
                >
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl mx-auto max-w-md"
                    style={{
                      border: `3px solid ${posters[currentIndex].color}20`
                    }}
                  >
                    <div className="relative aspect-[3/4] bg-white">
                      <Image
                        src={posters[currentIndex].image}
                        alt={posters[currentIndex].title}
                        fill
                        className="object-cover"
                        onLoadingComplete={() => handleImageLoad(currentIndex)}
                        priority
                      />
                    </div>
                    
                    <div className="p-6 bg-white">
                      <h3 className="text-xl font-bold mb-2 text-center"
                        style={{ 
                          color: posters[currentIndex].color,
                          fontFamily: "'Montserrat', sans-serif"
                        }}>
                        {posters[currentIndex].title}
                      </h3>
                      <p className="text-gray-600 text-sm text-center font-light italic">
                        {posters[currentIndex].slogan}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Навигация карусели */}
              <div className="flex justify-center items-center gap-6 mt-8">
                <button
                  onClick={handlePrev}
                  className="w-12 h-12 flex items-center justify-center rounded-full shadow-lg"
                  style={{
                    backgroundColor: "#4CAF50",
                    border: "2px solid #2E7D32"
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                    <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z" />
                  </svg>
                </button>
                
                {/* Индикаторы */}
                <div className="flex gap-2">
                  {posters.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentIndex 
                          ? "scale-125" 
                          : "opacity-50"
                      }`}
                      style={{
                        backgroundColor: index === currentIndex 
                          ? posters[currentIndex].color 
                          : "#BDBDBD"
                      }}
                    />
                  ))}
                </div>
                
                <button
                  onClick={handleNext}
                  className="w-12 h-12 flex items-center justify-center rounded-full shadow-lg"
                  style={{
                    backgroundColor: "#4CAF50",
                    border: "2px solid #2E7D32"
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                    <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
                  </svg>
                </button>
              </div>

              {/* Подсказка */}
              <p className="text-center text-gray-600 text-sm mt-4">
                Листайте для просмотра всех плакатов
              </p>
            </div>
          )}

          {/* Подпись под плакатами */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-16 text-center"
          >
            <div className="inline-block px-6 py-3 rounded-full"
              style={{ backgroundColor: "rgba(76, 175, 80, 0.1)" }}>
              <p className="text-lg font-medium tracking-wide"
                style={{ color: "#2E7D32" }}>
                Эко-кампания: превращаем отходы в стиль
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Серия плакатов для экологического просвещения • 2023
              </p>
            </div>
          </motion.div>

          {/* Информация о проекте */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-16 max-w-3xl mx-auto"
          >
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center shadow-lg">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: "rgba(76, 175, 80, 0.1)" }}>
                  <span className="text-2xl">🎯</span>
                </div>
                <h4 className="font-bold mb-2" style={{ color: "#2E7D32" }}>
                  Цель кампании
                </h4>
                <p className="text-gray-700 text-sm">
                  Изменить восприятие экологических проблем через современный дизайн
                </p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center shadow-lg">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: "rgba(76, 175, 80, 0.1)" }}>
                  <span className="text-2xl">🎨</span>
                </div>
                <h4 className="font-bold mb-2" style={{ color: "#2E7D32" }}>
                  Дизайн-подход
                </h4>
                <p className="text-gray-700 text-sm">
                  Сочетание яркой типографики и экологической тематики
                </p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center shadow-lg">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: "rgba(76, 175, 80, 0.1)" }}>
                  <span className="text-2xl">🌱</span>
                </div>
                <h4 className="font-bold mb-2" style={{ color: "#2E7D32" }}>
                  Эффект
                </h4>
                <p className="text-gray-700 text-sm">
                  Плакаты использовались в экологических акциях и образовательных проектах
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Футер */}
      <div className="border-t border-green-100 py-8 text-center">
        <div className="container mx-auto px-4">
          <p className="text-gray-600 text-sm mb-2">
            Эко-плакаты • Серия для экологического просвещения • 2023
          </p>
          <div className="flex justify-center gap-4 mt-2">
            <span className="text-xs text-gray-500 px-3 py-1 rounded-full"
              style={{ backgroundColor: "rgba(76, 175, 80, 0.1)" }}>
              Adobe Illustrator
            </span>
          </div>
        </div>
      </div>

      {/* Декоративные элементы */}
      <div className="fixed bottom-4 right-4 z-20 opacity-20">
        <div className="w-24 h-24">
          <svg viewBox="0 0 100 100" fill="#4CAF50">
            <path d="M50,10 C70,10 90,30 90,50 C90,70 70,90 50,90 C30,90 10,70 10,50 C10,30 30,10 50,10 Z M50,20 C35,20 20,35 20,50 C20,65 35,80 50,80 C65,80 80,65 80,50 C80,35 65,20 50,20 Z" />
          </svg>
        </div>
      </div>
    </div>
  );
}
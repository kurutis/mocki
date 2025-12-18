// components/Works.tsx - исправленная версия
"use client";

import { motion, useAnimation } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function Works() {
  const router = useRouter();
  const [showMore, setShowMore] = useState(false);
  const [titleAnimationStarted, setTitleAnimationStarted] = useState(false);
  const [gridAnimationStarted, setGridAnimationStarted] = useState(false);
  const [buttonAnimationStarted, setButtonAnimationStarted] = useState(false);
  
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  
  const titleControls = useAnimation();
  const gridControls = useAnimation();
  const buttonControls = useAnimation();
  
  // Работы с реальными проектами
  const initialWorks = [
    { 
      id: 1, 
      title: "Троицкая камвольная фабрика", 
      category: "Веб-дизайн",
      description: "Редизайн корпоративного сайта",
      image: "/works/trowool.svg",
      year: "2024",
      route: "/troitskaya-kamvolnaya" // прямой маршрут
    },
    { 
      id: 2, 
      title: "3d-логотип", 
      category: "Логотип",
      description: "Экспериментальный шрифт",
      image: "/works/3d-logo.png",
      year: "2023",
      route: "/3d-logo" // прямой маршрут
    },
    { 
      id: 3, 
      title: "Сергей Лукьяненко 'Порог'", 
      category: "Плакат",
      description: "Шрифтовой плакат для обложки",
      image: "/works/porog.png",
      year: "2023",
      route: "/porog" // прямой маршрут
    },
    { 
      id: 4, 
      title: "Эко-плакаты", 
      category: "Плакат",
      description: "Плакаты с экологическим посылом",
      image: "/works/eco.png",
      year: "2023",
      route: "/eco-posters" // прямой маршрут
    },
    { 
      id: 5, 
      title: "Берёза & Дерево", 
      category: "Брендинг",
      description: "Фирменный стиль для компании",
      image: "/works/berez.svg",
      year: "2025",
      route: "/bereza-derevo" // прямой маршрут
    },
    { 
      id: 6, 
      title: "Центр психологической поддержки детей и подростков", 
      category: "Брендинг",
      description: "Логотип и фирменный стиль",
      image: "/works/psix.svg",
      year: "2025",
      route: "/psych-center" // прямой маршрут
    }
  ];

  const additionalWorks = [
    { 
    }
  ];
  
  const allWorks = showMore ? [...initialWorks, ...additionalWorks] : initialWorks;

  // Обработчик клика по работе
  const handleWorkClick = (route: string) => {
    router.push(route);
  };

  // Анимация заголовка при скролле
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !titleAnimationStarted) {
            setTitleAnimationStarted(true);
            titleControls.start({
              x: 0,
              transition: {
                duration: 0.8,
                ease: "easeOut"
              }
            });
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px"
      }
    );

    if (titleRef.current) {
      observer.observe(titleRef.current);
    }

    return () => {
      if (titleRef.current) {
        observer.unobserve(titleRef.current);
      }
    };
  }, [titleControls, titleAnimationStarted]);

  // Анимация сетки работ при скролле
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !gridAnimationStarted) {
            setGridAnimationStarted(true);
            gridControls.start({
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.6,
                ease: "easeOut"
              }
            });
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px"
      }
    );

    if (gridRef.current) {
      observer.observe(gridRef.current);
    }

    return () => {
      if (gridRef.current) {
        observer.unobserve(gridRef.current);
      }
    };
  }, [gridControls, gridAnimationStarted]);

  // Анимация кнопки при скролле
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !buttonAnimationStarted) {
            setButtonAnimationStarted(true);
            buttonControls.start({
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.6,
                delay: 0.3,
                ease: "easeOut"
              }
            });
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px"
      }
    );

    if (buttonRef.current) {
      observer.observe(buttonRef.current);
    }

    return () => {
      if (buttonRef.current) {
        observer.unobserve(buttonRef.current);
      }
    };
  }, [buttonControls, buttonAnimationStarted]);

  // Анимация при показе дополнительных работ
  useEffect(() => {
    if (showMore) {
      // Сбрасываем анимации для дополнительных работ
      setGridAnimationStarted(false);
      setTimeout(() => {
        setGridAnimationStarted(true);
      }, 100);
    }
  }, [showMore]);

  return (
    <div className="min-h-screen bg-[#1D1D1B] py-20 relative overflow-hidden">
      {/* ЗАГОЛОВОК "РАБОТЫ" - ВНЕ КОНТЕЙНЕРА, САМЫЙ ЛЕВЫЙ КРАЙ */}
      <div ref={titleRef} className="absolute left-0 top-40 z-20 w-auto">
        <div className="relative" style={{ width: '500px' }}>
          
          {/* Нижний блок - цвет #040303 */}
          <motion.div
            initial={{ x: -100 }}
            animate={titleControls}
            className="absolute w-full h-36"
            style={{
              backgroundColor: '#040303',
              borderTopLeftRadius: '0px',
              borderTopRightRadius: '70px',
              borderBottomLeftRadius: '0px',
              borderBottomRightRadius: '70px',
              boxShadow: '0 10px 30px rgba(4, 3, 3, 0.5)',
              left: '0',
              zIndex: 10
            }}
          />
          
          {/* Средний блок - в клетку */}
          <motion.div
            initial={{ x: -80 }}
            animate={titleControls}
            transition={{ delay: 0.1 }}
            className="absolute w-full h-32"
            style={{
              backgroundColor: '#FFD9BD',
              backgroundImage: `
                linear-gradient(to right, #997F99 1px, transparent 1px),
                linear-gradient(to bottom, #997F99 1px, transparent 1px)
              `,
              backgroundSize: '15px 15px',
              borderTopLeftRadius: '0px',
              borderTopRightRadius: '70px',
              borderBottomLeftRadius: '0px',
              borderBottomRightRadius: '70px',
              boxShadow: '0 8px 25px rgba(153, 127, 153, 0.3)',
              left: '0',
              zIndex: 20
            }}
          />
          
          {/* Верхний блок - с градиентом */}
          <motion.div
            initial={{ x: -60 }}
            animate={titleControls}
            transition={{ delay: 0.2 }}
            className="absolute w-full h-28"
            style={{
              background: 'linear-gradient(90deg, #BE3217 23%, #C23E20 53%, #CC5C37 83%, #D88152 100%)',
              borderTopLeftRadius: '0px',
              borderTopRightRadius: '70px',
              borderBottomLeftRadius: '0px',
              borderBottomRightRadius: '70px',
              boxShadow: '0 6px 20px rgba(190, 50, 23, 0.4)',
              left: '0',
              zIndex: 30
            }}
          >
            {/* Заголовок "РАБОТЫ" */}
            <motion.h2
              initial={{ y: 20 }}
              animate={titleControls}
              transition={{ delay: 0.3 }}
              className="absolute left-12 top-10 transform -translate-y-1/2 text-5xl font-bold"
              style={{
                fontFamily: 'Constantia, serif',
                color: '#FFCFB9',
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
              }}
            >
              РАБОТЫ
            </motion.h2>
          </motion.div>
        </div>
      </div>

      {/* КОНТЕЙНЕР ДЛЯ РАБОТ - ТОЛЬКО ДЛЯ СЕТКИ */}
      <div className="w-[90%] mx-auto pt-80">
        {/* Сетка работ 3x2 */}
        <motion.div
          ref={gridRef}
          initial={{ opacity: 0, y: 50 }}
          animate={gridControls}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto"
        >
          {allWorks.map((work, index) => (
            <motion.div
              key={work.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.5, 
                delay: (showMore ? index * 0.05 : 0.2 + index * 0.1),
                ease: "easeOut"
              }}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.3 }
              }}
              className="flex flex-col items-center group cursor-pointer"
              onClick={() => handleWorkClick(work.route)}
            >
              {/* Контейнер для превью работы */}
              <div 
                className="w-[350px] h-[350px] mb-4 overflow-hidden relative"
                style={{
                  backgroundColor: '#000000',
                  borderRadius: '20px',
                  boxShadow: '0 15px 40px rgba(0, 0, 0, 0.5)',
                }}
              >
                {/* Изображение работы */}
                <motion.div 
                  className="absolute inset-0"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <img 
                    src={work.image} 
                    alt={work.title}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                
                {/* Эффект наведения */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 0.8 }}
                  className="absolute inset-0 bg-gradient-to-t to-transparent"
                  style={{ 
                    borderRadius: '20px',
                  }}
                />
                
                {/* Информация о работе при наведении */}
                <motion.div
                  initial={{ y: 100, opacity: 0 }}
                  whileHover={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="absolute bottom-0 left-0 right-0 p-5"
                  style={{
                    background: 'linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.7) 70%, transparent 100%)',
                    borderRadius: '0 0 20px 20px'
                  }}
                >
                  <h3 className="text-xl font-bold mb-2" style={{ color: '#FFCFB9' }}>
                    {work.title}
                  </h3>
                  <div className="flex justify-between items-center">
                    <span className="text-sm px-3 py-1 rounded-full" 
                      style={{ 
                        backgroundColor: 'rgba(190, 50, 23, 0.2)',
                        color: '#FFCFB9'
                      }}>
                      {work.category}
                    </span>
                    <span className="text-sm" style={{ color: '#FFCFB9' }}>
                      {work.year}
                    </span>
                  </div>
                  <p className="text-sm mt-2" style={{ color: '#CCCCCC' }}>
                    {work.description}
                  </p>
                </motion.div>
                
                {/* Бордер при наведении */}
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  className="absolute inset-0 border-2 border-[#BE3217]"
                  style={{ 
                    borderRadius: '20px',
                    pointerEvents: 'none'
                  }}
                />
              </div>
              
              {/* Информация под карточкой */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.4,
                  delay: (showMore ? 0.4 + index * 0.05 : 0.6 + index * 0.1)
                }}
                className="text-center"
              >
                <h3 className="text-lg font-bold mb-1" style={{ color: '#FFCFB9' }}>
                  {work.title}
                </h3>
                <div className="flex justify-center items-center gap-3">
                  <span className="text-sm px-3 py-1 rounded-full" 
                    style={{ 
                      backgroundColor: 'rgba(190, 50, 23, 0.1)',
                      color: '#997F99',
                      border: '1px solid rgba(190, 50, 23, 0.3)'
                    }}>
                    {work.category}
                  </span>
                  <span className="text-sm" style={{ color: '#666666' }}>
                    {work.year}
                  </span>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Кнопка "Показать больше" */}
        <motion.div
          ref={buttonRef}
          initial={{ opacity: 0, y: 30 }}
          animate={buttonControls}
        >
          {!showMore && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              onClick={() => setShowMore(true)}
              className="flex items-center justify-center gap-2 mx-auto mt-16"
              style={{
                width: '180px',
                height: '45px',
                backgroundColor: 'transparent',
                color: '#691B0F',
                border: 'none',
                cursor: 'pointer',
                fontSize: '18px',
                fontWeight: '500'
              }}
              whileHover={{ 
                gap: '12px',
                scale: 1.05
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Показать больше</span>
              <motion.svg 
                width="18" 
                height="18" 
                viewBox="0 0 18 18" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                animate={{ y: [0, 3, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                <path 
                  d="M9 13.5L4.5 9L9 4.5L10.35 5.85L7.9875 8.2125H13.5V9.7875H7.9875L10.35 12.15L9 13.5Z" 
                  fill="#691B0F"
                />
              </motion.svg>
            </motion.button>
          )}

          {/* Кнопка "Скрыть" когда показаны все работы */}
          {showMore && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              onClick={() => setShowMore(false)}
              className="flex items-center justify-center gap-2 mx-auto mt-16"
              style={{
                width: '180px',
                height: '45px',
                backgroundColor: 'transparent',
                color: '#691B0F',
                border: 'none',
                cursor: 'pointer',
                fontSize: '18px',
                fontWeight: '500'
              }}
              whileHover={{ 
                gap: '12px',
                scale: 1.05
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Скрыть</span>
              <motion.svg 
                width="18" 
                height="18" 
                viewBox="0 0 18 18" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                style={{ transform: 'rotate(180deg)' }}
                animate={{ y: [0, -3, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                <path 
                  d="M9 13.5L4.5 9L9 4.5L10.35 5.85L7.9875 8.2125H13.5V9.7875H7.9875L10.35 12.15L9 13.5Z" 
                  fill="#691B0F"
                />
              </motion.svg>
            </motion.button>
          )}
        </motion.div>
      </div>
    </div>
  );
}
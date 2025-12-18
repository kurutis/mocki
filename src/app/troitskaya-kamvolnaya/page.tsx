"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
import Link from "next/link";

export default function TroitskayaKamvolnayaPage() {
  const titleRef = useRef<HTMLDivElement>(null);
  const problemsRef = useRef<HTMLDivElement>(null);
  const transformationRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  
  const titleControls = useAnimation();
  const problemsControls = useAnimation();
  const transformationControls = useAnimation();
  const resultsControls = useAnimation();

  // Анимация заголовка при скролле
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            titleControls.start({
              x: 0,
              opacity: 1,
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
  }, [titleControls]);

  // Анимация блока проблем
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            problemsControls.start({
              y: 0,
              opacity: 1,
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

    if (problemsRef.current) {
      observer.observe(problemsRef.current);
    }

    return () => {
      if (problemsRef.current) {
        observer.unobserve(problemsRef.current);
      }
    };
  }, [problemsControls]);

  // Анимация блока преображения
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            transformationControls.start({
              y: 0,
              opacity: 1,
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

    if (transformationRef.current) {
      observer.observe(transformationRef.current);
    }

    return () => {
      if (transformationRef.current) {
        observer.unobserve(transformationRef.current);
      }
    };
  }, [transformationControls]);

  // Анимация блока результатов
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            resultsControls.start({
              y: 0,
              opacity: 1,
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

    if (resultsRef.current) {
      observer.observe(resultsRef.current);
    }

    return () => {
      if (resultsRef.current) {
        observer.unobserve(resultsRef.current);
      }
    };
  }, [resultsControls]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#BF4960] via-[#BB6475] to-[#B8778A] py-20 relative overflow-hidden">
      {/* Декоративный фон */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_#BF4960_0%,_#BB6475_100%)] opacity-70" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239C92AC' fill-opacity='0.1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E')] opacity-30" />
      </div>

      {/* Кнопка назад */}
      <div className="w-[90%] mx-auto mb-12 relative z-10">
        <Link 
          href="/#works" 
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full hover:scale-105 transition-transform"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: '#FFFFFF'
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 12L6 8L10 4L11 5L8 8L11 11L10 12Z" fill="currentColor"/>
          </svg>
          Назад к работам
        </Link>
      </div>

      {/* Верхняя часть страницы */}
      <div className="w-[90%] max-w-6xl mx-auto relative z-10">
        {/* Заголовок */}
        <div ref={titleRef} className="mb-16">
          <motion.h1
            initial={{ x: -50, opacity: 0 }}
            animate={titleControls}
            className="text-5xl md:text-6xl font-bold mb-8 leading-tight"
            style={{
              color: '#FFFFFF',
              textShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
            }}
          >
            Редизайн для Троицкой камвольной фабрики
          </motion.h1>

          {/* Вступительный текст */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={titleControls}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <p className="text-xl leading-relaxed mb-8 max-w-4xl"
              style={{
                color: '#FFE5E9',
                lineHeight: '1.8'
              }}
            >
              Сайт Троицкой камвольной фабрики, созданный в эпоху первых iPhone, исправно работал на протяжении многих лет, 
              но стал серьёзным препятствием для развития бизнеса — отпугивал новых пользователей и не отражал современный уровень компании.
            </p>

            {/* Анимированные логотипы */}
            <div className="flex items-center justify-center gap-12 mb-12">
              {/* Старый логотип */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, -2, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative"
              >
                <div className="w-32 h-32 p-4 rounded-2xl"
                  style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                    backdropFilter: 'blur(5px)',
                    border: '2px dashed rgba(255, 255, 255, 0.3)'
                  }}
                >
                  <img 
                    src="/trowool/old-logo.svg" 
                    alt="Старый логотип" 
                    className="w-full h-full object-contain opacity-70"
                  />
                </div>
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-sm"
                  style={{ color: '#FFB8C2' }}>
                  2009
                </div>
              </motion.div>

              {/* Анимированная стрелка */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="w-16 h-16"
              >
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M32 52L20 40L32 28L36 32L27.41 40.59H44V43.41H27.41L36 52L32 52Z" fill="#FFFFFF"/>
                </svg>
              </motion.div>

              {/* Новый логотип */}
              <motion.div
                animate={{
                  y: [0, 10, 0],
                  rotate: [0, 2, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
                className="relative"
              >
                <div className="w-32 h-32 p-4 rounded-2xl"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(5px)',
                    border: '2px solid rgba(255, 255, 255, 0.5)',
                    boxShadow: '0 8px 32px rgba(255, 255, 255, 0.2)'
                  }}
                >
                  <img 
                    src="/trowool/new-logo.svg" 
                    alt="Новый логотип" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-sm font-medium"
                  style={{ color: '#FFFFFF' }}>
                  2024
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Блок "Проблемы старого дизайна" */}
        <div ref={problemsRef} className="mb-24">
          <motion.h2
            initial={{ y: 50, opacity: 0 }}
            animate={problemsControls}
            className="text-4xl font-bold mb-12 text-center"
            style={{ color: '#FFFFFF' }}
          >
            Проблемы старого дизайна
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Список проблем */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={problemsControls}
              transition={{ delay: 0.2 }}
              className="space-y-8"
            >
              {[
                {
                  title: "Визуал и впечатление",
                  description: "Устаревшая графика, неадаптивный дизайн (только ПК), отсутствие современной эстетики"
                },
                {
                  title: "Юзабилити и конверсия",
                  description: "Нелогичная навигация, запутанные сценарии, отсутствие чётких призывов к действию (СТА)"
                },
                {
                  title: "Контент и коммуникация",
                  description: "Устаревшая структура информации, сложные тексты, отсутствие ясного месседжа"
                },
                {
                  title: "Бренд и доверие",
                  description: "Сайт создавал впечатление стагнации, подрывая доверие клиентов и партнёров"
                }
              ].map((problem, index) => (
                <motion.div
                  key={index}
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ x: 10 }}
                  className="p-6 rounded-2xl"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 flex-shrink-0 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                      <span className="text-sm font-bold" style={{ color: '#FFB8C2' }}>
                        {index + 1}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2" style={{ color: '#FFFFFF' }}>
                        {problem.title}
                      </h3>
                      <p className="text-base leading-relaxed" style={{ color: '#FFE5E9' }}>
                        {problem.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Реальный скриншот старого сайта */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={problemsControls}
              transition={{ delay: 0.4 }}
              className="relative"
            >
              <div className="sticky top-24">
                <div className="rounded-2xl overflow-hidden shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-300">
                  <div className="p-4" style={{ backgroundColor: '#2D3748' }}>
                    <div className="flex gap-2 mb-3">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="border-2 border-gray-700 rounded-lg overflow-hidden">
                      <div className="text-center py-3 bg-gradient-to-r from-red-600/80 to-red-800/80">
                        <span className="text-white font-medium">Скриншот старого сайта (2009)</span>
                      </div>
                      <div className="p-2 bg-gray-900">
                        <img 
                          src="/trowool/old-site-screenshot.png" 
                          alt="Скриншот старого сайта Троицкой камвольной фабрики"
                          className="w-full h-auto rounded"
                        />
                      </div>
                      <div className="p-3 bg-gray-800">
                        <p className="text-gray-300 text-sm text-center">
                          Устаревший дизайн, неадаптивная верстка
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 w-24 h-24 opacity-20">
                  <img 
                    src="/trowool/old-logo.svg" 
                    alt="" 
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Блок "Преображение" */}
        <div ref={transformationRef} className="mb-24">
          <motion.h2
            initial={{ y: 50, opacity: 0 }}
            animate={transformationControls}
            className="text-4xl font-bold mb-12 text-center"
            style={{ color: '#FFFFFF' }}
          >
            Преображение
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Реальный скриншот нового сайта */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={transformationControls}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              <div className="sticky top-24">
                <div className="rounded-2xl overflow-hidden shadow-2xl transform -rotate-1 hover:rotate-0 transition-transform duration-300">
                  <div className="p-4" style={{ backgroundColor: '#1A202C' }}>
                    <div className="flex gap-2 mb-3">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="border-2 border-gray-700 rounded-lg overflow-hidden">
                      <div className="text-center py-3 bg-gradient-to-r from-green-600/80 to-green-800/80">
                        <span className="text-white font-medium">Обновлённый сайт (2024)</span>
                      </div>
                      <div className="p-2 bg-gray-900">
                        <img 
                          src="/trowool/new-site-screenshot.png" 
                          alt="Скриншот нового сайта Троицкой камвольной фабрики"
                          className="w-full h-auto rounded"
                        />
                      </div>
                      <div className="p-3 bg-gray-800">
                        <p className="text-gray-300 text-sm text-center">
                          Современный дизайн, адаптивная верстка
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-6 -left-6 w-20 h-20 opacity-30">
                  <img 
                    src="/trowool/new-logo.svg" 
                    alt="" 
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </motion.div>

            {/* Ключевые результаты */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={transformationControls}
              transition={{ delay: 0.4 }}
              className="space-y-6"
            >
              {[
                "Создан чистый, современный интерфейс с акцентом на удобство",
                "Разработана адаптивная вёрстка для всех устройств (от смартфонов до десктопов)",
                "Обновлён фирменный стиль с сохранением узнаваемости бренда",
                "Упрощена навигация (до 3 кликов до ключевой информации)",
                "Внедрены понятные призывы к действию (СТА)",
                "Переработаны тексты по принципам копирайтинга для лучшего восприятия"
              ].map((result, index) => (
                <motion.div
                  key={index}
                  initial={{ x: 30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ x: -10 }}
                  className="flex items-start gap-4 p-4 rounded-xl"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.07)',
                    border: '1px solid rgba(255, 255, 255, 0.15)'
                  }}
                >
                  <div className="w-6 h-6 flex-shrink-0 rounded-full flex items-center justify-center mt-1"
                    style={{ backgroundColor: 'rgba(255, 184, 194, 0.2)' }}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 3L4.5 8.5L2 6" stroke="#FFB8C2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className="text-lg" style={{ color: '#FFFFFF' }}>
                    {result}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Общий вывод */}
        <div ref={resultsRef} className="text-center">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={resultsControls}
            className="p-12 rounded-3xl"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(20px)'
            }}
          >
            <h3 className="text-3xl font-bold mb-8" style={{ color: '#FFFFFF' }}>
              Итоги трансформации
            </h3>
            <p className="text-xl leading-relaxed max-w-3xl mx-auto mb-8"
              style={{ color: '#FFE5E9' }}>
              Страница эффективно демонстрирует путь трансформации сайта Троицкой камвольной фабрики — 
              от устаревшего, неудобного ресурса до современного, адаптивного и конверсионного инструмента. 
              Чёткая структура, сочетание текста и визуальных примеров, акцент на проблемах и решениях 
              делают кейс понятным и убедительным для потенциальных клиентов и партнёров.
            </p>
            
            {/* Показатели успеха */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              {[
                { value: "+40%", label: "Конверсия" },
                { value: "-60%", label: "Отказы" },
                { value: "+3.5x", label: "Время на сайте" },
                { value: "100%", label: "Адаптивность" }
              ].map((metric, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                  className="p-6 rounded-2xl"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.15)'
                  }}
                >
                  <div className="text-3xl font-bold mb-2" style={{ color: '#FFFFFF' }}>
                    {metric.value}
                  </div>
                  <div className="text-sm" style={{ color: '#FFB8C2' }}>
                    {metric.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Декоративные элементы */}
      <motion.div
        animate={{
          y: [0, 20, 0],
          rotate: [0, 5, 0]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/4 left-10 w-16 h-16 opacity-20"
      >
        <img 
          src="/trowool/old-logo.svg" 
          alt="" 
          className="w-full h-full object-contain"
        />
      </motion.div>

      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, -5, 0]
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }}
        className="absolute bottom-1/4 right-10 w-20 h-20 opacity-30"
      >
        <img 
          src="/trowool/new-logo.svg" 
          alt="" 
          className="w-full h-full object-contain"
        />
      </motion.div>
    </div>
  );
}
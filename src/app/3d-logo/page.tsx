"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ThreeDLogoPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 py-8 md:py-12">
      {/* Кнопка назад */}
      <div className="container mx-auto px-4 mb-8">
        <Link href="/#works">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 16 16" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M10 12L6 8L10 4L11 5L8 8L11 11L10 12Z" 
                fill="#4B5563"
              />
            </svg>
            <span className="text-gray-700 font-medium">Назад к работам</span>
          </motion.div>
        </Link>
      </div>

      {/* Заголовок страницы */}
      <div className="container mx-auto px-4 mb-8 text-center">
        <motion.h1
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
        >
          3D Логотип
        </motion.h1>
        <motion.p
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-gray-600 text-lg max-w-2xl mx-auto"
        >
          Интерактивная 3D-визуализация фирменного логотипа
        </motion.p>
      </div>

      {/* Основной контейнер */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Левая панель - информация */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-200 h-full">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">О проекте</h2>
              <p className="text-gray-600 mb-6">
                Интерактивная 3D-модель логотипа с возможностью вращения, 
                изменения материалов и динамическим освещением.
              </p>
              
              <div className="space-y-4">
                {[
                  { label: "Формат", value: "GLB/GLTF" },
                  { label: "Полигоны", value: "≈ 15k" },
                  { label: "Текстуры", value: "4K PBR" },
                  { label: "Анимации", value: "3 варианта" }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                  >
                    <span className="text-gray-700">{item.label}</span>
                    <span className="font-semibold text-blue-600">{item.value}</span>
                  </motion.div>
                ))}
              </div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl"
              >
                <h3 className="font-bold text-gray-800 mb-2">Полезный совет</h3>
                <p className="text-sm text-gray-600">
                  После завершения работ вы сможете вращать модель с помощью мыши, 
                  приближать/отдалять колесиком и изменять материалы кликом.
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Центральная панель - 3D просмотр (упрощенная версия) */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2"
          >
            <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl overflow-hidden min-h-[600px] border border-gray-300/50 flex items-center justify-center p-8">
              {/* Декоративный фон для 3D области */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-cyan-500/5" />
              
              {/* Сетка для имитации 3D пространства */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: `
                    linear-gradient(90deg, #3b82f6 1px, transparent 1px),
                    linear-gradient(180deg, #3b82f6 1px, transparent 1px)
                  `,
                  backgroundSize: '50px 50px'
                }} />
              </div>

              {/* Центральное сообщение */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 max-w-2xl w-full"
              >
                {/* Декоративный фон */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-cyan-500/10 rounded-3xl blur-xl" />
                
                {/* Основной контейнер сообщения */}
                <div className="relative bg-gradient-to-br from-white/95 to-gray-50/95 backdrop-blur-lg rounded-2xl p-8 md:p-12 shadow-2xl border border-gray-200/50">
                  {/* Декоративные элементы */}
                  <div className="absolute -top-4 -left-4 w-16 h-16 bg-blue-500/20 rounded-full blur-md" />
                  <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-purple-500/20 rounded-full blur-md" />
                  
                  {/* Иконка предупреждения */}
                  <div className="flex justify-center mb-6">
                    <motion.div
                      animate={{ 
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 1
                      }}
                      className="relative"
                    >
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className="h-10 w-10 text-white" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.5 16.5c-.77.833.192 2.5 1.732 2.5z" 
                          />
                        </svg>
                      </div>
                      
                      {/* Анимированное свечение */}
                      <motion.div
                        animate={{ 
                          scale: [1, 1.5, 1],
                          opacity: [0.5, 0.8, 0.5]
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity 
                        }}
                        className="absolute inset-0 w-full h-full bg-blue-500/30 rounded-full blur-md -z-10"
                      />
                    </motion.div>
                  </div>

                  {/* Заголовок */}
                  <motion.h1
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-2xl md:text-3xl font-bold text-center mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                  >
                    Временные технические работы
                  </motion.h1>

                  {/* Основное сообщение */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-center mb-6"
                  >
                    <p className="text-gray-700 mb-4 leading-relaxed">
                      Мы обновляем нашу 3D-визуализацию для улучшения качества отображения
                    </p>
                    
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full shadow-lg cursor-pointer"
                    >
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-5 w-5" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M13 10V3L4 14h7v7l9-11h-7z" 
                        />
                      </svg>
                      <span className="font-semibold">Обновление в процессе</span>
                    </motion.div>
                  </motion.div>

                  {/* Дополнительная информация */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
                  >
                    {[
                      {
                        title: "Статус",
                        value: "В работе",
                        color: "text-yellow-600",
                        bg: "bg-yellow-50",
                        icon: "🔄"
                      },
                      {
                        title: "Ожидаемое время",
                        value: "24 часа",
                        color: "text-blue-600",
                        bg: "bg-blue-50",
                        icon: "⏱️"
                      },
                      {
                        title: "Сложность",
                        value: "Средняя",
                        color: "text-purple-600",
                        bg: "bg-purple-50",
                        icon: "⚙️"
                      }
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        whileHover={{ y: -5 }}
                        className={`${item.bg} rounded-xl p-4 text-center border border-gray-200`}
                      >
                        <div className="text-2xl mb-2">{item.icon}</div>
                        <div className="text-sm text-gray-500 mb-1">{item.title}</div>
                        <div className={`font-bold ${item.color}`}>{item.value}</div>
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Извинение */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="text-center p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100"
                  >
                    <div className="flex items-center justify-center gap-3 mb-2">
                      <span className="text-2xl">🙏</span>
                      <h3 className="text-lg font-semibold text-gray-800">Приносим свои извинения</h3>
                    </div>
                    <p className="text-gray-600 text-sm">
                      За неудобства, вызванные временными техническими работами. 
                      Мы работаем над восстановлением 3D-отображения в кратчайшие сроки.
                    </p>
                  </motion.div>

                  {/* Анимированный прогресс бар */}
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                    className="h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-full mt-6"
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Футер с контактами */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="container mx-auto px-4 mt-12"
      >
        <div className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Остались вопросы?</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Если вам нужно срочно ознакомиться с 3D-моделью или у вас есть вопросы 
            по техническим характеристикам, свяжитесь с нами.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            Связаться с поддержкой
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
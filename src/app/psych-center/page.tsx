"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function PsychCenterPage() {
  const logoRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  
  const logoControls = useAnimation();
  const titleControls = useAnimation();
  const gridControls = useAnimation();

  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [imagesLoaded, setImagesLoaded] = useState<Record<string, boolean>>({});
  const [activeTab, setActiveTab] = useState<'logos' | 'colors' | 'materials'>('logos');

  // Цвета бренда
  const brandColors = [
    { id: 'color-1', name: 'Желтый', pantone: 'P 7-8C', rgb: '255, 208, 0', hex: '#FFD000' },
    { id: 'color-2', name: 'Оранжевый', pantone: 'P 20-7C', rgb: '246, 160, 42', hex: '#F6A02A' },
    { id: 'color-3', name: 'Синий', pantone: 'Cool Gray 1 C', rgb: '46, 93, 159', hex: '#2E5D9F' }
  ];

  // Материалы - ВЕРНУЛ постер
  const materials = [
    { 
      id: 'poster', 
      fileName: 'poster.png', // Оставляю, если файл есть в папке psych-center
      type: 'poster', 
      title: 'Плакат', 
      description: 'Мотивационный постер для центра' 
    },
    { 
      id: 'business-card-front', 
      fileName: 'business-card-front.svg', 
      type: 'card', 
      title: 'Визитка (лицевая сторона)', 
      description: 'Основные контакты' 
    },
    { 
      id: 'business-card-back', 
      fileName: 'business-card-back.svg', 
      type: 'card', 
      title: 'Визитка (оборотная сторона)', 
      description: 'Дополнительная информация' 
    },
    { 
      id: 'alphabet', 
      fileName: 'alphabet.png', 
      type: 'typography', 
      title: 'Шрифт Horovod Regular', 
      description: 'Фирменная типографика' 
    },
  ];

  // Логотипы
  const colorLogos = [
    { 
      id: 'logo-color-black', 
      fileName: 'logo-color-black.svg',
      bg: 'black', 
      text: 'Цветной на черном фоне', 
      color: 'color' 
    },
    { 
      id: 'logo-color-white-basic-text', 
      fileName: 'logo-color-white-basic-text.svg',
      bg: 'white', 
      text: 'Цветной на белом обычный текст', 
      color: 'color' 
    },
    { 
      id: 'logo-color-white', 
      fileName: 'logo-color-white.svg',
      bg: 'white', 
      text: 'Цветной на белом', 
      color: 'color' 
    },
  ];

  const bwLogos = [
    { 
      id: 'logo-bw-black', 
      fileName: 'logo-bw-black.svg',
      bg: 'black', 
      text: 'Ч/Б на черном фоне' 
    },
    { 
      id: 'logo-bw-gray', 
      fileName: 'logo-bw-gray.svg',
      bg: 'white', 
      text: 'Ч/Б на сером' 
    },
    { 
      id: 'logo-bw-white', 
      fileName: 'logo-bw-white.svg',
      bg: 'white', 
      text: 'Ч/Б на белом' 
    }
  ];

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

            logoControls.start({
              opacity: 1,
              scale: 1,
              transition: {
                duration: 1,
                delay: 0.2,
                ease: [0.16, 1, 0.3, 1]
              }
            });

            gridControls.start({
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.8,
                delay: 0.4,
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

    if (logoRef.current) {
      observer.observe(logoRef.current);
    }

    return () => {
      if (logoRef.current) {
        observer.unobserve(logoRef.current);
      }
    };
  }, [logoControls, titleControls, gridControls]);

  // Загрузка изображений
  const handleImageLoad = (id: string) => {
    setImagesLoaded(prev => ({
      ...prev,
      [id]: true
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F0F8FF] via-white to-[#E6F7FF] relative overflow-hidden">
      {/* Звездный паттерн фона */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.03]">
          {[...Array(100)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              animate={{
                opacity: [0.1, 0.3, 0.1],
                scale: [0.8, 1.2, 0.8]
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 5
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: Math.random() * 4 + 2 + 'px',
                height: Math.random() * 4 + 2 + 'px',
                backgroundColor: i % 3 === 0 ? '#FFD000' : i % 3 === 1 ? '#F6A02A' : '#2E5D9F',
                borderRadius: '50%'
              }}
            />
          ))}
        </div>
        
        {/* Волны */}
        <div className="absolute bottom-0 left-0 right-0 h-48 opacity-10">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="#2E5D9F" />
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" fill="#F6A02A" />
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="#FFD000" />
          </svg>
        </div>
      </div>

      {/* Кнопка "Назад к работам" */}
      <div className="fixed top-6 left-6 z-50">
        <Link href="/#works">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            whileHover={{ 
              x: 5,
              backgroundColor: "#2E5D9F",
              borderColor: "#1E4A8C",
              boxShadow: "0 8px 25px rgba(46, 93, 159, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all duration-300"
            style={{
              backgroundColor: "#4A7BC8",
              border: "2px solid #2E5D9F",
              boxShadow: "0 4px 12px rgba(46, 93, 159, 0.2)"
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
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full mb-2"
            style={{ backgroundColor: "rgba(46, 93, 159, 0.1)" }}>
            <span className="text-lg">💙</span>
            <span className="text-sm font-semibold tracking-wide uppercase" style={{ color: "#2E5D9F" }}>
              Фирменный стиль
            </span>
            <span className="text-lg">💛</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={titleControls}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-bold tracking-tight mb-4 px-4"
          style={{
            color: "#1E3A5F",
            fontFamily: "'Horovod', sans-serif",
            lineHeight: 1.2
          }}
        >
          Центр психологической поддержки<br />детей и подростков
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="h-1 w-40 mx-auto mb-6"
          style={{
            background: "linear-gradient(90deg, #FFD000, #F6A02A, #2E5D9F)"
          }}
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-lg tracking-wide max-w-3xl mx-auto px-4"
          style={{ color: "#2E5D9F" }}
        >
          Профессиональная помощь в доброжелательной и поддерживающей атмосфере
        </motion.p>
      </div>

      {/* Основной контент */}
      <div className="container mx-auto px-4 pb-20 relative z-10">
        {/* Табы навигации */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex p-1 rounded-xl" style={{ backgroundColor: "rgba(46, 93, 159, 0.1)" }}>
            {[
              { id: 'logos', label: 'Логотипы' },
              { id: 'colors', label: 'Цвета' },
              { id: 'materials', label: 'Материалы' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  activeTab === tab.id 
                    ? 'text-white shadow-lg' 
                    : 'text-[#2E5D9F] hover:bg-white/50'
                }`}
                style={{
                  backgroundColor: activeTab === tab.id ? '#2E5D9F' : 'transparent'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Секция логотипов */}
        <motion.div
          ref={logoRef}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={logoControls}
          className={`${activeTab === 'logos' ? 'block' : 'hidden'}`}
        >
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center" style={{ color: "#1E3A5F" }}>
              Варианты логотипа на разных фонах
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Цветные логотипы */}
              {colorLogos.map((logo, index) => (
                <motion.div
                  key={logo.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ 
                    scale: 1.05,
                    y: -5,
                    transition: { duration: 0.3 }
                  }}
                  onMouseEnter={() => setHoveredItem(logo.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className="relative"
                >
                  <div className={`rounded-2xl overflow-hidden shadow-xl p-6 ${
                    logo.bg === 'black' ? 'bg-gray-900' : 'bg-white border border-gray-200'
                  }`}>
                    <div className="relative aspect-square">
                      <Image
                        src={`/psych-center/${logo.fileName}`}
                        alt={logo.text}
                        fill
                        className="object-contain p-4"
                        onLoadingComplete={() => handleImageLoad(logo.id)}
                      />
                      
                      {!imagesLoaded[logo.id] && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-8 h-8 border-3 border-t-transparent rounded-full animate-spin"
                            style={{ borderColor: logo.bg === 'black' ? '#FFD000' : '#2E5D9F' }} />
                        </div>
                      )}
                    </div>
                    
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: hoveredItem === logo.id ? 1 : 0 }}
                      className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none rounded-2xl"
                    />
                  </div>
                  
                  <div className="mt-4 text-center">
                    <p className="text-sm font-medium" style={{ color: "#1E3A5F" }}>
                      {logo.text}
                    </p>
                    <div className="flex justify-center mt-2">
                      <div className={`w-3 h-3 rounded-full ${
                        logo.color === 'color' ? 'bg-gradient-to-r from-[#FFD000] via-[#F6A02A] to-[#2E5D9F]' : 'bg-gray-400'
                      }`} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Ч/Б логотипы */}
            <div className="mt-12">
              <h3 className="text-xl font-bold mb-6 text-center" style={{ color: "#1E3A5F" }}>
                Монохромные варианты
              </h3>
              
              <div className="grid md:grid-cols-3 gap-8">
                {bwLogos.map((logo, index) => (
                  <motion.div
                    key={logo.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="relative"
                  >
                    <div className={`rounded-2xl overflow-hidden shadow-lg p-6 ${
                      logo.bg === 'black' ? 'bg-gray-800' : 'bg-gray-50 border border-gray-300'
                    }`}>
                      <div className="relative aspect-square">
                        <Image
                          src={`/psych-center/${logo.fileName}`}
                          alt={logo.text}
                          fill
                          className="object-contain p-4"
                          onLoadingComplete={() => handleImageLoad(logo.id)}
                        />
                      </div>
                    </div>
                    
                    <div className="mt-4 text-center">
                      <p className="text-sm font-medium text-gray-700">{logo.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Секция цветов */}
        <motion.div
          ref={gridRef}
          initial={{ opacity: 0, y: 40 }}
          animate={gridControls}
          className={`${activeTab === 'colors' ? 'block' : 'hidden'}`}
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center" style={{ color: "#1E3A5F" }}>
              Фирменная цветовая палитра
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {brandColors.map((color, index) => (
                <motion.div
                  key={color.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="relative"
                >
                  <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
                    {/* Цветовой блок */}
                    <div 
                      className="h-48 w-full"
                      style={{ backgroundColor: color.hex }}
                    />
                    
                    {/* Информация о цвете */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2" style={{ color: "#1E3A5F" }}>
                        {color.name}
                      </h3>
                      
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Pantone</p>
                          <p className="font-mono font-bold text-lg" style={{ color: color.hex }}>
                            {color.pantone}
                          </p>
                        </div>
                        
                        <div>
                          <p className="text-sm text-gray-600 mb-1">RGB</p>
                          <p className="font-mono text-gray-800">
                            {color.rgb}
                          </p>
                        </div>
                        
                        <div>
                          <p className="text-sm text-gray-600 mb-1">HEX</p>
                          <p className="font-mono text-gray-800">
                            {color.hex}
                          </p>
                        </div>
                      </div>
                      
                      {/* Цветовой круг */}
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.8 }}
                        className="mt-6 mx-auto w-16 h-16 rounded-full border-4 border-white shadow-lg"
                        style={{ backgroundColor: color.hex }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Цветовая комбинация */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-12 bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg"
            >
              <h3 className="text-xl font-bold mb-6 text-center" style={{ color: "#1E3A5F" }}>
                Цветовая психология в дизайне
              </h3>
              
              <div className="flex flex-wrap justify-center gap-6">
                {brandColors.map((color) => (
                  <div key={color.id} className="text-center">
                    <div 
                      className="w-20 h-20 rounded-xl mx-auto mb-3 shadow-lg"
                      style={{ backgroundColor: color.hex }}
                    />
                    <p className="text-sm font-medium" style={{ color: "#1E3A5F" }}>
                      {color.name}
                    </p>
                    <p className="text-xs text-gray-600 mt-1 max-w-[120px] mx-auto">
                      {color.name === 'Желтый' && 'Энергия, оптимизм, радость'}
                      {color.name === 'Оранжевый' && 'Теплота, дружелюбие, активность'}
                      {color.name === 'Синий' && 'Доверие, спокойствие, надежность'}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Секция материалов */}
        <motion.div
          className={`${activeTab === 'materials' ? 'block' : 'hidden'}`}
        >
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center" style={{ color: "#1E3A5F" }}>
              Ключевые элементы фирменного стиля
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {materials.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ 
                    scale: 1.05,
                    y: -5,
                    transition: { duration: 0.3 }
                  }}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className="relative"
                >
                  <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200 h-full">
                    {/* Изображение материала */}
                    <div className="relative h-64">
                      <Image
                        src={`/psych-center/${item.fileName}`}
                        alt={item.title}
                        fill
                        className={`object-contain ${item.type === 'typography' ? 'p-2' : 'p-4'}`}
                        onLoadingComplete={() => handleImageLoad(item.id)}
                      />
                      
                      {!imagesLoaded[item.id] && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-8 h-8 border-3 border-t-transparent rounded-full animate-spin"
                            style={{ borderColor: "#2E5D9F" }} />
                        </div>
                      )}
                      
                      {/* Бейдж типа */}
                      <div className="absolute top-4 right-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          item.type === 'poster' ? 'bg-[#FFD000]/20 text-[#B38900]' :
                          item.type === 'card' ? 'bg-[#F6A02A]/20 text-[#C67C1E]' :
                          item.type === 'typography' ? 'bg-[#2E5D9F]/20 text-[#2E5D9F]' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {item.type === 'poster' ? 'Постер' :
                           item.type === 'card' ? 'Визитка' :
                           item.type === 'typography' ? 'Шрифт' : 'Лого'}
                        </span>
                      </div>
                    </div>
                    
                    {/* Описание */}
                    <div className="p-6">
                      <h3 className="text-lg font-bold mb-2" style={{ color: "#1E3A5F" }}>
                        {item.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {item.description}
                      </p>
                      
                      {/* Индикатор при наведении */}
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ 
                          opacity: hoveredItem === item.id ? 1 : 0,
                          height: hoveredItem === item.id ? 'auto' : 0
                        }}
                        className="overflow-hidden"
                      >
                        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
                          <span className="text-xs text-gray-500">Нажмите для увеличения</span>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="#2E5D9F">
                            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                          </svg>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Подпись под материалами */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-12 text-center"
            >
              <div className="inline-block px-8 py-4 rounded-2xl bg-white/80 backdrop-blur-sm shadow-lg">
                <p className="text-lg font-medium mb-2" style={{ color: "#1E3A5F" }}>
                  Фирменный стиль Центра психологической поддержки детей и подростков
                </p>
                <p className="text-gray-600 text-sm">
                  Полный комплект брендбука • Единая система идентификации • 2025
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Контактная информация */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-20 max-w-3xl mx-auto"
        >
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
            <h3 className="text-2xl font-bold mb-6 text-center" style={{ color: "#1E3A5F", fontFamily: "'Horovod', sans-serif" }}>
              Контактные данные центра
            </h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: "rgba(46, 93, 159, 0.1)" }}>
                  <span className="text-xl">📞</span>
                </div>
                <p className="text-sm text-gray-600 mb-1">Телефон</p>
                <p className="text-lg font-bold" style={{ color: "#1E3A5F" }}>
                  +7 (XXX) XXX-XX-XX
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: "rgba(246, 160, 42, 0.1)" }}>
                  <span className="text-xl">🌐</span>
                </div>
                <p className="text-sm text-gray-600 mb-1">Сайт</p>
                <p className="text-lg font-bold" style={{ color: "#1E3A5F" }}>
                  центр-психологии.рф
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: "rgba(255, 208, 0, 0.1)" }}>
                  <span className="text-xl">📍</span>
                </div>
                <p className="text-sm text-gray-600 mb-1">Адрес</p>
                <p className="text-lg font-bold" style={{ color: "#1E3A5F" }}>
                  г. Москва, ул. Примерная, д. 1
                </p>
              </div>
            </div>
            
            <div className="mt-8 pt-8 border-t border-gray-100">
              <p className="text-center text-gray-600">
                График работы: Пн-Пт 9:00-20:00, Сб-Вс 10:00-18:00
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Футер */}
      <div className="border-t border-[#E6F7FF] py-8 text-center bg-white/50">
        <div className="container mx-auto px-4">
          <p className="text-gray-600 text-sm mb-2">
            Центр психологической поддержки детей и подростков • Фирменный стиль • 2025
          </p>
          <div className="flex justify-center gap-4 mt-2">
            <span className="text-xs text-gray-500 px-3 py-1 rounded-full"
              style={{ backgroundColor: "rgba(46, 93, 159, 0.1)" }}>
              Brand Identity
            </span>
            <span className="text-xs text-gray-500 px-3 py-1 rounded-full"
              style={{ backgroundColor: "rgba(46, 93, 159, 0.1)" }}>
              Logo Design
            </span>
            <span className="text-xs text-gray-500 px-3 py-1 rounded-full"
              style={{ backgroundColor: "rgba(46, 93, 159, 0.1)" }}>
              Brandbook
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
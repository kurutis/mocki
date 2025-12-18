// components/AboutMe.tsx - с исправленными анимациями (без прозрачности)
"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useState, useRef } from "react";

export default function AboutMe() {
  const [isVisible, setIsVisible] = useState(false);
  const [titleAnimationStarted, setTitleAnimationStarted] = useState(false);
  const [skillsAnimationStarted, setSkillsAnimationStarted] = useState(false);
  
  const titleRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  
  const titleControls = useAnimation();
  const skillsControls = useAnimation();

  // Запуск начальной анимации при загрузке
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Анимация заголовка при скролле
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !titleAnimationStarted) {
            setTitleAnimationStarted(true);
            
            // Анимация для каждого блока по отдельности
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

  // Анимация блока навыков при скролле
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !skillsAnimationStarted) {
            setSkillsAnimationStarted(true);
            
            // Анимация для каждого блока по отдельности
            skillsControls.start({
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

    if (skillsRef.current) {
      observer.observe(skillsRef.current);
    }

    return () => {
      if (skillsRef.current) {
        observer.unobserve(skillsRef.current);
      }
    };
  }, [skillsControls, skillsAnimationStarted]);

  return (
    <div className="min-h-screen bg-[#1D1D1B] py-20 relative overflow-hidden">
      {/* Контейнер 90% ширины для основного контента */}
      <div className="w-[90%] mx-auto">
        
        {/* Заголовок и три блока - РАСПОЛОЖЕНЫ АБСОЛЮТНО СЛЕВА */}
        <div ref={titleRef} className="absolute left-0 top-40 w-[500px] z-20">
          
          {/* Три блока под заголовком - БЕЗ ОТСТУПОВ СЛЕВА */}
          <div className="relative w-full">
            
            {/* Нижний блок - цвет #040303, самый дальний, выступает СНИЗУ */}
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
            
            {/* Средний блок - в клетку, выступает СНИЗУ */}
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
            
            {/* Верхний блок - с градиентом слева направо */}
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
              {/* Заголовок "ОБО МНЕ" - НА верхнем блоке */}
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
                ОБО МНЕ
              </motion.h2>
            </motion.div>
          </div>
        </div>

        {/* Основной контент - фотография и текст */}
        <div className="flex flex-col lg:flex-row gap-12 pt-80">
          
          {/* Левая часть - фотография с эффектами - УВЕЛИЧЕННАЯ */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -50 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="lg:w-2/5 relative z-10"
          >
            <div className="relative w-[360px] h-[540px] mx-auto">
              
              {/* Черный блок сзади - #040303 - УВЕЛИЧЕН */}
              <div 
                className="absolute w-[100%] h-[100%] rounded-xl"
                style={{
                  backgroundColor: '#040303',
                  transform: 'rotate(-10deg) translate(25px, 18px)',
                  boxShadow: '0 15px 40px rgba(0, 0, 0, 0.6)',
                  top: '-2.5%',
                  left: '-7.5%'
                }}
              />
              
              {/* Тетрадный лист - #FFD9BD с клетками #997F99 - УВЕЛИЧЕН */}
              <div 
                className="absolute w-[100%] h-[100%] rounded-xl"
                style={{
                  backgroundColor: '#FFD9BD',
                  transform: 'rotate(-5deg) translate(15px, 12px)',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)',
                  top: '-1.5%',
                  left: '-5%',
                  backgroundImage: `
                    linear-gradient(to right, #997F99 1px, transparent 1px),
                    linear-gradient(to bottom, #997F99 1px, transparent 1px)
                  `,
                  backgroundSize: '24px 24px'
                }}
              />
              
              {/* Фотография - УВЕЛИЧЕНА */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="absolute w-full h-full rounded-xl overflow-hidden"
                style={{
                  borderRadius: '12px',
                  boxShadow: '0 25px 60px rgba(190, 50, 23, 0.35)',
                  filter: 'sepia(0.2) contrast(1.1) brightness(1.05)',
                  transform: 'rotate(-5deg)'
                }}
              >
                <img 
                  src="/photo.jpg" 
                  alt="Даша | MOCKI"
                  className="w-full h-full object-cover"
                />
                
                {/* Винтажный оверлей */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-orange-900/5 to-transparent" />
              </motion.div>
            </div>
          </motion.div>

          {/* Правая часть - текст и информация */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 50 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="lg:w-3/5 relative"
          >
            {/* Приветствие и описание */}
            <div className="mb-10">
              <p className="text-lg leading-relaxed mb-6 text-justify text-about"
                style={{
                  fontSize: '22px',
                  lineHeight: '1.8'
                }}
              >
                Привет! Меня зовут <span className="font-bold">Даша|MOCKI</span>, я дизайнер. Я превращаю ваши идеи в визуальные миры — проектирую цифровые пространства, создаю фирменный стиль и рисую графику, которая запоминается. Я нахожу баланс между смыслом и эстетикой, чтобы ваш бренд заговорил, а продукт нашёл свою аудиторию.
              </p>
            </div>

            {/* Контакты - РАЗДЕЛЕНЫ НА ДВЕ КОЛОНКИ */}
            <div className="mb-16">
              <h3 className="text-xl font-bold mb-6 text-about" style={{ fontSize: '22px' }}>
                Контакты:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Левая колонка - Telegram и VK */}
                <div className="space-y-6">
                  {/* Telegram */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.9 }}
                    className="flex items-center gap-4"
                  >
                    <div className="w-12 h-12 flex-shrink-0">
                      <img 
                        src="/telegram.svg" 
                        alt="Telegram" 
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <span className="text-lg font-medium text-about" style={{ fontSize: '22px' }}>
                        mocki02
                      </span>
                    </div>
                  </motion.div>
                  
                  {/* VK */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 1.0 }}
                    className="flex items-center gap-4"
                  >
                    <div className="w-12 h-12 flex-shrink-0">
                      <img 
                        src="/vk.svg" 
                        alt="VK" 
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <span className="text-lg font-medium text-about" style={{ fontSize: '22px' }}>
                        mocki_06
                      </span>
                    </div>
                  </motion.div>
                </div>
                
                {/* Правая колонка - Email и Телефон */}
                <div className="space-y-6">
                  {/* Email */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.9 }}
                    className="flex items-center gap-4"
                  >
                    <div className="w-12 h-12 flex-shrink-0">
                      <img 
                        src="/mail.svg" 
                        alt="Email" 
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <span className="text-lg font-medium text-about" style={{ fontSize: '22px' }}>
                        mallemail.ru
                      </span>
                    </div>
                  </motion.div>
                  
                  {/* Телефон */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 1.0 }}
                    className="flex items-center gap-4"
                  >
                    <div className="w-12 h-12 flex-shrink-0">
                      <img 
                        src="/phone.svg" 
                        alt="Phone" 
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <span className="text-lg font-medium text-about" style={{ fontSize: '22px' }}>
                        +7 (977) 142-33-20
                      </span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>

            <div ref={skillsRef} className="mt-24 relative">
              {/* Три блока для навыков */}
              <div className="relative w-full">
                
                <div className="relative ml-auto" style={{ width: '1290px', maxWidth: 'calc(100vw - 20%)' }}>
                  
                  {/* Контейнер для всех трех блоков */}
                  <div className="relative">
                    
                    {/* Нижний блок - цвет #040303, ПОД средним, выглядывает вверх */}
                    <motion.div
                      initial={{ x: 100 }}
                      animate={skillsControls}
                      className="absolute w-[90%] h-20 -top-10 left-1/2 transform -translate-x-1/2"
                      style={{
                        backgroundColor: '#040303',
                        borderTopLeftRadius: '70px',
                        borderTopRightRadius: '0px',
                        borderBottomLeftRadius: '70px',
                        borderBottomRightRadius: '0px',
                        boxShadow: '0 3px 10px rgba(4, 3, 3, 0.3)',
                        zIndex: 1
                      }}
                    />
                    
                    {/* Средний блок - в клетку, ПОД верхним, выглядывает вверх */}
                    <motion.div
                      initial={{ x: 80 }}
                      animate={skillsControls}
                      transition={{ delay: 0.1 }}
                      className="absolute w-[95%] h-20 -top-5 left-1/2 transform -translate-x-1/2"
                      style={{
                        backgroundColor: '#FFD9BD',
                        backgroundImage: `
                          linear-gradient(to right, #1d171dff 1px, transparent 1px),
                          linear-gradient(to bottom, #997F99 1px, transparent 1px)
                        `,
                        backgroundSize: '15px 15px',
                        borderTopLeftRadius: '70px',
                        borderTopRightRadius: '0px',
                        borderBottomLeftRadius: '70px',
                        borderBottomRightRadius: '0px',
                        boxShadow: '0 4px 15px rgba(153, 127, 153, 0.3)',
                        zIndex: 2
                      }}
                    />
                    
                    {/* Верхний блок - большой, с обратным градиентом - САМЫЙ ВЕРХНИЙ */}
                    <motion.div
                      initial={{ x: 60 }}
                      animate={skillsControls}
                      transition={{ delay: 0.2 }}
                      className="relative p-10 rounded-xl"
                      style={{
                        background: 'linear-gradient(90deg, #BE3217 23%, #C23E20 53%, #CC5C37 83%,#D88152 100%)',
                        borderTopLeftRadius: '70px',
                        borderTopRightRadius: '0px',
                        borderBottomLeftRadius: '70px',
                        borderBottomRightRadius: '0px',
                        boxShadow: '0 6px 20px rgba(190, 50, 23, 0.4)',
                        minHeight: '420px',
                        zIndex: 3
                      }}
                    >
                      {/* Контент навыков на блоке */}
                      <div className="h-full">
                        {/* Две колонки скилов */}
                        <div className="flex flex-col md:flex-row gap-10 h-[calc(100%-5rem)]">
                          
                          <div className="md:w-1/2">
                            <div className="mb-8">
                              <h4 className="text-xl font-bold mb-3 text-about" style={{ fontSize: '24px' }}>
                                Образование:
                              </h4>
                              <p className="text-lg text-about" style={{ fontSize: '22px' }}>
                                Техникум им. Л.Б.Красина | 2026
                              </p>
                            </div>

                            {/* Технические скилы */}
                            <div className="mb-8">
                              <h4 className="text-xl font-bold mb-4 text-about" style={{ fontSize: '24px' }}> 
                                Технические скилы:
                              </h4>
                              <div className="flex gap-5">
                                {['/figma.svg','/photoshop.svg', '/illustrator.svg', '/indesign.svg'].map((icon, index) => (
                                  <motion.div
                                    key={index}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ duration: 0.5, delay: 1.5 + index * 0.1 }}
                                    className="w-15 h-15"
                                  >
                                    <img 
                                      src={icon} 
                                      alt="" 
                                      className="w-full h-full object-contain"
                                    />
                                  </motion.div>
                                ))}
                              </div>
                            </div>

                            {/* Интересы */}
                            <div>
                              <h4 className="text-xl font-bold mb-3 text-about" style={{ fontSize: '24px' }}>
                                Интересы:
                              </h4>
                              <p className="text-lg text-about" style={{ fontSize: '22px' }}>
                                Дизайн | Технологии
                              </p>
                            </div>
                          </div>

                          {/* Правая колонка - Soft skills */}
                          <div className="md:w-1/2">
                            <h4 className="text-xl font-bold mb-4 text-about" style={{ fontSize: '24px' }}>
                              Soft skills:
                            </h4>
                            <ul className="space-y-3">
                              {[
                                'коммуникабельность',
                                'креативность', 
                                'критическое мышление',
                                'внимательность',
                                'ответственность'
                              ].map((skill, index) => (
                                <motion.li
                                  key={index}
                                  initial={{ opacity: 0, x: 20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.5, delay: 1.6 + index * 0.1 }}
                                  className="flex items-center"
                                  style={{
                                    fontSize: '22px',
                                    color: '#FFCFB9'
                                  }}
                                >
                                  <span className="mr-3 text-xl">•</span>
                                  {skill}
                                </motion.li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
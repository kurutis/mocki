// components/ContactForm.tsx
"use client";

import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { useState, useEffect, useRef } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    telegram: ""
  });

  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [formAnimationStarted, setFormAnimationStarted] = useState(false);
  
  const formRef = useRef<HTMLDivElement>(null);
  const formControls = useAnimation();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFocus = (fieldName: string) => {
    setFocusedField(fieldName);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Форма отправлена:", formData);
    alert("Спасибо! Я свяжусь с вами в ближайшее время.");
    setFormData({ name: "", phone: "", telegram: "" });
  };

  // Анимация формы при скролле
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !formAnimationStarted) {
            setFormAnimationStarted(true);
            formControls.start({
              opacity: 1,
              scale: 1,
              y: 0,
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

    if (formRef.current) {
      observer.observe(formRef.current);
    }

    return () => {
      if (formRef.current) {
        observer.unobserve(formRef.current);
      }
    };
  }, [formControls, formAnimationStarted]);

  return (
    <div className="min-h-screen bg-[#1D1D1B] py-10 relative overflow-hidden">
      {/* Декоративный градиент вокруг формы */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle at center, rgba(122, 32, 21, 0.08) 0%, transparent 70%)',
          borderRadius: '50%',
          zIndex: 0
        }}
      />

      {/* Анимированные круги при фокусе - ЦЕНТР ЗА ВСЕЙ ФОРМОЙ */}
      <div className="absolute top-0 left-0 w-full h-full" style={{ zIndex: 0 }}>
        <AnimatePresence>
          {focusedField && (
            <>
              <motion.div
                key={`${focusedField}-circle-large`}
                initial={{ opacity: 0, scale: 0.3 }}
                animate={{ opacity: 0.08, scale: 1.5 }}
                exit={{ opacity: 0, scale: 0.3 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                style={{
                  width: '1000px',
                  height: '1000px',
                  background: 'radial-gradient(circle, rgba(122, 32, 21, 0.4) 0%, transparent 70%)',
                  borderRadius: '50%',
                }}
              />
              
              <motion.div
                key={`${focusedField}-circle-medium`}
                initial={{ opacity: 0, scale: 0.4 }}
                animate={{ opacity: 0.12, scale: 1.2 }}
                exit={{ opacity: 0, scale: 0.4 }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                style={{
                  width: '900px',
                  height: '900px',
                  background: 'radial-gradient(circle, rgba(177, 100, 66, 0.3) 0%, transparent 70%)',
                  borderRadius: '50%',
                }}
              />
              
              <motion.div
                key={`${focusedField}-circle-small`}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 0.2, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                style={{
                  width: '800px',
                  height: '800px',
                  background: 'radial-gradient(circle, rgba(105, 27, 15, 0.5) 0%, transparent 70%)',
                  borderRadius: '50%',
                }}
              />
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Контейнер для формы - ПЕРЕД КРУГАМИ */}
      <div className="w-[90%] max-w-4xl mx-auto pt-40 relative z-10">
        
        {/* Центральный блок формы */}
        <motion.div
          ref={formRef}
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          animate={formControls}
          className="relative p-12 mx-auto"
          style={{
            backgroundColor: 'rgba(122, 32, 21, 0.26)',
            borderRadius: '40px',
            maxWidth: '600px',
            boxShadow: '0 20px 50px rgba(122, 32, 21, 0.3)',
            zIndex: 10,
            position: 'relative'
          }}
        >

          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Поле: Имя */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="relative"
            >
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onFocus={() => handleFocus("name")}
                onBlur={handleBlur}
                placeholder="Имя"
                required
                className="w-full px-6 py-4 transition-all duration-300"
                style={{
                  backgroundColor: 'rgba(177, 100, 66, 0.15)',
                  borderRadius: '40px',
                  border: focusedField === "name" ? '2px solid #691B0F' : '2px solid transparent',
                  fontSize: '14pt',
                  color: '#FFCFB9',
                  outline: 'none',
                  fontFamily: 'inherit',
                }}
              />
            </motion.div>

            {/* Поле: Телефон */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="relative"
            >
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                onFocus={() => handleFocus("phone")}
                onBlur={handleBlur}
                placeholder="Телефон"
                required
                className="w-full px-6 py-4 transition-all duration-300"
                style={{
                  backgroundColor: 'rgba(177, 100, 66, 0.15)',
                  borderRadius: '40px',
                  border: focusedField === "phone" ? '2px solid #691B0F' : '2px solid transparent',
                  fontSize: '14pt',
                  color: '#FFCFB9',
                  outline: 'none',
                  fontFamily: 'inherit',
                }}
              />
            </motion.div>

            {/* Поле: Ник в Telegram */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="relative"
            >
              <input
                type="text"
                name="telegram"
                value={formData.telegram}
                onChange={handleChange}
                onFocus={() => handleFocus("telegram")}
                onBlur={handleBlur}
                placeholder="Ник в Telegram"
                required
                className="w-full px-6 py-4 transition-all duration-300"
                style={{
                  backgroundColor: 'rgba(177, 100, 66, 0.15)',
                  borderRadius: '40px',
                  border: focusedField === "telegram" ? '2px solid #691B0F' : '2px solid transparent',
                  fontSize: '14pt',
                  color: '#FFCFB9',
                  outline: 'none',
                  fontFamily: 'inherit',
                }}
              />
            </motion.div>

            {/* Кнопка отправки */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="text-center"
            >
              <motion.button
                type="submit"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 12px 25px rgba(105, 27, 15, 0.6)"
                }}
                whileTap={{ scale: 0.95 }}
                className="relative overflow-hidden group"
                style={{
                  width: '200px',
                  height: '50px',
                  backgroundColor: '#691B0F',
                  color: '#FFCFB9',
                  borderRadius: '40px',
                  border: 'none',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  boxShadow: '0 8px 20px rgba(105, 27, 15, 0.4), 0 4px 6px rgba(0, 0, 0, 0.1)',
                }}
              >
                {/* Анимация на кнопке */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.8 }}
                />
                
                Свяжитесь со мной
                
                {/* Эффект объема */}
                <div 
                  style={{
                    position: 'absolute',
                    top: '2px',
                    left: '2px',
                    right: '2px',
                    bottom: '2px',
                    backgroundColor: 'transparent',
                    border: '2px solid rgba(255, 207, 185, 0.3)',
                    borderRadius: '40px',
                    pointerEvents: 'none'
                  }}
                />
                
                {/* Анимированная стрелка */}
                <motion.svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 20 20" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute -right-8 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
                  animate={{ x: [0, 5, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  <path 
                    d="M10 15L5 10L10 5L11.5 6.5L8.875 9.125H15V10.875H8.875L11.5 13.5L10 15Z" 
                    fill="#FFCFB9"
                  />
                </motion.svg>
              </motion.button>
            </motion.div>

          </form>
          
        </motion.div>

        {/* Подсказка под формой */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.7, y: 0 }}
          transition={{ duration: 0.6, delay: 1.3 }}
          className="text-center mt-8 text-lg"
          style={{ color: '#CCCCCC' }}
        >
          <motion.span
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            ✨
          </motion.span>
          {' '}Заполните форму, и я свяжусь с вами в течение дня{' '}
          <motion.span
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
              delay: 0.5
            }}
          >
            ✨
          </motion.span>
        </motion.p>
      </div>
    </div>
  );
}
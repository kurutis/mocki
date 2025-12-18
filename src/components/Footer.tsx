// components/Footer.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative bg-[#191919] pt-8 pb-12">
      <div className="w-[90%] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          
          {/* Логотип в левом нижнем углу */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 md:mb-0"
          >
            <Link 
              href="#hero"
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
              scroll={true}
            >
              <div className="w-50 h-30">
                <img 
                  src="/logo.svg" 
                  alt="MOCKI Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
            </Link>
          </motion.div>

          {/* Правая часть - две колонки */}
          <div className="flex flex-col md:flex-row gap-12 md:gap-24">
            
            {/* Колонка 1: Ссылки на блоки страницы */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-8 md:mb-0"
            >
              <h4 className="text-xl font-bold mb-4" style={{ 
                color: '#4C3E38',
              }}>
                Навигация
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link 
                    href="#about"
                    className="text-lg hover:text-[#FFCFB9] transition-colors block"
                    style={{ 
                      color: '#4C3E38',
                    }}
                    scroll={true}
                  >
                    Обо мне
                  </Link>
                </li>
                <li>
                  <Link 
                    href="#works"
                    className="text-lg hover:text-[#FFCFB9] transition-colors block"
                    style={{ 
                      color: '#4C3E38',
                    }}
                    scroll={true}
                  >
                    Работы
                  </Link>
                </li>
                <li>
                  <Link 
                    href="#contact"
                    className="text-lg hover:text-[#FFCFB9] transition-colors block"
                    style={{ 
                      color: '#4C3E38',
                    }}
                    scroll={true}
                  >
                    Форма обратной связи
                  </Link>
                </li>
              </ul>
            </motion.div>

            {/* Колонка 2: Повторение контактов */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h4 className="text-xl font-bold mb-4" style={{ 
                color: '#4C3E38',
              }}>
                Контакты
              </h4>
              <div className="space-y-4">
                
                {/* Телефон */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10">
                    <img 
                      src="/phone.svg" 
                      alt="Phone" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="text-lg" style={{ 
                    color: '#4C3E38',
                    fontFamily: 'Constantia, serif',
                    fontSize: '18pt'
                  }}>
                    +7 (977) 142-33-20
                  </span>
                </div>

                {/* Иконки соцсетей */}
                <div className="flex items-center gap-6 mt-4">
                  {/* Telegram */}
                  <a 
                    href="https://t.me/mocki02" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 hover:scale-110 transition-transform"
                  >
                    <img 
                      src="/telegram.svg" 
                      alt="Telegram" 
                      className="w-full h-full object-contain"
                    />
                  </a>
                  
                  {/* VK */}
                  <a 
                    href="https://vk.com/mocki_06" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 hover:scale-110 transition-transform"
                  >
                    <img 
                      src="/vk.svg" 
                      alt="VK" 
                      className="w-full h-full object-contain"
                    />
                  </a>
                  
                  {/* Email */}
                  <a 
                    href="mailto:mail@email.ru"
                    className="w-10 h-10 hover:scale-110 transition-transform"
                  >
                    <img 
                      src="/mail.svg" 
                      alt="Email" 
                      className="w-full h-full object-contain"
                    />
                  </a>
                </div>

              </div>
            </motion.div>

          </div>
        </div>

        {/* Копирайт */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 pt-6 border-t border-[#333333]"
        >
          <p className="text-center text-sm" style={{ color: '#666666' }}>
            © {new Date().getFullYear()} MOCKI. Все права защищены.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
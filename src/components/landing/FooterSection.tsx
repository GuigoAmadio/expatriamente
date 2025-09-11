"use client";
import {
  FaWhatsapp,
  FaEnvelope,
  FaTiktok,
  FaFacebook,
  FaInstagram,
} from "react-icons/fa6";
import { FaYoutube, FaLinkedin } from "react-icons/fa";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function FooterSection() {
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 840);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Renderização inicial sem classes condicionais para evitar hidratação
  if (!mounted) {
    return (
      <footer
        className="relative w-full min-h-[350px] sm:min-h-[400px] md:min-h-[450px] lg:min-h-[500px] xl:min-h-[550px] flex items-start justify-end pr-1 sm:pr-2 md:pr-4 lg:pr-8 xl:pr-20 2xl:pr-40 pb-2 sm:pb-4 md:pb-6 lg:pb-8"
        style={{ background: "none" }}
      >
        <Image
          src="/imagem_footer.png"
          alt="Footer"
          fill
          className="object-cover w-full h-full absolute inset-0 z-0"
          priority
        />
        <motion.div
          className="relative z-10 flex flex-col items-end sm:items-center justify-center gap-2 sm:gap-4 md:gap-6 lg:gap-8 px-1 sm:px-2 md:px-4 py-4 sm:py-6 md:py-8 lg:py-10 xl:py-12 h-full"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          {/* Logo + textos + linha azul */}
          <motion.div
            className="flex flex-col items-center gap-0.5 sm:gap-1 md:gap-2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <Image
                src="/logoFinalReal.svg"
                alt="Expatriamente Logo"
                width={60}
                height={60}
                className="mb-0.5 sm:mb-1 md:mb-2 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28"
              />
            </motion.div>
            <motion.span
              className="font-akzidens text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl text-[#495443] font-bold leading-none tracking-tight text-center px-1"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              viewport={{ once: true }}
            >
              Expatriamente
            </motion.span>
            <motion.span
              className="font-akzidens text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-[#3f390c] font-normal leading-none tracking-tight mb-0.5 sm:mb-1 text-center px-1 sm:px-2 max-w-[200px] md:max-w-full"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
              viewport={{ once: true }}
            >
              Psicanálise para brasileiros no exterior
            </motion.span>
            <motion.div
              className="w-full border-b-2 border-[#3f390c] mt-0.5 sm:mt-1 mb-1 sm:mb-2"
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
              viewport={{ once: true }}
            />
          </motion.div>
          {/* Contatos - versão inicial sem classes condicionais */}
          <motion.div
            className="flex flex-col gap-1 sm:gap-2 md:gap-3 lg:gap-4 w-full max-w-[220px] sm:max-w-[260px] md:max-w-[300px] lg:max-w-[340px] xl:max-w-md bg-white/70 rounded-lg sm:rounded-xl md:rounded-2xl backdrop-blur-md p-2 sm:p-3 md:p-4 lg:p-6 shadow-lg mt-auto"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
          >
            {/* Renderizar itens de contato sem classes condicionais */}
            {[
              {
                icon: FaWhatsapp,
                text: "001 7543087970",
                color: "text-[#25d366] font-bold",
                delay: 1.1,
              },
              {
                icon: FaEnvelope,
                text: "contato@expatriamente.com",
                color: "text-[#7db6f7]",
                delay: 1.0,
              },
              {
                icon: FaTiktok,
                text: "contato@expatriamente.com",
                color: "text-black",
                delay: 1.2,
              },
              {
                icon: FaFacebook,
                text: "contato@expatriamente.com",
                color: "text-black",
                delay: 1.3,
              },
              {
                icon: FaInstagram,
                text: "contato@expatriamente.com",
                color: "text-black",
                delay: 1.4,
              },
              {
                icon: FaYoutube,
                text: "contato@expatriamente.com",
                color: "text-black",
                delay: 1.5,
              },
              {
                icon: FaLinkedin,
                text: "contato@expatriamente.com",
                color: "text-black",
                delay: 1.6,
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-1.5 sm:gap-2 md:gap-3"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.6,
                  ease: "easeOut",
                  delay: item.delay,
                }}
                viewport={{ once: true }}
              >
                <item.icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-[#7db6f7] flex-shrink-0" />
                <span
                  className={`text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-normal break-all leading-tight ${item.color}`}
                >
                  {item.text}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </footer>
    );
  }

  return (
    <div className="relative w-full">
      {/* Footer principal com imagem */}
      <footer
        className={`relative w-full ${
          isLargeScreen
            ? "min-h-[450px] lg:min-h-[500px] xl:min-h-[550px]"
            : "min-h-[400px]"
        } flex items-start pt-10 md:pt-0 justify-end sm:pr-2 md:pr-4 lg:pr-8 xl:pr-20 2xl:pr-40 pb-2 sm:pb-4 md:pb-6 lg:pb-8`}
        style={{ background: "none" }}
      >
        <Image
          src="/imagem_footer.png"
          alt="Footer"
          fill
          className="object-cover w-full h-full absolute inset-0 z-0"
          priority
        />
        <motion.div
          className="relative z-10 flex flex-col items-end sm:items-center justify-center gap-2 sm:gap-4 md:gap-6 lg:gap-8 px-1 sm:px-2 md:px-4 py-4 sm:py-6 md:py-8 lg:py-10 xl:py-12 h-full"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          {/* Logo + textos + linha azul */}
          <motion.div
            className="flex flex-col items-center gap-0.5 sm:gap-1 md:gap-2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <Image
                src="/logoFinalReal.svg"
                alt="Expatriamente Logo"
                width={80}
                height={80}
                className="mb-0.5 sm:mb-1 md:mb-2 w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28"
              />
            </motion.div>
            <motion.span
              className="font-akzidens text-[4.5vw] lg:text-3xl xl:text-4xl 2xl:text-5xl text-[#495443] font-bold leading-none tracking-tight text-center px-1"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              viewport={{ once: true }}
            >
              Expatriamente
            </motion.span>
            <motion.span
              className="font-akzidens text-[3vw] sm:text-sm md:text-base lg:text-lg xl:text-xl text-[#3f390c] font-normal leading-none tracking-tight mb-0.5 sm:mb-1 text-center px-1 sm:px-2 max-w-[200px] md:max-w-full"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
              viewport={{ once: true }}
            >
              Psicanálise para brasileiros no exterior
            </motion.span>
            <motion.div
              className="w-full border-b-2 border-[#3f390c] mt-0.5 sm:mt-1 mb-1 sm:mb-2"
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
              viewport={{ once: true }}
            />
          </motion.div>

          {/* Contatos - apenas para telas grandes (sobreposto à imagem) */}
          {isLargeScreen && (
            <motion.div
              className="flex flex-col gap-1 sm:gap-2 md:gap-3 lg:gap-4 w-full max-w-[220px] sm:max-w-[260px] md:max-w-[300px] lg:max-w-[340px] xl:max-w-md bg-white/70 rounded-lg sm:rounded-xl md:rounded-2xl backdrop-blur-md p-2 sm:p-3 md:p-4 lg:p-6 shadow-lg mt-auto"
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <motion.div
                className="flex items-center gap-1.5 sm:gap-2 md:gap-3"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 1.1 }}
                viewport={{ once: true }}
              >
                <FaWhatsapp className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-[#25d366] flex-shrink-0" />
                <span className="text-[#25d366] text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-bold leading-tight">
                  001 7543087970
                </span>
              </motion.div>
              <motion.div
                className="flex items-center gap-1.5 sm:gap-2 md:gap-3"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 1.0 }}
                viewport={{ once: true }}
              >
                <FaEnvelope className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-[#7db6f7] flex-shrink-0" />
                <span className="text-black text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-normal break-all leading-tight">
                  contato@expatriamente.com
                </span>
              </motion.div>
              <motion.div
                className="flex items-center gap-1.5 sm:gap-2 md:gap-3"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 1.2 }}
                viewport={{ once: true }}
              >
                <FaTiktok className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-black bg-white rounded-full p-0.5 sm:p-1 flex-shrink-0" />
                <span className="text-black text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-normal break-all leading-tight">
                  contato@expatriamente.com
                </span>
              </motion.div>
              <motion.div
                className="flex items-center gap-1.5 sm:gap-2 md:gap-3"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 1.3 }}
                viewport={{ once: true }}
              >
                <FaFacebook className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-[#1877f3] flex-shrink-0" />
                <span className="text-black text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-normal break-all leading-tight">
                  contato@expatriamente.com
                </span>
              </motion.div>
              <motion.div
                className="flex items-center gap-1.5 sm:gap-2 md:gap-3"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 1.4 }}
                viewport={{ once: true }}
              >
                <FaInstagram className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-[#a259c6] flex-shrink-0" />
                <span className="text-black text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-normal break-all leading-tight">
                  contato@expatriamente.com
                </span>
              </motion.div>
              <motion.div
                className="flex items-center gap-1.5 sm:gap-2 md:gap-3"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 1.5 }}
                viewport={{ once: true }}
              >
                <FaYoutube className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-[#ff0000] flex-shrink-0" />
                <span className="text-black text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-normal break-all leading-tight">
                  contato@expatriamente.com
                </span>
              </motion.div>
              <motion.div
                className="flex items-center gap-1.5 sm:gap-2 md:gap-3"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 1.6 }}
                viewport={{ once: true }}
              >
                <FaLinkedin className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-[#0077b5] flex-shrink-0" />
                <span className="text-black text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-normal break-all leading-tight">
                  contato@expatriamente.com
                </span>
              </motion.div>
            </motion.div>
          )}

          {/* Ícones em grid para telas pequenas */}
          {!isLargeScreen && (
            <motion.div
              className="w-full max-w-sm mx-auto mt-6 px-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="grid grid-cols-4 gap-3 sm:gap-4">
                {/* Primeira linha - 4 ícones */}
                <motion.a
                  href="mailto:contato@expatriamente.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 sm:w-14 sm:h-14 bg-white/90 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer mx-auto"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 1.0 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.1, y: -2 }}
                >
                  <FaEnvelope className="w-6 h-6 sm:w-7 sm:h-7 text-[#7db6f7]" />
                </motion.a>

                <motion.a
                  href="https://wa.me/17543087970"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 sm:w-14 sm:h-14 bg-white/90 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer mx-auto"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 1.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.1, y: -2 }}
                >
                  <FaWhatsapp className="w-6 h-6 sm:w-7 sm:h-7 text-[#25d366]" />
                </motion.a>

                <motion.a
                  href="https://www.tiktok.com/@expatriamente?_t=ZP-8zGIfLR6zR1&_r=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 sm:w-14 sm:h-14 bg-white/90 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer mx-auto"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 1.2 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.1, y: -2 }}
                >
                  <FaTiktok className="w-6 h-6 sm:w-7 sm:h-7 text-black" />
                </motion.a>

                <motion.a
                  href="https://www.facebook.com/share/19hLbW2FSZ/?mibextid=wwXIfr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 sm:w-14 sm:h-14 bg-white/90 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer mx-auto"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 1.3 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.1, y: -2 }}
                >
                  <FaFacebook className="w-6 h-6 sm:w-7 sm:h-7 text-[#1877f3]" />
                </motion.a>

                {/* Segunda linha - 3 ícones centralizados */}
                <motion.a
                  href="https://www.instagram.com/expatriamente?igsh=ZmhmZ3F6ZDBwamU5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 sm:w-14 sm:h-14 bg-white/90 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer mx-auto"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 1.4 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.1, y: -2 }}
                >
                  <FaInstagram className="w-6 h-6 sm:w-7 sm:h-7 text-[#a259c6]" />
                </motion.a>

                <motion.a
                  href="https://youtube.com/@cuidadoparaexpatriados?si=9hOESDAaXhVVcstr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 sm:w-14 sm:h-14 bg-white/90 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer mx-auto"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 1.5 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.1, y: -2 }}
                >
                  <FaYoutube className="w-6 h-6 sm:w-7 sm:h-7 text-[#ff0000]" />
                </motion.a>

                <motion.a
                  href="https://www.linkedin.com/posts/t%C3%BAlio-rodrigues-b6196012_psicanaerlise-saaeqdemental-brasileirosnoexterior-activity-7368960252983164931-vj-Z?utm_source=share&utm_medium=member_desktop&rcm=ACoAAAKh-HkBgymURuKUFg9zVl-IPerIRGrB_SU"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 sm:w-14 sm:h-14 bg-white/90 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer mx-auto"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 1.6 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.1, y: -2 }}
                >
                  <FaLinkedin className="w-6 h-6 sm:w-7 sm:h-7 text-[#0077b5]" />
                </motion.a>

                {/* Espaço vazio para manter o grid alinhado */}
                <div></div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </footer>
    </div>
  );
}

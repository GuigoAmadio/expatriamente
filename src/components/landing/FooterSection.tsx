"use client";
import {
  FaWhatsapp,
  FaEnvelope,
  FaTiktok,
  FaFacebook,
  FaInstagram,
} from "react-icons/fa6";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import Image from "next/image";
import { motion } from "framer-motion";

export default function FooterSection() {
  const { t } = useLanguage();
  const { darkMode } = useTheme();

  return (
    <footer
      className="relative w-full min-h-[550px] flex items-center justify-end pr-40"
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
        className="relative z-10 flex flex-col items-center justify-center gap-8 px-4 py-12"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        {/* Logo + textos + linha azul */}
        <motion.div
          className="flex flex-col items-center gap-2"
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
              src="/logoFinal.svg"
              alt="Expatriamente Logo"
              width={110}
              height={110}
              className="mb-2"
            />
          </motion.div>
          <motion.span
            className="font-akzidens text-4xl md:text-5xl text-[#4B2A13] font-bold leading-none tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true }}
          >
            Expatriamente
          </motion.span>
          <motion.span
            className="font-akzidens text-lg md:text-xl text-[#1A6CB4] font-normal leading-none tracking-tight mb-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            viewport={{ once: true }}
          >
            Psicanálise para brasileiros no exterior
          </motion.span>
          <motion.div
            className="w-full border-b-2 border-[#1A6CB4] mt-1 mb-2"
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
            viewport={{ once: true }}
          />
        </motion.div>
        {/* Contatos */}
        <motion.div
          className="flex flex-col gap-4 w-full max-w-md bg-white/70 rounded-2xl backdrop-blur-md p-6 shadow-lg"
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.02 }}
        >
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 1.0 }}
            viewport={{ once: true }}
          >
            <FaEnvelope className="w-7 h-7 text-[#7db6f7]" />
            <span className="text-black text-lg md:text-xl font-normal">
              contato@expatriamente.com
            </span>
          </motion.div>
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 1.1 }}
            viewport={{ once: true }}
          >
            <FaWhatsapp className="w-7 h-7 text-[#25d366]" />
            <span className="text-[#25d366] text-lg md:text-xl font-bold">
              001 7543087970
            </span>
          </motion.div>
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 1.2 }}
            viewport={{ once: true }}
          >
            <FaTiktok className="w-7 h-7 text-black bg-white rounded-full p-1" />
            <span className="text-black text-lg md:text-xl font-normal">
              contato@expatriamente.com
            </span>
          </motion.div>
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 1.3 }}
            viewport={{ once: true }}
          >
            <FaFacebook className="w-7 h-7 text-[#1877f3]" />
            <span className="text-black text-lg md:text-xl font-normal">
              contato@expatriamente.com
            </span>
          </motion.div>
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 1.4 }}
            viewport={{ once: true }}
          >
            <FaInstagram className="w-7 h-7 text-[#a259c6]" />
            <span className="text-black text-lg md:text-xl font-normal">
              contato@expatriamente.com
            </span>
          </motion.div>
        </motion.div>
      </motion.div>
    </footer>
  );
}

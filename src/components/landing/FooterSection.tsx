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
      <div className="relative z-10 flex flex-col items-center justify-center gap-8 px-4 py-12">
        {/* Logo + textos + linha azul */}
        <div className="flex flex-col items-center gap-2">
          <Image
            src="/logoFinal.svg"
            alt="Expatriamente Logo"
            width={110}
            height={110}
            className="mb-2"
          />
          <span className="font-akzidens text-4xl md:text-5xl text-[#4B2A13] font-bold leading-none tracking-tight">
            Expatriamente
          </span>
          <span className="font-akzidens text-lg md:text-xl text-[#1A6CB4] font-normal leading-none tracking-tight mb-1">
            Psicanálise para brasileiros no exterior
          </span>
          <div className="w-full border-b-2 border-[#1A6CB4] mt-1 mb-2" />
        </div>
        {/* Contatos */}
        <div className="flex flex-col gap-4 w-full max-w-md bg-white/70 rounded-2xl backdrop-blur-md p-6 shadow-lg">
          <div className="flex items-center gap-3">
            <FaEnvelope className="w-7 h-7 text-[#7db6f7]" />
            <span className="text-black text-lg md:text-xl font-normal">
              contato@expatriamente.com
            </span>
          </div>
          <div className="flex items-center gap-3">
            <FaWhatsapp className="w-7 h-7 text-[#25d366]" />
            <span className="text-[#25d366] text-lg md:text-xl font-bold">
              001 7543087970
            </span>
          </div>
          <div className="flex items-center gap-3">
            <FaTiktok className="w-7 h-7 text-black bg-white rounded-full p-1" />
            <span className="text-black text-lg md:text-xl font-normal">
              contato@expatriamente.com
            </span>
          </div>
          <div className="flex items-center gap-3">
            <FaFacebook className="w-7 h-7 text-[#1877f3]" />
            <span className="text-black text-lg md:text-xl font-normal">
              contato@expatriamente.com
            </span>
          </div>
          <div className="flex items-center gap-3">
            <FaInstagram className="w-7 h-7 text-[#a259c6]" />
            <span className="text-black text-lg md:text-xl font-normal">
              contato@expatriamente.com
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

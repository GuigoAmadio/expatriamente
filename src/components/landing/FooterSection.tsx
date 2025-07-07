"use client";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaWhatsapp,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

export default function FooterSection() {
  const { t } = useLanguage();
  const { darkMode } = useTheme();

  return (
    <footer className="bg-background-secondary text-primary w-full">
      <div className="px-4 md:px-16 pt-20 pb-4">
        <div className="">
          {/* MOBILE/TABLET: contato + geral juntos acima da newsletter; DESKTOP: grid padrão */}
          <div className="lg:hidden">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Contato */}
              <div className="flex flex-col gap-4 items-center w-full md:w-1/2">
                <div>
                  <h4 className="font-playfair text-2xl font-bold mb-4">
                    {t("Contact", "footer")}
                  </h4>
                </div>
                <ul className="flex flex-col gap-4 items-start">
                  <li className="flex items-start space-x-3">
                    <FaEnvelope className="text-botaoPrimary mt-1 flex-shrink-0" />
                    <div>
                      <span className="text-sm font-semibold text-textStrong">
                        Email:
                      </span>
                      <p className="text-sm text-textEscuro">
                        contato@expatriamente.com
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <FaWhatsapp className="text-botaoPrimary mt-1 flex-shrink-0" />
                    <div>
                      <span className="text-sm font-semibold text-textStrong">
                        WhatsApp:
                      </span>
                      <p className="text-sm text-textEscuro">
                        +55 11 99999-9999
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <FaPhone className="text-botaoPrimary mt-1 flex-shrink-0" />
                    <div>
                      <span className="text-sm font-semibold text-textStrong">
                        Telefone:
                      </span>
                      <p className="text-sm text-textEscuro">
                        +55 11 4002-8922
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <FaMapMarkerAlt className="text-botaoPrimary mt-1 flex-shrink-0" />
                    <div>
                      <span className="text-sm font-semibold text-textStrong">
                        {t("address", "footer") || "Endereço:"}
                      </span>
                      <p className="text-sm text-textEscuro">
                        Av. Paulista, 1000 - São Paulo, SP, Brasil
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              {/* Áreas Gerais */}
              <div className="space-y-6 w-full md:w-1/2">
                <div>
                  <h4 className="text-center font-playfair text-2xl font-bold mb-4 text-textStrong">
                    {t("generalAreas", "footer")}
                  </h4>
                  <div className="w-16 h-1 bg-botaoPrimary rounded-full mb-6"></div>
                </div>
                <div className="flex w-full justify-evenly">
                  {/* Institucional */}
                  <div className="flex items-start justify-start flex-col">
                    <h5 className="text-lg font-semibold text-textStrong mb-3">
                      {t("institutional", "footer")}
                    </h5>
                    <ul className="space-y-2 flex items-start justify-center flex-col">
                      <li>
                        <a
                          href="#"
                          className="text-sm text-textEscuro hover:text-botaoPrimary transition-colors duration-300 flex items-center"
                        >
                          {t("links.about", "footer")}
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="text-sm text-textEscuro hover:text-botaoPrimary transition-colors duration-300 flex items-center"
                        >
                          {t("links.stories", "footer")}
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="text-sm text-textEscuro hover:text-botaoPrimary transition-colors duration-300 flex items-center"
                        >
                          {t("links.blog", "footer")}
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="text-sm text-textEscuro hover:text-botaoPrimary transition-colors duration-300 flex items-center"
                        >
                          {t("links.faq", "footer")}
                        </a>
                      </li>
                    </ul>
                  </div>
                  {/* Suporte */}
                  <div className="flex items-start justify-start flex-col">
                    <h5 className="text-lg font-semibold text-textStrong mb-3">
                      {t("support", "footer")}
                    </h5>
                    <ul className="space-y-2">
                      <li>
                        <a
                          href="#"
                          className="text-sm text-textEscuro hover:text-botaoPrimary transition-colors duration-300 flex items-center"
                        >
                          {t("links.contact", "footer")}
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="text-sm text-textEscuro hover:text-botaoPrimary transition-colors duration-300 flex items-center"
                        >
                          {t("links.help", "footer")}
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="text-sm text-textEscuro hover:text-botaoPrimary transition-colors duration-300 flex items-center"
                        >
                          {t("links.pricing", "footer")}
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="text-sm text-textEscuro hover:text-botaoPrimary transition-colors duration-300 flex items-center"
                        >
                          {t("links.privacy", "footer")}
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            {/* Newsletter */}
            <div className="mt-12">
              <div className="space-y-10">
                <div className="text-center">
                  <h4 className="font-playfair text-3xl font-bold text-textStrong mb-8">
                    {t("newsletter", "footer")}
                  </h4>
                  <p className="text-lg leading-relaxed text-textEscuro">
                    {t("newsletterDescription", "footer")}
                  </p>
                </div>
                <div className="max-w-md mx-auto">
                  <form className="flex flex-col gap-10 items-center">
                    <div className="relative w-full">
                      <input
                        type="email"
                        placeholder={t("emailPlaceholder", "footer")}
                        className="w-full px-3 py-4 rounded-lg border border-oposite focus:outline-none focus:border-botaoPrimary text-base bg-background transition-colors duration-300"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-1/2 bg-botao-primary text-escuro font-semibold rounded-lg px-3 py-3 hover:bg-hover transition-colors duration-300 transform hover:scale-105 text-base"
                    >
                      {t("subscribeButton", "footer")}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          {/* DESKTOP: grid padrão, cada coluna separada */}
          <div className="hidden lg:grid lg:grid-cols-3 gap-12">
            {/* Contato */}
            <div className="flex flex-col gap-4 items-center">
              <div>
                <h4 className="font-playfair text-2xl font-bold mb-4">
                  {t("Contact", "footer")}
                </h4>
              </div>
              <ul className="flex flex-col gap-4 items-start">
                <li className="flex items-start space-x-3">
                  <FaEnvelope className="text-botaoPrimary mt-1 flex-shrink-0" />
                  <div>
                    <span className="text-sm font-semibold text-textStrong">
                      Email:
                    </span>
                    <p className="text-sm text-textEscuro">
                      contato@expatriamente.com
                    </p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <FaWhatsapp className="text-botaoPrimary mt-1 flex-shrink-0" />
                  <div>
                    <span className="text-sm font-semibold text-textStrong">
                      WhatsApp:
                    </span>
                    <p className="text-sm text-textEscuro">+55 11 99999-9999</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <FaPhone className="text-botaoPrimary mt-1 flex-shrink-0" />
                  <div>
                    <span className="text-sm font-semibold text-textStrong">
                      Telefone:
                    </span>
                    <p className="text-sm text-textEscuro">+55 11 4002-8922</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <FaMapMarkerAlt className="text-botaoPrimary mt-1 flex-shrink-0" />
                  <div>
                    <span className="text-sm font-semibold text-textStrong">
                      {t("address", "footer") || "Endereço:"}
                    </span>
                    <p className="text-sm text-textEscuro">
                      Av. Paulista, 1000 - São Paulo, SP, Brasil
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            {/* Newsletter */}
            <div className="space-y-10">
              <div className="text-center">
                <h4 className="font-playfair text-3xl font-bold text-textStrong mb-8">
                  {t("newsletter", "footer")}
                </h4>
                <p className="text-lg leading-relaxed text-textEscuro">
                  {t("newsletterDescription", "footer")}
                </p>
              </div>
              <div className="max-w-md mx-auto">
                <form className="flex flex-col gap-10 items-center">
                  <div className="relative w-full">
                    <input
                      type="email"
                      placeholder={t("emailPlaceholder", "footer")}
                      className="w-full px-3 py-4 rounded-lg border border-oposite focus:outline-none focus:border-botaoPrimary text-base bg-background transition-colors duration-300"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-1/2 bg-botao-primary text-escuro font-semibold rounded-lg px-3 py-3 hover:bg-hover transition-colors duration-300 transform hover:scale-105 text-base"
                  >
                    {t("subscribeButton", "footer")}
                  </button>
                </form>
              </div>
            </div>
            {/* Áreas Gerais */}
            <div className="space-y-6">
              <div>
                <h4 className="text-center font-playfair text-2xl font-bold mb-4 text-textStrong">
                  {t("generalAreas", "footer")}
                </h4>
                <div className="w-16 h-1 bg-botaoPrimary rounded-full mb-6"></div>
              </div>
              <div className="flex w-full justify-evenly">
                {/* Institucional */}
                <div className="flex items-start justify-start flex-col">
                  <h5 className="text-lg font-semibold text-textStrong mb-3">
                    {t("institutional", "footer")}
                  </h5>
                  <ul className="space-y-2 flex items-start justify-center flex-col">
                    <li>
                      <a
                        href="#"
                        className="text-sm text-textEscuro hover:text-botaoPrimary transition-colors duration-300 flex items-center"
                      >
                        {t("links.about", "footer")}
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-sm text-textEscuro hover:text-botaoPrimary transition-colors duration-300 flex items-center"
                      >
                        {t("links.stories", "footer")}
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-sm text-textEscuro hover:text-botaoPrimary transition-colors duration-300 flex items-center"
                      >
                        {t("links.blog", "footer")}
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-sm text-textEscuro hover:text-botaoPrimary transition-colors duration-300 flex items-center"
                      >
                        {t("links.faq", "footer")}
                      </a>
                    </li>
                  </ul>
                </div>
                {/* Suporte */}
                <div className="flex items-start justify-start flex-col">
                  <h5 className="text-lg font-semibold text-textStrong mb-3">
                    {t("support", "footer")}
                  </h5>
                  <ul className="space-y-2">
                    <li>
                      <a
                        href="#"
                        className="text-sm text-textEscuro hover:text-botaoPrimary transition-colors duration-300 flex items-center"
                      >
                        {t("links.contact", "footer")}
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-sm text-textEscuro hover:text-botaoPrimary transition-colors duration-300 flex items-center"
                      >
                        {t("links.help", "footer")}
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-sm text-textEscuro hover:text-botaoPrimary transition-colors duration-300 flex items-center"
                      >
                        {t("links.pricing", "footer")}
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-sm text-textEscuro hover:text-botaoPrimary transition-colors duration-300 flex items-center"
                      >
                        {t("links.privacy", "footer")}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Social Media & Copyright */}
      <div className="py-4 border-t border-black/10">
        <div className="">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 px-20">
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
              <span className="text-xs font-semibold text-textStrong">
                {t("followUs", "footer")}
              </span>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="w-4 h-4 bg-botaoPrimary/10 rounded-full flex items-center justify-center text-botaoPrimary hover:bg-botaoPrimary hover:text-textClaro transition-all duration-300 transform hover:scale-110"
                  aria-label="Facebook"
                >
                  <FaFacebook className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-4 h-4 bg-botaoPrimary/10 rounded-full flex items-center justify-center text-botaoPrimary hover:bg-botaoPrimary hover:text-textClaro transition-all duration-300 transform hover:scale-110"
                  aria-label="Instagram"
                >
                  <FaInstagram className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-4 h-4 bg-botaoPrimary/10 rounded-full flex items-center justify-center text-botaoPrimary hover:bg-botaoPrimary hover:text-textClaro transition-all duration-300 transform hover:scale-110"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-4 h-4 bg-botaoPrimary/10 rounded-full flex items-center justify-center text-botaoPrimary hover:bg-botaoPrimary hover:text-textClaro transition-all duration-300 transform hover:scale-110"
                  aria-label="WhatsApp"
                >
                  <FaWhatsapp className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-4 h-4 bg-botaoPrimary/10 rounded-full flex items-center justify-center text-botaoPrimary hover:bg-botaoPrimary hover:text-textClaro transition-all duration-300 transform hover:scale-110"
                  aria-label="YouTube"
                >
                  <FaYoutube className="w-4 h-4" />
                </a>
              </div>
            </div>
            <div className="text-xs text-center md:text-right text-textEscuro/70">
              <p>© 2024 Expatriamente. {t("allRights", "footer")}</p>
              <p className="mt-1">{t("madeWithLove", "footer")}</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

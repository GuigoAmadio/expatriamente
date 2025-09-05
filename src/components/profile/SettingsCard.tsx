"use client";

import React, { useState } from "react";
import {
  FiSettings,
  FiLock,
  FiBell,
  FiGlobe,
  FiMoon,
  FiSun,
  FiSave,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";

interface SettingsCardProps {
  title: string;
  onSave?: (settings: any) => void;
}

export function SettingsCard({ title, onSave }: SettingsCardProps) {
  const { darkMode, toggleDarkMode } = useTheme();
  const { language, setLanguage } = useLanguage();

  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: false,
      sms: false,
    },
    privacy: {
      profileVisibility: "public",
      showEmail: false,
      showPhone: false,
    },
    security: {
      twoFactor: false,
      sessionTimeout: 30,
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleSave = () => {
    if (onSave) {
      onSave(settings);
    }
  };

  const handlePasswordChange = () => {
    // Implementar lógica de mudança de senha
    console.log("Mudança de senha:", passwordData);
  };

  return (
    <div className="card-elevated p-6">
      <h2 className="text-xl font-semibold text-[#453706] mb-6 flex items-center gap-2">
        <FiSettings className="w-5 h-5" />
        {title}
      </h2>

      <div className="space-y-8">
        {/* Configurações de Aparência */}
        <div>
          <h3 className="text-lg font-semibold text-[#453706] mb-4 flex items-center gap-2">
            {darkMode ? (
              <FiSun className="w-5 h-5" />
            ) : (
              <FiMoon className="w-5 h-5" />
            )}
            Aparência
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-stone-700">
                  Modo Escuro
                </label>
                <p className="text-xs text-stone-500">
                  Alternar entre tema claro e escuro
                </p>
              </div>
              <button
                onClick={toggleDarkMode}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  darkMode ? "bg-blue-600" : "bg-stone-200"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    darkMode ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-stone-700">
                  Idioma
                </label>
                <p className="text-xs text-stone-500">Idioma da interface</p>
              </div>
              <select
                value={language}
                onChange={(e) =>
                  setLanguage(e.target.value as "pt" | "en" | "es")
                }
                className="px-3 py-1 border border-stone-300 rounded-lg text-sm"
              >
                <option value="pt">Português</option>
                <option value="en">English</option>
                <option value="es">Español</option>
              </select>
            </div>
          </div>
        </div>

        {/* Configurações de Notificações */}
        <div>
          <h3 className="text-lg font-semibold text-[#453706] mb-4 flex items-center gap-2">
            <FiBell className="w-5 h-5" />
            Notificações
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-stone-700">
                  Notificações por Email
                </label>
                <p className="text-xs text-stone-500">
                  Receber notificações por email
                </p>
              </div>
              <button
                onClick={() =>
                  setSettings((prev) => ({
                    ...prev,
                    notifications: {
                      ...prev.notifications,
                      email: !prev.notifications.email,
                    },
                  }))
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.notifications.email ? "bg-blue-600" : "bg-stone-200"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.notifications.email
                      ? "translate-x-6"
                      : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-stone-700">
                  Notificações Push
                </label>
                <p className="text-xs text-stone-500">
                  Receber notificações push no navegador
                </p>
              </div>
              <button
                onClick={() =>
                  setSettings((prev) => ({
                    ...prev,
                    notifications: {
                      ...prev.notifications,
                      push: !prev.notifications.push,
                    },
                  }))
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.notifications.push ? "bg-blue-600" : "bg-stone-200"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.notifications.push
                      ? "translate-x-6"
                      : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Configurações de Privacidade */}
        <div>
          <h3 className="text-lg font-semibold text-[#453706] mb-4 flex items-center gap-2">
            <FiGlobe className="w-5 h-5" />
            Privacidade
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Visibilidade do Perfil
              </label>
              <select
                value={settings.privacy.profileVisibility}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    privacy: {
                      ...prev.privacy,
                      profileVisibility: e.target.value,
                    },
                  }))
                }
                className="w-full px-3 py-2 border border-stone-300 rounded-lg text-sm"
              >
                <option value="public">Público</option>
                <option value="private">Privado</option>
                <option value="friends">Apenas Amigos</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-stone-700">
                  Mostrar Email
                </label>
                <p className="text-xs text-stone-500">
                  Permitir que outros vejam seu email
                </p>
              </div>
              <button
                onClick={() =>
                  setSettings((prev) => ({
                    ...prev,
                    privacy: {
                      ...prev.privacy,
                      showEmail: !prev.privacy.showEmail,
                    },
                  }))
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.privacy.showEmail ? "bg-blue-600" : "bg-stone-200"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.privacy.showEmail
                      ? "translate-x-6"
                      : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Configurações de Segurança */}
        <div>
          <h3 className="text-lg font-semibold text-[#453706] mb-4 flex items-center gap-2">
            <FiLock className="w-5 h-5" />
            Segurança
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-stone-700">
                  Autenticação de Dois Fatores
                </label>
                <p className="text-xs text-stone-500">
                  Adicionar uma camada extra de segurança
                </p>
              </div>
              <button
                onClick={() =>
                  setSettings((prev) => ({
                    ...prev,
                    security: {
                      ...prev.security,
                      twoFactor: !prev.security.twoFactor,
                    },
                  }))
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.security.twoFactor ? "bg-blue-600" : "bg-stone-200"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.security.twoFactor
                      ? "translate-x-6"
                      : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Timeout da Sessão (minutos)
              </label>
              <input
                type="number"
                min="5"
                max="120"
                value={settings.security.sessionTimeout}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    security: {
                      ...prev.security,
                      sessionTimeout: parseInt(e.target.value),
                    },
                  }))
                }
                className="w-full px-3 py-2 border border-stone-300 rounded-lg text-sm"
              />
            </div>
          </div>
        </div>

        {/* Mudança de Senha */}
        <div>
          <h3 className="text-lg font-semibold text-[#453706] mb-4 flex items-center gap-2">
            <FiLock className="w-5 h-5" />
            Alterar Senha
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Senha Atual
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={passwordData.currentPassword}
                  onChange={(e) =>
                    setPasswordData((prev) => ({
                      ...prev,
                      currentPassword: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 pr-10 border border-stone-300 rounded-lg text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showPassword ? (
                    <FiEyeOff className="w-4 h-4" />
                  ) : (
                    <FiEye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Nova Senha
              </label>
              <input
                type="password"
                value={passwordData.newPassword}
                onChange={(e) =>
                  setPasswordData((prev) => ({
                    ...prev,
                    newPassword: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 border border-stone-300 rounded-lg text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Confirmar Nova Senha
              </label>
              <input
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) =>
                  setPasswordData((prev) => ({
                    ...prev,
                    confirmPassword: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 border border-stone-300 rounded-lg text-sm"
              />
            </div>

            <button
              onClick={handlePasswordChange}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
            >
              <FiLock className="w-4 h-4" />
              Alterar Senha
            </button>
          </div>
        </div>

        {/* Botão Salvar */}
        <div className="pt-6 border-t border-stone-200">
          <button
            onClick={handleSave}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <FiSave className="w-4 h-4" />
            Salvar Configurações
          </button>
        </div>
      </div>
    </div>
  );
}

import { useEffect } from "react";

declare global {
  interface Window {
    fbq: any;
  }
}

export const useFacebookPixel = () => {
  // Verificar se está em modo de desenvolvimento
  const isDevelopment = process.env.NODE_ENV === "development";
  
  // Função para enviar evento para o Facebook Conversions API
  const sendToConversionsAPI = async (eventName: string, parameters?: any) => {
    if (isDevelopment) {
      console.log(`🚫 [Facebook Pixel] Modo desenvolvimento - Conversions API desabilitado para evento: ${eventName}`);
      return;
    }

    try {
      const token = process.env.FACEBOOK_CONVERSIONS_API_TOKEN;
      if (!token) {
        console.warn("⚠️ [Facebook Conversions API] Token não encontrado");
        return;
      }

      const eventData = {
        data: [
          {
            event_name: eventName,
            event_time: Math.floor(Date.now() / 1000),
            action_source: "website",
            event_source_url: window.location.href,
            user_data: {
              client_ip_address: "127.0.0.1", // Será preenchido pelo Facebook
              client_user_agent: navigator.userAgent,
            },
            custom_data: parameters || {},
          },
        ],
        access_token: token,
      };

      console.log(
        `🔵 [Facebook Conversions API] Enviando evento: ${eventName}`,
        eventData
      );

      const response = await fetch(
        "https://graph.facebook.com/v18.0/620735734130587/events",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(eventData),
        }
      );

      const result = await response.json();

      if (response.ok) {
        console.log(
          `✅ [Facebook Conversions API] Evento ${eventName} enviado com sucesso!`,
          result
        );
      } else {
        console.error(
          `❌ [Facebook Conversions API] Erro ao enviar evento ${eventName}:`,
          result
        );
      }
    } catch (error) {
      console.error(`❌ [Facebook Conversions API] Erro na requisição:`, error);
    }
  };

  const trackEvent = (eventName: string, parameters?: any) => {
    if (isDevelopment) {
      console.log(`🚫 [Facebook Pixel] Modo desenvolvimento - Evento desabilitado: ${eventName}`, parameters);
      return;
    }

    console.log(
      `🔵 [Facebook Pixel] Tentando rastrear evento: ${eventName}`,
      parameters
    );

    if (typeof window !== "undefined" && window.fbq) {
      console.log(
        `✅ [Facebook Pixel] fbq disponível, enviando evento: ${eventName}`
      );
      window.fbq("track", eventName, parameters);
      console.log(
        `🎯 [Facebook Pixel] Evento ${eventName} enviado com sucesso!`
      );

      // Também enviar para o Conversions API
      sendToConversionsAPI(eventName, parameters);
    } else {
      console.warn(
        `⚠️ [Facebook Pixel] fbq não disponível para evento: ${eventName}`
      );
      console.log(`🔍 [Facebook Pixel] window.fbq:`, window?.fbq);

      // Mesmo sem fbq, tentar enviar para o Conversions API
      sendToConversionsAPI(eventName, parameters);
    }
  };

  const trackPageView = () => {
    if (isDevelopment) {
      console.log(`🚫 [Facebook Pixel] Modo desenvolvimento - PageView desabilitado`);
      return;
    }

    console.log(`🔵 [Facebook Pixel] Tentando rastrear PageView`);
    if (typeof window !== "undefined" && window.fbq) {
      console.log(`✅ [Facebook Pixel] Enviando PageView`);
      window.fbq("track", "PageView");
      console.log(`🎯 [Facebook Pixel] PageView enviado com sucesso!`);

      // Também enviar para o Conversions API
      sendToConversionsAPI("PageView");
    } else {
      console.warn(`⚠️ [Facebook Pixel] fbq não disponível para PageView`);

      // Mesmo sem fbq, tentar enviar para o Conversions API
      sendToConversionsAPI("PageView");
    }
  };

  const trackSchedule = (parameters?: any) => {
    if (isDevelopment) {
      console.log(`🚫 [Facebook Pixel] Modo desenvolvimento - Schedule desabilitado:`, parameters);
      return;
    }
    console.log(`📅 [Facebook Pixel] Rastreando Schedule:`, parameters);
    trackEvent("Schedule", parameters);
  };

  const trackCompleteRegistration = (parameters?: any) => {
    if (isDevelopment) {
      console.log(`🚫 [Facebook Pixel] Modo desenvolvimento - CompleteRegistration desabilitado:`, parameters);
      return;
    }
    console.log(
      `✅ [Facebook Pixel] Rastreando CompleteRegistration:`,
      parameters
    );
    trackEvent("CompleteRegistration", parameters);
  };

  const trackViewContent = (parameters?: any) => {
    if (isDevelopment) {
      console.log(`🚫 [Facebook Pixel] Modo desenvolvimento - ViewContent desabilitado:`, parameters);
      return;
    }
    console.log(`👁️ [Facebook Pixel] Rastreando ViewContent:`, parameters);
    trackEvent("ViewContent", parameters);
  };

  const trackLead = (parameters?: any) => {
    if (isDevelopment) {
      console.log(`🚫 [Facebook Pixel] Modo desenvolvimento - Lead desabilitado:`, parameters);
      return;
    }
    console.log(`🎯 [Facebook Pixel] Rastreando Lead:`, parameters);
    trackEvent("Lead", parameters);
  };

  const trackPurchase = (parameters?: any) => {
    if (isDevelopment) {
      console.log(`🚫 [Facebook Pixel] Modo desenvolvimento - Purchase desabilitado:`, parameters);
      return;
    }
    console.log(`💰 [Facebook Pixel] Rastreando Purchase:`, parameters);
    trackEvent("Purchase", parameters);
  };

  const trackAddToCart = (parameters?: any) => {
    if (isDevelopment) {
      console.log(`🚫 [Facebook Pixel] Modo desenvolvimento - AddToCart desabilitado:`, parameters);
      return;
    }
    console.log(`🛒 [Facebook Pixel] Rastreando AddToCart:`, parameters);
    trackEvent("AddToCart", parameters);
  };

  const trackInitiateCheckout = (parameters?: any) => {
    if (isDevelopment) {
      console.log(`🚫 [Facebook Pixel] Modo desenvolvimento - InitiateCheckout desabilitado:`, parameters);
      return;
    }
    console.log(`💳 [Facebook Pixel] Rastreando InitiateCheckout:`, parameters);
    trackEvent("InitiateCheckout", parameters);
  };

  // Verificar se o Facebook Pixel está carregado (apenas em produção)
  useEffect(() => {
    if (isDevelopment) {
      console.log(`🚫 [Facebook Pixel] Modo desenvolvimento - Verificação de carregamento desabilitada`);
      return;
    }

    const checkFacebookPixel = () => {
      if (typeof window !== "undefined") {
        if (window.fbq) {
          console.log(`✅ [Facebook Pixel] fbq carregado com sucesso!`);
          console.log(`🔍 [Facebook Pixel] fbq object:`, window.fbq);
        } else {
          console.warn(`⚠️ [Facebook Pixel] fbq ainda não carregado`);
        }
      }
    };

    // Verificar imediatamente
    checkFacebookPixel();

    // Verificar novamente após 2 segundos
    const timer = setTimeout(checkFacebookPixel, 2000);

    return () => clearTimeout(timer);
  }, [isDevelopment]);

  return {
    trackEvent,
    trackPageView,
    trackSchedule,
    trackCompleteRegistration,
    trackViewContent,
    trackLead,
    trackPurchase,
    trackAddToCart,
    trackInitiateCheckout,
    sendToConversionsAPI,
  };
};

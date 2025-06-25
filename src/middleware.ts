import { auth } from "@/auth";

export default auth(() => {
  // A função auth automaticamente protege as rotas configuradas
  // Você pode adicionar lógica customizada aqui se necessário
});

export const config = {
  matcher: ["/dashboard/:path*"],
};

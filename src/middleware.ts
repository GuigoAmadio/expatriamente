import { auth } from "@/auth";

export default auth((_req) => {
  // O middleware será executado para as rotas especificadas no config
  // Se não há sessão e está tentando acessar rota protegida, redirecionará automaticamente
});

export const config = {
  matcher: ["/dashboard/:path*"],
};

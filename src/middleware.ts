import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { nextUrl } = req;
  const authToken = req.cookies.get("auth_token")?.value;

  // Permitir acesso a assets estáticos e API routes
  if (
    nextUrl.pathname.startsWith("/_next") ||
    nextUrl.pathname.startsWith("/api/") ||
    nextUrl.pathname.includes(".") // arquivos estáticos
  ) {
    return NextResponse.next();
  }

  // Páginas públicas que não precisam de autenticação
  const publicPaths = ["/", "/auth/signin", "/auth/signup"];
  const isPublicPath = publicPaths.includes(nextUrl.pathname);

  // Se está tentando acessar uma página protegida (dashboard)
  if (nextUrl.pathname.startsWith("/dashboard")) {
    // Se não está logado, redirecionar para login
    if (!authToken) {
      return NextResponse.redirect(new URL("/auth/signin", nextUrl));
    }
    // Se está logado, permitir acesso
    return NextResponse.next();
  }

  // Permitir acesso a páginas públicas
  if (isPublicPath) {
    return NextResponse.next();
  }

  // Para outras rotas, permitir acesso
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

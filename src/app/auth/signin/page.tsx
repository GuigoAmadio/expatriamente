"use client";

import { useFormState } from "react-dom";
import { signInWithProvider, signInWithCredentials } from "@/actions/auth";
import { Button } from "@/components/ui";
import { Input } from "@/components/ui";

const initialState = {
  message: "",
};

export default function SignInPage() {
  const [state, formAction] = useFormState(signInWithCredentials, initialState);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
          Login
        </h1>

        {/* Login com Google */}
        <form
          action={async () => {
            await signInWithProvider("google");
          }}
          className="mb-4"
        >
          <Button type="submit" variant="outline" className="w-full">
            Entrar com Google
          </Button>
        </form>

        <div className="my-6 flex items-center">
          <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
          <span className="px-4 text-sm text-gray-500">ou</span>
          <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
        </div>

        {/* Login com Credenciais */}
        <form action={formAction} className="space-y-4">
          <Input
            name="email"
            type="email"
            placeholder="admin@expatriamente.com"
            required
          />
          <Input
            name="password"
            type="password"
            placeholder="password123"
            required
          />
          {state?.message && (
            <p className="text-sm text-red-500">{state.message}</p>
          )}
          <Button type="submit" className="w-full">
            Entrar com Email e Senha
          </Button>
        </form>
      </div>
    </div>
  );
}

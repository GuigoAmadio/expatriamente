"use server";

import { compare, hash } from "bcryptjs";
import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { signIn } from "@/auth";

// Schemas de validação
const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

const registerSchema = z
  .object({
    email: z.string().email("Email inválido"),
    password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
    name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Senhas não coincidem",
    path: ["confirmPassword"],
  });

const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Senha atual é obrigatória"),
    newPassword: z
      .string()
      .min(6, "Nova senha deve ter pelo menos 6 caracteres"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Senhas não coincidem",
    path: ["confirmPassword"],
  });

// Simulação de banco de dados - substitua pela sua implementação real
const users = [
  {
    id: "1",
    email: "admin@expatriamente.com",
    password: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewgHDOGiHGzOLlly", // password123
    name: "Administrador",
    role: "admin",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    email: "user@expatriamente.com",
    password: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewgHDOGiHGzOLlly", // password123
    name: "Usuário Teste",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export async function authenticateUser(formData: FormData) {
  try {
    const rawFormData = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    // Validar dados
    const validatedData = loginSchema.parse(rawFormData);

    // Buscar usuário
    const user = users.find((u) => u.email === validatedData.email);

    if (!user) {
      return {
        success: false,
        error: "Usuário não encontrado",
      };
    }

    // Verificar senha
    const isPasswordValid = await compare(
      validatedData.password,
      user.password
    );

    if (!isPasswordValid) {
      return {
        success: false,
        error: "Senha inválida",
      };
    }

    // Retornar dados do usuário (sem senha)
    const { password, ...userWithoutPassword } = user;

    return {
      success: true,
      user: userWithoutPassword,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.errors[0].message,
      };
    }

    return {
      success: false,
      error: "Erro interno do servidor",
    };
  }
}

export async function registerUser(formData: FormData) {
  try {
    const rawFormData = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      name: formData.get("name") as string,
      confirmPassword: formData.get("confirmPassword") as string,
    };

    // Validar dados
    const validatedData = registerSchema.parse(rawFormData);

    // Verificar se usuário já existe
    const existingUser = users.find((u) => u.email === validatedData.email);

    if (existingUser) {
      return {
        success: false,
        error: "Email já está em uso",
      };
    }

    // Hash da senha
    const hashedPassword = await hash(validatedData.password, 12);

    // Criar novo usuário
    const newUser = {
      id: (users.length + 1).toString(),
      email: validatedData.email,
      password: hashedPassword,
      name: validatedData.name,
      role: "user" as const,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    users.push(newUser);

    // Retornar dados do usuário (sem senha)
    const { password, ...userWithoutPassword } = newUser;

    return {
      success: true,
      user: userWithoutPassword,
      message: "Usuário criado com sucesso!",
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.errors[0].message,
      };
    }

    return {
      success: false,
      error: "Erro interno do servidor",
    };
  }
}

export async function updateUserProfile(userId: string, formData: FormData) {
  try {
    const rawFormData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
    };

    // Validação básica
    if (!rawFormData.name || rawFormData.name.length < 2) {
      return {
        success: false,
        error: "Nome deve ter pelo menos 2 caracteres",
      };
    }

    if (!rawFormData.email || !rawFormData.email.includes("@")) {
      return {
        success: false,
        error: "Email inválido",
      };
    }

    // Buscar usuário
    const userIndex = users.findIndex((u) => u.id === userId);

    if (userIndex === -1) {
      return {
        success: false,
        error: "Usuário não encontrado",
      };
    }

    // Verificar se novo email já está em uso (se foi alterado)
    if (rawFormData.email !== users[userIndex].email) {
      const emailExists = users.some(
        (u) => u.email === rawFormData.email && u.id !== userId
      );
      if (emailExists) {
        return {
          success: false,
          error: "Email já está em uso",
        };
      }
    }

    // Atualizar usuário
    users[userIndex] = {
      ...users[userIndex],
      name: rawFormData.name,
      email: rawFormData.email,
      updatedAt: new Date(),
    };

    // Retornar dados atualizados (sem senha)
    const { password, ...userWithoutPassword } = users[userIndex];

    revalidatePath("/dashboard");

    return {
      success: true,
      user: userWithoutPassword,
      message: "Perfil atualizado com sucesso!",
    };
  } catch (error) {
    return {
      success: false,
      error: "Erro interno do servidor",
    };
  }
}

export async function changeUserPassword(userId: string, formData: FormData) {
  try {
    const rawFormData = {
      currentPassword: formData.get("currentPassword") as string,
      newPassword: formData.get("newPassword") as string,
      confirmPassword: formData.get("confirmPassword") as string,
    };

    // Validar dados
    const validatedData = changePasswordSchema.parse(rawFormData);

    // Buscar usuário
    const userIndex = users.findIndex((u) => u.id === userId);

    if (userIndex === -1) {
      return {
        success: false,
        error: "Usuário não encontrado",
      };
    }

    // Verificar senha atual
    const isCurrentPasswordValid = await compare(
      validatedData.currentPassword,
      users[userIndex].password
    );

    if (!isCurrentPasswordValid) {
      return {
        success: false,
        error: "Senha atual incorreta",
      };
    }

    // Hash da nova senha
    const hashedNewPassword = await hash(validatedData.newPassword, 12);

    // Atualizar senha
    users[userIndex] = {
      ...users[userIndex],
      password: hashedNewPassword,
      updatedAt: new Date(),
    };

    return {
      success: true,
      message: "Senha alterada com sucesso!",
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.errors[0].message,
      };
    }

    return {
      success: false,
      error: "Erro interno do servidor",
    };
  }
}

export async function logoutUser() {
  try {
    // O logout é gerenciado pelo NextAuth
    // Aqui você pode adicionar lógica adicional como logs

    // Redirecionar para página inicial
    redirect("/");
  } catch (error) {
    return {
      success: false,
      error: "Erro ao fazer logout",
    };
  }
}

export async function getUserByEmail(email: string) {
  try {
    const user = users.find((u) => u.email === email);

    if (!user) {
      return {
        success: false,
        error: "Usuário não encontrado",
      };
    }

    // Retornar dados do usuário (sem senha)
    const { password, ...userWithoutPassword } = user;

    return {
      success: true,
      user: userWithoutPassword,
    };
  } catch (error) {
    return {
      success: false,
      error: "Erro interno do servidor",
    };
  }
}

export async function getUserById(id: string) {
  try {
    const user = users.find((u) => u.id === id);

    if (!user) {
      return {
        success: false,
        error: "Usuário não encontrado",
      };
    }

    // Retornar dados do usuário (sem senha)
    const { password, ...userWithoutPassword } = user;

    return {
      success: true,
      user: userWithoutPassword,
    };
  } catch (error) {
    return {
      success: false,
      error: "Erro interno do servidor",
    };
  }
}

export async function signInWithProvider(provider: string) {
  await signIn(provider, { redirectTo: "/dashboard" });
}

export async function signInWithCredentials(
  prevState: { message: string } | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      redirectTo: "/dashboard",
    });
  } catch (error: any) {
    if (error.type === "CredentialsSignin") {
      return { message: "Email ou senha inválidos." };
    }
    return { message: "Ocorreu um erro. Tente novamente." };
  }
}

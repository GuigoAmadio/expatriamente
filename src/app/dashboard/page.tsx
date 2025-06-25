import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui";
import { redirect } from "next/navigation";

async function LogoutButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/" });
      }}
    >
      <Button type="submit" variant="outline">
        Sair
      </Button>
    </form>
  );
}

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/auth/signin");
  }

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          Dashboard
        </h1>

        <div className="mb-4">
          <p className="text-gray-600 dark:text-gray-300">
            Bem-vindo, {session.user?.name || session.user?.email}!
          </p>
          {session.user?.role && (
            <p className="text-sm text-gray-500">Cargo: {session.user.role}</p>
          )}
        </div>

        <div className="flex gap-4">
          <LogoutButton />
          <Button variant="outline">Editar Perfil</Button>
        </div>
      </div>
    </div>
  );
}

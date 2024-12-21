import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export type AuthSession = {
  user: {
    id: string;
    email: string;
    name: string;
    role: "admin" | "user";
  };
};

export async function getAuthSession() {
  const session = await getServerSession();
  return session as unknown as AuthSession;
}

export async function requireAuth() {
  const session = await getAuthSession();
  if (!session) {
    redirect("/auth/signin");
  }
  return session;
}

export async function requireAdmin() {
  const session = await getAuthSession();
  if (!session || session.user.role !== "admin") {
    redirect("/dashboard");
  }
  return session;
}

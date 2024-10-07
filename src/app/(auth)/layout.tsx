import {redirect} from "next/navigation";
import { auth } from "@/auth";

interface AuthRoutesLayoutProps {
  children: Readonly<React.ReactNode>,
}

export default async function ProtectedRoutesLayout({children}: AuthRoutesLayoutProps) {
  const session = await auth();

  if (session) {
    return redirect("/");
  }

  return <>{children}</>
}

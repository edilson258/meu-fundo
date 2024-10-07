import {redirect} from "next/navigation";
import {auth} from "@/auth";

interface ProtectedRoutesLayoutProps {
  children: Readonly<React.ReactNode>,
}

export default async function ProtectedRoutesLayout({children}: ProtectedRoutesLayoutProps) {
  const session = await auth();

  if (!session) {
    return redirect("/login");
  }

  return <>{children}</>
}

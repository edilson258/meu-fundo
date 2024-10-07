"use client"

import {Button} from "@/components/ui/button"
import {Logout05Icon, RefreshIcon} from "hugeicons-react"
import {signOut, useSession, getSession} from "next-auth/react"

export default function AccountStatus() {
  const session = useSession();

  async function handleSignOut() {
    signOut();
  }

  async function refresh() {
    session.data = await getSession();
  }

  return (
    <div className="shadow rounded p-4 mt-12">
      <span className="text-xl font-bold text-zinc-800">
        Minha conta (+258 {session.data?.user?.phone})
      </span>

      <div className="mt-4 font-bold text-md">
        <div className="flex items-center justify-between">
          <span>Sector investido</span>
          <span className="text-sky-500 underline underline-offset-4">{session.data?.user?.sectorName ?? "[VAZIO]"}</span>
        </div>

        <div className="mt-2 flex items-center justify-between">
          <span>Saldo disponível</span>
          <span className="text-sky-500 underline underline-offset-4">{session.data?.user?.balance}.00 MZN</span>
        </div>

        <div className="mt-2 flex items-center justify-between">
          <span>Ganhos totais</span>
          <span className="text-sky-500 underline underline-offset-4">{session.data?.user?.totalWin}.00 MZN</span>
        </div>

        <div className="flex gap-4 mt-4">
          <Button onClick={refresh} className="w-full flex-auto bg-green-500 text-white flex items-center gap-4 hover:bg-green-700">
            <RefreshIcon size={18} />
            <span>Actualizar</span>
          </Button>

          <Button
            onClick={handleSignOut}
            className="bg-red-500 text-white hover:bg-red-700"
          >
            <Logout05Icon size={18} />
          </Button>
        </div>
      </div>
    </div>
  )
}

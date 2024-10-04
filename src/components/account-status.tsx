import {Button} from "@/components/ui/button"
import { Logout05Icon, RefreshIcon} from "hugeicons-react"
import type {TUser} from "@/lib/types"

export default function AccountStatus({user}: {user: TUser | null}) {
  return (
    <div className="shadow rounded p-4 mt-12">
      <span className="text-xl font-bold text-zinc-800">
        Minha conta (+258 {user?.phone})
      </span>

      <div className="mt-4 font-bold text-md">
        <div className="flex items-center justify-between">
          <span>Sector investido</span>
          <span className="text-sky-500 underline underline-offset-4">{user?.sectorName}</span>
        </div>

        <div className="mt-2 flex items-center justify-between">
          <span>Saldo disponível</span>
          <span className="text-sky-500 underline underline-offset-4">{user?.balance}.00 MZN</span>
        </div>

        <div className="mt-2 flex items-center justify-between">
          <span>Ganhos totais</span>
          <span className="text-sky-500 underline underline-offset-4">{user?.totalWin}.00 MZN</span>
        </div>

        <div className="flex gap-4 mt-4">
          <Button className="w-full flex-auto bg-green-500 text-white flex items-center gap-4 hover:bg-green-700">
            <RefreshIcon size={18} />
            <span>Actualizar</span>
          </Button>

          <Button
            className="bg-red-500 text-white hover:bg-red-700"
          >
            <Logout05Icon size={18} />
          </Button>
        </div>
      </div>
    </div>
  )
}

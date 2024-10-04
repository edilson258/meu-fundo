import {Button} from "@/components/ui/button"
import {Clock2Icon} from "lucide-react"
import {AddTeamIcon,SaveMoneyDollarIcon, WalletAdd02Icon} from "hugeicons-react"
import Link from "next/link";

export default function UserActions() {
  return (
    <div className="mt-12 grid grid-rows-2 grid-flow-col gap-4 w-full">
      <UserAction to="/deposit/mineiro" icon={<WalletAdd02Icon />} title="Depositar" />
      <UserAction to="/invite" icon={<AddTeamIcon />} title="Convidar amigo" />
      <UserAction to="/withdraw" icon={<SaveMoneyDollarIcon />} title="Levantar" />
      <UserAction to="/history" icon={<Clock2Icon />} title="Histórico de transações" />
    </div>
  )
}

function UserAction({to, icon, title}:
  {
    title: string,
    icon: React.ReactNode,
    to: string,
  }
) {
  return (
    <Link href={to}>
      <Button className="flex flex-col gap-4 items-center text-zinc-700 bg-white h-full w-full hover:bg-zinc-200">
        {icon}
        <span>
          {title}
        </span>
      </Button>
    </Link>
  )
}

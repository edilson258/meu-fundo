import Link from "next/link";

import Container from "@/components/container";
import {Button} from "@/components/ui/button";
import {SaveMoneyDollarIcon, WalletAdd02Icon} from "hugeicons-react"

export default function AdminPage() {
  return (
    <main className="min-screen-h pb-32 pt-16">
      <h1 className="text-2xl font-bold text-center">Painel de administração - <span className="text-sky-500">Meu fundo</span></h1> 

      <Container>
        <div className="mt-16 flex flex-col gap-4">
          <Link href="/admin/pending-withdraws">
            <Button className="py-8 flex gap-4 items-center text-zinc-700 bg-white h-full w-full hover:bg-zinc-200">
              <SaveMoneyDollarIcon size={32} />
              <span className="font-bold text-xl">
                Levantamentos pendentes
              </span>
            </Button>
          </Link>
              
          <Link  href="/admin/pending-withdraws">
            <Button className="py-8 flex gap-4 items-center text-zinc-700 bg-white h-full w-full hover:bg-zinc-200">
              <WalletAdd02Icon size={32} />
              <span className="font-bold text-xl">
                Depósitos pendentes
              </span>
            </Button>
          </Link>
        </div>
      </Container>
    </main>
  )
}

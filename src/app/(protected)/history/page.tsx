import {auth} from "@/auth";
import {ArrowLeft02Icon} from "hugeicons-react";
import Link from "next/link";
import moment from "moment";
import "moment/locale/pt-br";

import Container from "@/components/container";
import {THistoryItem} from "@/types";
import {buildUserHistory} from "@/db";

export default async function History() {
  const session = await auth();
  const history = await buildUserHistory(session?.user?.id ?? "");

  return (
    <main className="min-h-screen pb-32">
      <div className="shadow">
        <Link href="/">
          <button className="p-4 flex gap-2">
            <ArrowLeft02Icon />
            Voltar
          </button>
        </Link>
      </div>

      <Container>
        <h1 className="text-foreground text-2xl font-bold mt-16">Histórico de transações</h1>

        <div className="mt-8 space-y-4">
          {
            history.length <= 0
              ? (<NoTransation />)
              : history.map(i => (<HistoryItemComponent key={i.date.getTime()} item={i} />))
          }
        </div>
      </Container>
    </main>
  )
}

function HistoryItemComponent({item}: {item: THistoryItem}) {
  moment.locale("pt-br");

  const bgColor = item.status === "PENDING"
    ? "bg-sky-100" 
    : item.status === "REJECTED" 
    ? "bg-red-100" : "bg-green-100";

  return (
    <div className={`${bgColor} shadow rounded p-4`}>
      <div className="flex justify-between items-center">
        <p className="font-bold text-xl">{item.type === "WITHDRAW" ? "Levantamento" : item.type === "DEPOSIT" ? "Depósito" : "Bônus"}</p>
        <p className="text-xs">{moment(item.date).fromNow()}</p>
      </div>

      <div className="mt-4 flex justify-between text-lg">
        <p>Estado</p>
        <div className="font-bold">
          {
            item.status === "PENDING"
              ? (<p className="text-sky-500">Pendente</p>)
              : item.status === "APPROVED"
                ? (<p className="text-green-500">Aprovado</p>)
                : (<p className="text-red-500">Rejeitado</p>)
          }
        </div>
      </div>

      <div className="mt-2 flex justify-between text-lg">
        <p>Valor</p>
        <p className="font-bold text-lg">{item.amount}.00 MZN</p>
      </div>
    </div>
  )
}

function NoTransation() {
  return (
    <p className="text-center">Nenhúma transação registada.</p>
  )
}

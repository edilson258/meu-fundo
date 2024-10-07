import Link from "next/link";

import Container from "@/components/container";
import {ArrowLeft02Icon} from "hugeicons-react"
import prisma from "@/db";
import WithdrawComponent from "./withdraw-component";

export default async function PendingWithdrawsPage() {
  const withdraws = await prisma.withdraw.findMany({where: {status: "PENDING"}, include: {Account: {include: {user: true}}}});

  const withdrawsNormalized = withdraws.map(function (withdraw) {
    return {
      id: withdraw.id,
      amount: withdraw.amount,
      phone: withdraw?.Account?.user.phone ?? "",
      date: withdraw.createdAt,
    }
  });

  withdrawsNormalized.sort(function (a, b) {
    return a.date.getTime() - b.date.getTime();
  });

  return (
    <main className="min-screen-h pb-32 text-lg">
      <div className="shadow">
        <Link href="/admin">
          <button className="p-4 flex gap-2">
            <ArrowLeft02Icon />
            Voltar
          </button>
        </Link>
      </div>

      <Container>
        <h1 className="mt-12 font-bold text-2xl">Levantamentos pendentes</h1>
        <div className="mt-8 space-y-4">
          {withdrawsNormalized.map(w => (<WithdrawComponent key={w.date.getTime()} withdraw={w} />))}
        </div>
      </Container>
    </main>
  )
}

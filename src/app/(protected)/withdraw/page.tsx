"use client"

import * as React from "react"
import {ArrowLeft02Icon} from "hugeicons-react"
import Container from "@/components/container"
import Link from "next/link"
import WithdrawForm from "./withdaw-form"
import {useSession} from "next-auth/react"

export default function DepositPage() {
  const session = useSession();

  return (
    <main className="min-h-screen pb-8">
      <div className="shadow">
        <Container>
          <Link href="/">
            <button className="py-4 flex gap-2">
              <ArrowLeft02Icon />
              Voltar
            </button>
          </Link>
        </Container>
      </div>

      <Container>
        <h1 className="mt-16 text-2xl font-bold text-foreground">Levantamento</h1>

        <div className="mt-8 shadow p-4 rounded">
          <div className="flex items-center justify-between font-bold">
            <span>Saldo disponível</span>
            <span className="text-sky-500 underline underline-offset-4">{session.data?.user?.balance}.00 MZN</span>
          </div>
        </div>

        <div className="mt-8 p-4 border-l-4 border-l-sky-500 rounded bg-sky-100">
          <p>O valor será depositado no número</p>
          <p className="mt-2 font-bold text-2xl">+258 {session.data?.user?.phone}</p>
        </div>

        <div>
          <WithdrawForm />
        </div>
      </Container>
    </main >
  )
}

"use client"

import * as React from "react"
import {ArrowLeft02Icon, DeliveryBox02Icon} from "hugeicons-react";
import {ClipboardCopy, Share2Icon} from "lucide-react";
import {Button} from "@/components/ui/button";
import Link from "next/link"
import {useSession} from "next-auth/react";

export default function InvitePage() {
  const session = useSession();

  const inviteLink = `https://meufundo.vercel.app/signup/?inviter=${session.data?.user?.code}`

  function handleShareLink() {
    navigator.share({
      url: inviteLink,
    });
  }

  async function handleCopyLink() {
    await navigator.clipboard.writeText(inviteLink);
  }

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

      <section className="p-4">
        <div className="mt-8">
          <div className="p-4 rounded border-l-4 border-sky-500 bg-sky-100">
            <p className="font-bold text-xl">Convide e ganhe bónus</p>
            <p className="mt-4">Você será bonificado por cada membro activo que convidar.</p>
          </div>
        </div>

        <div className="shadow p-4 rounded mt-8">
          <p className="font-bold text-xl">
            Informações de convite
          </p>
          <p className="mt-4">Meu link</p>
          <div className="border p-2 rounded mt-2 text-md">
            <p className="overflow-x-auto whitespace-nowrap" >{inviteLink}</p>
          </div>
          <div className="flex items-center gap-4 mt-4">
            <Button onClick={handleShareLink} className="flex-auto flex items-center gap-2">
              <Share2Icon size={18} />
              Compartilhar
            </Button>

            <Button onClick={handleCopyLink} className="flex-auto flex items-center gap-2">
              <ClipboardCopy size={18} />
              Copiar
            </Button>
          </div>
        </div>

        <ClientNetWork />
      </section>
    </main>
  )
}

function ClientNetWork() {
  return (
    <div className="mt-12 border rounded p-4 pb-8">
      <h3 className="text-xl font-bold">Minha rede</h3>
      <div className="flex flex-col items-center gap-4 mt-8">
        <DeliveryBox02Icon size={32} />
        <p>Nenhum membro activo</p>
      </div>
    </div>
  )
}

"use client"

import * as React from "react";
import moment from "moment";
import "moment/locale/pt-br";
import {Button} from "@/components/ui/button";
import {TWithdraw} from "@/types";
import {useSession} from "next-auth/react";

export default function WithdrawComponent({withdraw}: {withdraw: TWithdraw}) {
  moment.locale("pt-br");
  const session = useSession();

  const [isLoading, setIsLoading] = React.useState(false);

  async function handleToggleStatus(status: "APPROVED" | "REJECTED" | "PENDING") {
    setIsLoading(() => true);

    const response = await fetch("/api/admin/withdraw/status", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        status: status,
        withdrawId: withdraw.id,
        adminId: session.data?.user?.id,
      }),
    });

    setIsLoading(() => false);

    if (response.status !== 200) {
      alert((await response.json()).message)
    }
  }

  return (
    <div className="shadow p-4 rounded">
      <div className="flex items-center justify-between">
        <p className="font-bold text-xl">{withdraw.phone}</p>
        <p className="text-xs">{moment(withdraw.date).fromNow()}</p>
      </div>

      <div className="mt-4">
        <p className="text-center text-2xl font-bold text-sky-500">{withdraw.amount}.00 MZN</p>
      </div>

      <div className="mt-4 flex flex-col gap-2">
        <Button disabled={isLoading} onClick={async () => await handleToggleStatus("APPROVED")} className="w-full bg-green-500 fg-white hover:bg-green-700">Aprovar</Button>
        <Button disabled={isLoading} onClick={async () => await handleToggleStatus("REJECTED")} className="w-full bg-white text-zinc-700 hover:bg-red-500 hover:text-white">Rejeitar</Button>
      </div>
    </div>
  )
}

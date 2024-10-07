"use client"

import * as React from "react";
import { useSession } from "next-auth/react";
import {useRouter} from "next/navigation"
import {z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

const formSchema = z.object({
  amount: z
    .string()
    .min(3, {
      message: "O valor mínimo é 100.00 MZN",
    })
    .max(5, {
      message: "O valor máximo é 99,999.00 MZN",
    }),
})

export default function WithdrawForm() {
  const router = useRouter();
  const session = useSession();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const [isWithdrawDialogOpen, setIsWithdrawDialogOpen] = React.useState(false);
  const [withdrawError, setWithdrawError] = React.useState<string|null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const setAmountError = form.setError;

  async function onSubmit(form: z.infer<typeof formSchema>) {
    const amount = Number(form.amount);

    if (Number.isNaN(amount) || !Number.isInteger(amount)) {
      setAmountError("amount", {
        message: "Valor inválido"
      });
      return;
    }

    if (amount > (session.data?.user?.balance ?? 0)) {
      setAmountError("amount", {
        message: "Saldo insuficiente"
      });
      return;
    }

    setIsLoading(() => true);
    setWithdrawError(() => null);

    const response = await fetch("/api/withdraw", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        userId: session.data?.user?.id,
        amount: String(amount),
      }),
    });

    setIsLoading(() => false);

    if (response.status == 200) {
      setIsWithdrawDialogOpen(() => true);
      return;
    }
    
    const responseBody = (await response.json()) as {message: string};
    setWithdrawError(() => responseBody.message);
  }

  return (
    <div className="mt-8">

      {withdrawError && (
        <div className="mb-8 border-l-4 border-l-red-500 bg-red-100 rounded p-4">
          <h3 className="font-bold text-lg">Oops!</h3>
          <p>{withdrawError}</p>
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full mt-4">
          <FormField
            control={form.control}
            name="amount"
            render={({field}) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="valor à levantar"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isLoading} className="w-full mt-8" type="submit">{isLoading ? "Carregando...": "Levantar"}</Button>
        </form>
      </Form>

      <AlertDialog open={isWithdrawDialogOpen} onOpenChange={setIsWithdrawDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Levantamento</AlertDialogTitle>
            <AlertDialogDescription>
              <p>O seu pedido de levantamento foi efectuado com êxito.</p>
              <p>O valor levantado será depositado no número <span className="font-bold">{session.data?.user?.phone}</span> em no máximo 2 horas.</p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => router.push("/")} >Ok</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

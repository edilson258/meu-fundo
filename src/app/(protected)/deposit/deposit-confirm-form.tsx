"use client"

import * as React from "react"
import {z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {Button} from "@/components/ui/button"
import {Textarea} from "@/components/ui/textarea"
import {useSession} from "next-auth/react"
import {useRouter} from "next/navigation"
import {useSelectSector} from "./select-sector-context"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
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

const FormSchema = z.object({
  confirmation: z
    .string()
    .min(50, {
      message: "A message de confirmação deve conter no mínimo 50 caracters",
    })
    .max(500, {
      message: "A message de confirmação deve conter no máximo 500 caracters",
    }),
})

export default function ConfirmDepositForm() {
  const router = useRouter();
  const session = useSession();
  const [selectedSector, _] = useSelectSector();

  const [isDepositConfirmationDialogOpen, setIsDepositConfirmationDialogOpen] = React.useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const [confirmDepositError, setConfirmDepositError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  async function onSubmit({confirmation}: z.infer<typeof FormSchema>) {
    setIsLoading(() => true);
    setConfirmDepositError(() => null);

    const response = await fetch("/api/deposit/confirm", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        message: confirmation,
        userId: session.data?.user?.id,
        sectorId: selectedSector?.id, 
      }),
    });

    if (response.status === 201) {
      setIsDepositConfirmationDialogOpen(() => true);
    } else {
      const responseBody = (await response.json()) as {message: string};
      setConfirmDepositError(() => responseBody.message);
    }

    setIsLoading(() => false);
  }

  return (
    <>
      <h3 className="mt-12 font-bold text-xl">Confirmação do depósito</h3>

      {confirmDepositError && (
        <div className="my-8 border-l-4 border-l-red-500 bg-red-100 rounded p-4">
          <h3 className="font-bold text-lg">Oops!</h3>
          <p>{confirmDepositError}</p>
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full mt-4">
          <FormField
            control={form.control}
            name="confirmation"
            render={({field}) => (
              <FormItem>
                <FormLabel>Messagem de confirmação do depósito</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Cole aqui a message de confirmação do depósito"
                    className="min-h-40 max-h-52"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isLoading || !selectedSector} className="w-full mt-4" type="submit">{isLoading ? "Carregando..." : "Enviar confirmação"}</Button>
        </form>
      </Form>

      <AlertDialog open={isDepositConfirmationDialogOpen} onOpenChange={setIsDepositConfirmationDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmação de depósito</AlertDialogTitle>
            <AlertDialogDescription>
              <p>A confirmação de depósito foi recebida</p>
              <p>O sector investido será actualizado dentro de 2 horas.</p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => router.push("/")} >Ok</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

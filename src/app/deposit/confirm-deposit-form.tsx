"use client"

import {z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {Button} from "@/components/ui/button"
import {Textarea} from "@/components/ui/textarea"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

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
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  function onSubmit(_: z.infer<typeof FormSchema>) {
  }

  return (
    <>
      <h3 className="mt-12 font-bold text-xl">Confirmação do depósito</h3>
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
          <Button className="w-full mt-4" type="submit">Enviar confirmação</Button>
        </form>
      </Form>
    </>
  )
}

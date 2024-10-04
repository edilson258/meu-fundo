"use client"

import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"
import Link from "next/link"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import Container from "@/components/container"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

const loginFormSchema = z.object({
  phone: z.string().length(9, {
    message: "O número deve conter 9 dígitos",
  }),
  password: z.string().min(8, {
    message: "A senha deve conter no mínimo 8 caracteres",
  }),
});

export default function LoginPage() {
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
  })

  function onSubmit(_: z.infer<typeof loginFormSchema>) {
    fetch("/api/login");
  }

  return (
    <Container>
      <main className="pt-[25%]">
        <div>
          <h1 className="text-foreground text-2xl font-bold text-center">Bem-vindo ao Meu Fundo</h1>
        </div>

        <Form {...form}>
          <div className="my-4 mt-12">
            <h3 className="text-foreground text-xl">Iniciar sessão</h3>
          </div>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="phone"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Número</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="84123" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="pt-2 flex justify-center">
              <Link className="text-center text-sky-500 underline" href="/signup" >Não tens conta? crie nova conta aqui</Link>
            </div>

            <div>
              <Button className="mt-4 w-full" type="submit">Iniciar sessão</Button>
            </div>
          </form>
        </Form>
      </main>
    </Container>
  )
}

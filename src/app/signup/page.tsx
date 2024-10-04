"use client"

import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"
import Link from "next/link"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import Container from "@/components/container"

const signupFormSchema = z.object({
  phone: z.string().length(9, {
    message: "O número deve conter 9 dígitos",
  }),
  password: z.string().min(8, {
    message: "A senha deve conter no mínimo 8 caracteres",
  }),
  confirmPassword: z.string().min(8, {
    message: "A senha deve conter no mínimo 8 caracteres",
  }),
}).refine(
  (data) => data.password === data.confirmPassword, {
  message: "As senhas nao combinam",
  path: ["confirmPassword"],
});

export default function SignupPage() {
  const form = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
  })

  function onSubmit(_: z.infer<typeof signupFormSchema>) {
    fetch("/api/signup");
  }

  return (
    <Container>
      <main className="pt-[25%]">
        <div>
          <h1 className="text-foreground text-2xl font-bold text-center">Bem-vindo ao Meu Fundo</h1>
        </div>

        <Form {...form}>
          <div className="my-4 mt-12">
            <h3 className="text-foreground text-xl">Criar nova conta</h3>
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

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Confirmar senha</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="pt-2 flex justify-center">
              <Link className="text-sky-500 underline" href="/login" >Já tens conta? accese aqui</Link>
            </div>

            <div>
              <Button className="mt-4 w-full" type="submit">Criar conta</Button>
            </div>
          </form>
        </Form>
      </main>
    </Container>
  )
}

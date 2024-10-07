"use client"

import * as React from "react"
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"
import Link from "next/link"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import Container from "@/components/container"
import {useRouter} from "next/navigation"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import {signIn} from "next-auth/react"

const loginFormSchema = z.object({
  phone: z.string().length(9, {
    message: "O número deve conter 9 dígitos",
  }),
  password: z.string().min(8, {
    message: "A senha deve conter no mínimo 8 caracteres",
  }),
});

export default function LoginPage() {
  const router = useRouter();

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
  });

  const [loginError, setLoginError] = React.useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  async function onSubmit(form: z.infer<typeof loginFormSchema>) {
    setIsLoading(() => true);
    setLoginError(() => undefined);

    const result = await signIn("credentials", {
      phone: form.phone,
      password: form.password,
      redirect: false,
    });

    setIsLoading(() => false);

    if (result?.error) {
      setLoginError(() => "As credentials inseridas são inválidas, verifique e tente novamente.");
      return;
    }

    router.replace("/");
  }

  return (
    <Container>
      <main className="pt-[15%]">
        <div>
          <h1 className="text-foreground text-2xl font-bold text-center">Bem-vindo ao Meu Fundo</h1>
        </div>

        <Form {...form}>
          <div className="my-4 mt-8">
            <h3 className="text-foreground text-xl">Iniciar sessão</h3>
          </div>

          {loginError && (
            <div className="my-8 border-l-4 border-l-red-500 bg-red-100 rounded p-4">
              <h3 className="font-bold text-lg">Oops!</h3>
              <p>{loginError}</p>
            </div>
          )}

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
              <Button disabled={isLoading} className="mt-4 w-full" type="submit">{isLoading ? "Carregando..." : "Iniciar sessão"}</Button>
            </div>
          </form>
        </Form>
      </main>
    </Container>
  )
}

"use client"

import * as React from "react"
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"
import Link from "next/link"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import Container from "@/components/container"
import {signIn} from "next-auth/react"
import {useRouter} from "next/navigation"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

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
  });

  const router = useRouter();

  const [signupError, setSignupError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  async function onSubmit(form: z.infer<typeof signupFormSchema>) {
    setIsLoading(() => true);
    setSignupError(() => null);

    const response = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        phone: form.phone,
        password: form.password,
      }),
    });

    if (response.status !== 201) {
      setIsLoading(() => false);
      const error = ((await response.json()) as {message: string}).message;
      setSignupError(() => error);
      return;
    }

    const signInResult = await signIn("credentials", {
      phone: form.phone,
      password: form.password,
      redirect: false,
    });

    if (signInResult?.error) {
      alert("Algo deu errado iniciando sessão automaticamente, tente de forma manual.");
      router.push("/login");
    }

    setIsLoading(() => false);
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
            <h3 className="text-foreground text-xl">Criar nova conta</h3>
          </div>

          {signupError && (
            <div className="my-8 border-l-4 border-l-red-500 bg-red-100 rounded p-4">              
              <h3 className="font-bold text-lg">Oops!</h3>
              <p>{signupError}</p>
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
              <Button disabled={isLoading} className="mt-4 w-full" type="submit">{isLoading ? "Carregando...":  "Criar conta"}</Button>
            </div>
          </form>
        </Form>
      </main>
    </Container>
  )
}

"use client"

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
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  function onSubmit(_: z.infer<typeof formSchema>) {
  }

  return (
    <div className="mt-8">
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
          <Button className="w-full mt-8" type="submit">Levantar</Button>
        </form>
      </Form>
    </div>
  )
}

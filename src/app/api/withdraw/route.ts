import prisma from "@/db";
import {z} from "zod"
import {NextRequest, NextResponse} from "next/server";

const withdrawFromValidator = z.object({
  userId: z.string(),
  amount: z.string().min(3).max(5),
});

export async function POST(request: NextRequest) {
  const {data, success, error} = withdrawFromValidator.safeParse(await request.json());

  if (false === success) {
    console.error(error);
    return NextResponse.json({message: "As informações inseridas são inválidas."}, {status: 400});
  }

  const amount = Number(data.amount);

  if (Number.isNaN(amount)) {
    return NextResponse.json({message: "As informações inseridas são inválidas."}, {status: 400});
  }

  const user = await prisma.user.findFirst({where: {id: data.userId}, include: {account: true}});

  if (!user || !user.account) {
    return NextResponse.json({message: "Nenhúm usuáio/conta encontrado com o ID fornecido."}, {status: 404});
  }

  if (amount > user.account.balance) {
    return NextResponse.json({message: "Saldo insuficiente."}, {status: 400});
  }

  await prisma.withdraw.create({
    data: {
      amount: amount,
      accountId: user.account.id,
    }
  });

  await prisma.account.update({
    where: {id: user.account.id},
    data: {balance: user.account.balance - amount}
  });

  return NextResponse.json({message: "Levantamento efectuado com êxito."}, {status: 200});
}

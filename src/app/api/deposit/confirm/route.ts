import {z} from "zod"
import prisma from "@/db";
import {NextRequest, NextResponse} from "next/server";

const confirmDepositFromValidator = z.object({
  message: z
    .string()
    .min(50, {
      message: "A message de confirmação deve conter no mínimo 50 caracters",
    })
    .max(500, {
      message: "A message de confirmação deve conter no máximo 500 caracters",
    }),
  userId: z.string(),
  sectorId: z.string(),
});

export async function POST(request: NextRequest) {
  const {data, success, error} = confirmDepositFromValidator.safeParse(await request.json());

  if (false === success) {
    console.error(error);
    return NextResponse.json({message: "As informações inseridas são inválidas."}, {status: 400});
  }

  const user = await prisma.user.findFirst({where: {id: data.userId}, include:{account: true}});

  if (!user) {
    return NextResponse.json({message: "Nenhúm usuáio encontrado com o número fornecido."}, {status: 404});
  }

  const sector = await prisma.sector.findFirst({where: {id: data.sectorId}});

  if (!sector) {
    return NextResponse.json({message: "Nenhúm sector encontrado com o ID fornecido."}, {status: 404});
  }

  await prisma.depositConfirmation.create({
    data: {
      message: data.message,
      accountId: user.account?.id,
      sectorId: sector.id,
    }
  });

  return NextResponse.json({message: "Confirmação de depósito recebida."}, {status: 201});
}

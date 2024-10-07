import {z} from "zod"
import prisma from "@/db";
import {NextRequest, NextResponse} from "next/server";

const confirmDepositFromValidator = z.object({
  withdrawId: z.string(),
  adminId: z.string(),
  status: z.enum(["APPROVED", "PENDING", "REJECTED"]),
});

export async function POST(request: NextRequest) {
  const {data, success, error} = confirmDepositFromValidator.safeParse(await request.json());

  if (false === success) {
    console.error(error);
    return NextResponse.json({message: "As informações inseridas são inválidas."}, {status: 400});
  }

  if (! await prisma.user.findFirst({where: {id: data.adminId, role: "ADMIN"}})) {
    return NextResponse.json({message: "Nenhúm admin encontrado com o ID fornecido."}, {status: 404});
  }

  const withdraw = await prisma.withdraw.findFirst({where: {id: data.withdrawId}});

  if (!withdraw) {
    return NextResponse.json({message: "Nenhúm withdraw encontrado com o ID fornecido."}, {status: 404});
  }

  await prisma.withdraw.update({
    where: { id: withdraw.id},
    data: {status: data.status},
  })

  return NextResponse.json({message: "Estado alterado com successo."}, {status: 200});
}

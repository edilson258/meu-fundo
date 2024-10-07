import prisma from "@/db";
import crypto from "crypto";
import {z} from "zod"
import {NextRequest, NextResponse} from "next/server";
import {saltAndHashPassword} from "@/lib/utils";

const signupFromValidator = z.object({
  phone: z.string().length(9),
  password: z.string().min(8),
  // inviterID: z.string().optional(),
});

export async function POST(request: NextRequest) {
  const {data, success, error} = signupFromValidator.safeParse(await request.json());

  if (false === success) {
    console.error(error);
    return NextResponse.json({message: "As informações inseridas são inválidas."}, {status: 400});
  }

  if (await prisma.user.findFirst({where: {phone: data.phone}})) {
    return NextResponse.json({message: "O número inserido jà está em uso."}, {status: 422});
  }

  const code = crypto.randomBytes(8).toString("hex");
  const hashedPassword = saltAndHashPassword(data.password)

  await prisma.user.create({
    data: {
      phone: data.phone,
      password: hashedPassword,
      code: code,
      account: {create: {balance: 1500}},
      role: "ADMIN",
    },
  });

  return NextResponse.json({message: "Conta cria com sucesso."}, {status: 201});
}

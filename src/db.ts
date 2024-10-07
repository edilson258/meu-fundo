import {PrismaClient} from '@prisma/client'
import {THistoryItem, TSector} from './types';

const prismaClientSingleton = () => {
  return new PrismaClient()
}

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma

const sectors: TSector[] = [
  {
    id: "",
    dailyPayment: 25,
    durationInDays: 10,
    images: [], // ["https://raw.githubusercontent.com/edilson258/files/main/mf-ggold.jpg", "https://raw.githubusercontent.com/edilson258/files/main/mf-silver1.jpg", "https://raw.githubusercontent.com/edilson258/files/main/diamond.jpg", "https://raw.githubusercontent.com/edilson258/files/main/goldd.jpg"],
    name: "Agrário",
    price: 100,
    slug: "agrario",
  },
  {
    id: "",
    dailyPayment: 210,
    durationInDays: 30,
    images: [], // ["https://raw.githubusercontent.com/edilson258/files/main/mf-ggold.jpg", "https://raw.githubusercontent.com/edilson258/files/main/mf-silver1.jpg", "https://raw.githubusercontent.com/edilson258/files/main/diamond.jpg", "https://raw.githubusercontent.com/edilson258/files/main/goldd.jpg"],
    name: "Mineiro",
    price: 1000,
    slug: "mineiro",
  },
  {
    id: "",
    dailyPayment: 820,
    durationInDays: 30,
    images: [], //["https://raw.githubusercontent.com/edilson258/files/main/mf-iphone.jpg", "https://raw.githubusercontent.com/edilson258/files/main/mf-airpods.jpg", "https://raw.githubusercontent.com/edilson258/files/main/mf-applewatch.jpg", "https://raw.githubusercontent.com/edilson258/files/main/drone.jpg"],
    name: "Eletrónico",
    price: 3500,
    slug: "eletronico",
  },
  {
    id: "",
    dailyPayment: 1050,
    durationInDays: 30,
    images: [],// ["https://raw.githubusercontent.com/edilson258/files/main/mf-tesla.jpg", "https://raw.githubusercontent.com/edilson258/files/main/mf-moto.jpg", "https://raw.githubusercontent.com/edilson258/files/main/mf-gwagen.jpg", "https://raw.githubusercontent.com/edilson258/files/main/mf-bmw.jpeg"],
    name: "Automotivo",
    price: 5000,
    slug: "automotivo",
  },
  {
    id: "",
    dailyPayment: 5080,
    durationInDays: 60,
    images: [],// ["https://raw.githubusercontent.com/edilson258/files/main/mf-tesla.jpg", "https://raw.githubusercontent.com/edilson258/files/main/mf-moto.jpg", "https://raw.githubusercontent.com/edilson258/files/main/mf-gwagen.jpg", "https://raw.githubusercontent.com/edilson258/files/main/mf-bmw.jpeg"],
    name: "Aéreo",
    price: 20000,
    slug: "aereo",
  },
  {
    id: "",
    dailyPayment: 12500,
    durationInDays: 60,
    images: [],// ["https://raw.githubusercontent.com/edilson258/files/main/mf-tesla.jpg", "https://raw.githubusercontent.com/edilson258/files/main/mf-moto.jpg", "https://raw.githubusercontent.com/edilson258/files/main/mf-gwagen.jpg", "https://raw.githubusercontent.com/edilson258/files/main/mf-bmw.jpeg"],
    name: "Militar",
    price: 50000,
    slug: "militar",
  },
]

async function setupDatabase() {
  for (let sector of sectors) {
    await createSector(sector);
  }
}

async function createSector(s: TSector) {
  await prisma.sector.create({
    data: {
      dailyPayment: s.dailyPayment,
      durationInDays: s.durationInDays,
      name: s.name,
      price: s.price,
      slug: s.slug,
      images: {
        create: [].map(function (image) {
          return {url: image}
        })
      }
    }
  });
}

export const listSectors = async (): Promise<TSector[]> => {
  const sectors = await prisma.sector.findMany({include: {images: true}});
  return sectors.sort((a, b) => a.price < b.price ? -1 : 1);
}

export const buildUserHistory = async (id: string): Promise<THistoryItem[]> => {
  const user = await prisma.user.findFirst({where: {id}, include: {account: true}});

  if (!user || !user.account) {
    return [];
  }

  const withdraws = await prisma.withdraw.findMany({where: {accountId: user.account.id}});
  const deposits = await prisma.depositConfirmation.findMany({where: {accountId: user.account.id}, include: {sector: true}});

  const history: THistoryItem[] = [];

  for (let withdraw of withdraws) {
    history.push({
      type: "WITHDRAW",
      amount: withdraw.amount,
      status: withdraw.status,
      date: withdraw.createdAt,
    })
  }

  for (let deposit of deposits) {
    history.push({
      type: "DEPOSIT",
      amount: deposit.sector.price,
      status: deposit.status,
      date: deposit.createdAt,
    });
  }

  history.sort((a, b) => {
    return b.date.getTime() - a.date.getTime();
  });

  return history
}

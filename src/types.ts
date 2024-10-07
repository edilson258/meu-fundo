export type TUser = {
  phone: string,
  sectorName?: string,
  balance: number,
  totalWin: number,
}

export type TSector = {
  id: string,
  name: string,
  slug: string,
  price: number,
  dailyPayment: number,
  durationInDays: number,
  images: TImageLink[]
}

export type TImageLink = {
  url: string,
}

export type THistoryItem = {
  date: Date,
  amount: number,
  type: "WITHDRAW" | "DEPOSIT" | "BONUS",
  status: "PENDING" | "APPROVED" | "REJECTED",
}

export type TWithdraw = {
  id: string,
  phone: string,
  amount: number,
  date: Date,
}

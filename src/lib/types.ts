export type TUser = {
  phone: string,
  sectorName: string,
  balance: number,
  totalWin: number,
}

export type TSector = {
  name: string,
  slug: string,
  price: number,
  dailyPayment: number,
  durationInDays: number,
  images: string[]
}

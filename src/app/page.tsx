import type {TUser, TSector} from "@/lib/types"

import Container from "@/components/container"
import AccountStatus from "@/components/account-status"
import UserActions from "@/components/user-actions"
import SectorCard from "@/components/sector-card"

export default function HomePage() {
  const user: TUser = {
    phone: "84365238",
    sectorName: "Automotivo",
    balance: 3400,
    totalWin: 12750,
  }

  const sectors: TSector[] = [
    {
      dailyPayment: 340,
      durationInDays: 30,
      images: ["https://raw.githubusercontent.com/edilson258/files/main/mf-ggold.jpg", "https://raw.githubusercontent.com/edilson258/files/main/mf-silver1.jpg", "https://raw.githubusercontent.com/edilson258/files/main/diamond.jpg", "https://raw.githubusercontent.com/edilson258/files/main/goldd.jpg"],
      name: "Mineiro",
      price: 1000,
      slug: "mineiro",
    },
    {
      dailyPayment: 450,
      durationInDays: 30,
      images: ["https://raw.githubusercontent.com/edilson258/files/main/mf-iphone.jpg", "https://raw.githubusercontent.com/edilson258/files/main/mf-airpods.jpg", "https://raw.githubusercontent.com/edilson258/files/main/mf-applewatch.jpg", "https://raw.githubusercontent.com/edilson258/files/main/drone.jpg"],
      name: "Eletrónico",
      price: 1500,
      slug: "eletronico",
    },
    {
      dailyPayment: 1750,
      durationInDays: 30,
      images: ["https://raw.githubusercontent.com/edilson258/files/main/mf-tesla.jpg", "https://raw.githubusercontent.com/edilson258/files/main/mf-moto.jpg", "https://raw.githubusercontent.com/edilson258/files/main/mf-gwagen.jpg", "https://raw.githubusercontent.com/edilson258/files/main/mf-bmw.jpeg"],
      name: "Automotivo",
      price: 3500,
      slug: "automotivo",
    },
  ]

  return (
    <main className="min-h-screen text-zinc-700 pb-8">

      {/* Hero image */}
      <div className="min-h-52 border-b-8 border-b-sky-100">
        <img className="w-full object-cover object-top"
          src="https://raw.githubusercontent.com/edilson258/files/main/mf-hero.jpeg" />
      </div>

      {/* Home content */}
      <Container>

        {/* Motivation */}
        <div className="mt-12">
          <div className="border-l-4 p-4 rounded border-sky-500 bg-sky-100 text-justify">
            <p className="text-xl text-zinc-800">Bem-vindo ao <span className="font-bold">Meu Fundo</span></p> <br />
            Invista, Ganhe e Cresça Diariamente
            Tornamos o investimento simples e acessível para todos. Deposite seu dinheiro e cuidaremos do resto, investindo em diversos setores. Você receberá um pequeno retorno diário sobre o seu investimento, permitindo que seu dinheiro cresça de forma constante ao longo do tempo.
          </div>
        </div>

        {/* Account status */}
        <AccountStatus user={user} />
        <UserActions />

        <div className="mt-12 flex flex-col gap-4">
          <h3 className="text-xl font-bold text-zinc-800">Sectores disponíveis</h3>
          {sectors.map((sector, _) => (<SectorCard key={sector.price} sector={sector} />))}
        </div>

      </Container>
    </main>
  )
}

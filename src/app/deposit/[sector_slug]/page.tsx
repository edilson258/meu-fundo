import {ArrowLeft02Icon} from "hugeicons-react"
import {TSector} from "@/lib/types"
import ConfirmDepositForm from "../confirm-deposit-form"
import Container from "@/components/container"
import Link from "next/link"
import DepositComponent from "../deposit"

export default function DepositPage({params}: {params: any}) {
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

  const defaultSector = sectors.find((s) => s.slug === params.sector_slug) ?? sectors[0];

  return (
    <main className="min-h-screen pb-8">
      <div className="shadow">
        <Container>
          <Link href="/">
            <button className="py-4 flex gap-2">
              <ArrowLeft02Icon />
              Voltar
            </button>
          </Link>
        </Container>
      </div>

      <Container>
        <div className="mt-16">
          <div className="mb-16 p-4 border-l-4 border-l-sky-500 rounded bg-sky-100">
            <p className="font-bold text-xl">Informação</p>
            <p className="mt-4 text-justify">Estamos no processo de possibilitar depósitos directamente da plataforma, por agora siga as instruções abaixo de acardo com a tua carteira móvel.</p>
          </div>

          <DepositComponent defaultSector={defaultSector} sectors={sectors} />
          <ConfirmDepositForm />
        </div>
      </Container>
    </main>
  )
}  

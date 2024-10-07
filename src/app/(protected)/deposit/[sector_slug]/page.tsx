import Link from "next/link"
import {listSectors} from "@/db"
import {ArrowLeft02Icon} from "hugeicons-react"
import Container from "@/components/container"
import DepositComponent from "../deposit"

export default async function DepositPage({params}: {params: any}) {
  const sectors = await listSectors();
  const defaultSector = sectors.find((s) => s.slug === params.sector_slug) ?? sectors[0];

  return (
    <main className="min-h-screen pb-32">
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
          <div className="mb-16 p-4 border-l-4 border-l-green-500 rounded bg-green-100">
            <p className="font-bold text-xl">Informação</p>
            <p className="mt-4 text-justify">Estamos no processo de possibilitar depósitos directamente da plataforma, por agora siga as instruções abaixo de acardo com a tua carteira móvel.</p>
          </div>

          <DepositComponent defaultSector={defaultSector} sectors={sectors} />
        </div>
      </Container>
    </main>
  )
}  

"use client"

import * as React from "react"
import {Card, CardContent} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import type {TSector} from "@/types"
import Link from "next/link"
import Autoplay from "embla-carousel-autoplay"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"

function CarouselPlugin({images}: {images: Array<string>}) {
  const plugin = React.useRef(
    Autoplay({delay: 2000, stopOnInteraction: false})
  )

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {images.map((src, index) => (
          <CarouselItem key={index}>
            <div className="">
              <img alt="Loading image..." className="h-52 w-full rounded object-cover object-fit" src={src} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}

function SectorCard({sector}: {sector: TSector}) {
  return (
    <Card className="p-2">
      <CardContent className="p-0">
        <div>
          <CarouselPlugin images={sector.images.map(i => i.url)} />
        </div>

        <div className="mt-2">
          <p className="font-bold text-xl">Sector {sector.name}</p>
          <div className="mt-2 flex text-md flex-col gap-1">
            <div className="flex items-center justify-between">
              <p>Preço</p>
              <p className="font-bold">{sector.price}.00 MZN</p>
            </div>

            <div className="flex items-center justify-between">
              <p>Pagamento díario</p>
              <p className="font-bold">{sector.dailyPayment}.00 MZN</p>
            </div>

            <div className="flex items-center justify-between">
              <p>Duração</p>
              <p className="font-bold">{sector.durationInDays} Dias</p>
            </div>

            <div className="flex items-center justify-between">
              <p>Ganhos totais</p>
              <p className="font-bold">{sector.dailyPayment * sector.durationInDays}.00 MZN</p>
            </div>
          </div>
        </div>
      </CardContent>

      <Link href={`/deposit/${sector.slug}`}>
        <Button className="mt-4 w-full">
          Investir agora
        </Button>
      </Link>
    </Card>
  )
}

export default function Sectors({sectors}: {sectors: TSector[]}) {
  return (
    <div className="mt-12 flex flex-col gap-4">
      <h3 className="text-xl font-bold text-zinc-800">Sectores disponíveis</h3>
      {sectors.map((sector, _) => (<SectorCard key={sector.price} sector={sector} />))}
    </div>
  )
}

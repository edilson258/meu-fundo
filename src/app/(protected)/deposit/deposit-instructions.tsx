"use client"

import {Call02Icon} from "hugeicons-react"
import {useSelectSector} from "./select-sector-context";
import {Button} from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function DepositInstructions() {
  const [selectedSector, _] = useSelectSector();

  return (
    <>
      <h3 className="mt-16 mb-2 font-bold text-xl">Instruções de depósito</h3>
      <Accordion disabled={selectedSector ? false : true} type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-lg">Mpesa</AccordionTrigger>
          <AccordionContent>
            <MpesaInstructions amount={selectedSector?.price ?? 0}/>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="text-lg">Emola</AccordionTrigger>
          <AccordionContent>
            <EmolaInstructions amount={selectedSector?.price ?? 0} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  )
}

function MpesaInstructions({amount}: {amount: number}) {
  const mpesaNumber = "857662994";

  async function handleCopyNumber() {
    await navigator.clipboard.writeText(mpesaNumber);
  }

  return (
    <div className="px-4 text-md">
      <ol className="list-none">

        <li className="flex items-center gap-2">
          <span>1.</span>
          <span>Abra o telefone</span>
          <Call02Icon size={18} />
        </li>

        <li className="flex items-center gap-2">
          <span>2.</span>
          <span>Digite</span>
          <span className="font-bold">*150#</span>
        </li>

        <li className="flex items-center gap-2">
          <span>3.</span>
          <span>Escolha opção</span>
          <span className="font-bold">1 Transferir para Mpesa</span>
        </li>

        <li className="flex items-center gap-2">
          <span>3.</span>
          <span>Insira</span>
          <div className="w-full flex items-center justify-between gap-2">
            <p className="font-bold">{mpesaNumber}</p>
            <Button onClick={handleCopyNumber}>
              Copiar número
            </Button>
          </div>
        </li>

        <li className="flex items-center gap-2">
          <span>4.</span>
          <span>Insira o valor</span>
          <span className="font-bold">{amount}</span>
        </li>

        <li className="flex items-center gap-2">
          <span>5.</span>
          <span>Digite o seu PIN</span>
        </li>

        <li className="flex items-center gap-2">
          <span>6.</span>
          <span>Digite 1 para confirmar</span>
          <span className="font-bold">Paulo Americo Sambo</span>
        </li>

      </ol>
    </div>
  )
}

function EmolaInstructions({amount}: {amount: number}) {
  const eMolaNumber = "867662994";

  async function handleCopyNumber() {
    await navigator.clipboard.writeText(eMolaNumber);
  }
  return (
    <div className="px-4 text-md">
      <ol className="list-none">

        <li className="flex items-center gap-2">
          <span>1.</span>
          <span>Abra o telefone</span>
          <Call02Icon size={18} />
        </li>

        <li className="flex items-center gap-2">
          <span>2.</span>
          <span>Digite</span>
          <span className="font-bold">*898#</span>
        </li>

        <li className="flex items-center gap-2">
          <span>3.</span>
          <span>Escolha opção</span>
          <span className="font-bold">1 Transferir para 86/87</span>
        </li>

        <li className="flex items-center gap-2">
          <span>3.</span>
          <span>Insira</span>
          <div className="w-full flex items-center justify-between gap-2">
            <p className="font-bold">{eMolaNumber}</p>
            <Button onClick={handleCopyNumber}>
              Copiar número
            </Button>
          </div>
        </li>

        <li className="flex items-center gap-2">
          <span>4.</span>
          <span>Insira o valor</span>
          <span className="font-bold">{amount}</span>
        </li>

        <li className="flex items-center gap-2">
          <span>5.</span>
          <span>Insira o coteúdo da transação</span>
          <span className="font-bold">meu fundo</span>
        </li>

        <li className="flex items-center gap-2">
          <span>6.</span>
          <span>Digite o seu PIN</span>
        </li>

        <li className="flex items-center gap-2">
          <span>7.</span>
          <span>Digite 1 para confirmar</span>
          <span className="font-bold">Paulo Americo Sambo</span>
        </li>

      </ol>
    </div>
  )
}

import {Call02Icon} from "hugeicons-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {useSelectSector} from "./select-sector-context";

export default function DepositInstructions() {
  const [selectedSector, _] = useSelectSector();

  return (
    <>
      <h3 className="mt-16 mb-2 font-bold text-xl">Instruções de depósito</h3>
      <Accordion disabled={selectedSector ? false : true} type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-lg">Mpesa</AccordionTrigger>
          <AccordionContent>
            <MpesaInstructions />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="text-lg">Emola</AccordionTrigger>
          <AccordionContent>
            <EmolaInstructions />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  )
}

function MpesaInstructions() {
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
          <span className="font-bold">1 transferir dinheiro</span>
        </li>

        <li className="flex items-center gap-2">
          <span>3.</span>
          <span>Digite o número</span>
          <span className="font-bold">8400000000</span>
        </li>

      </ol>
    </div>
  )
}

function EmolaInstructions() {
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
          <span className="font-bold">1 transferir dinheiro</span>
        </li>

        <li className="flex items-center gap-2">
          <span>3.</span>
          <span>Digite o número</span>
          <span className="font-bold">8700000000</span>
        </li>

      </ol>
    </div>
  )
}

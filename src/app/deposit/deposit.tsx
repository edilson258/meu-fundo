"use client"

import  * as React from "react";
import {SelectSectorProvider, useSelectSector} from "./select-sector-context";
import DepositInstructions from "./deposit-instructions";
import type { TSector } from "@/lib/types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function DepositComponent({defaultSector, sectors}: {defaultSector: TSector, sectors: TSector[]}) {
  return (
    <SelectSectorProvider>
      <main>
        <h3 className="text-xl font-bold mb-4">Sector à investir</h3>
        <SectorSelect defaultSector={defaultSector} sectors={sectors} />
        <SectorAndAmountToDeposit />
        <DepositInstructions />
      </main>
    </SelectSectorProvider>
  )
}

function SectorAndAmountToDeposit() {
  const [selectedSector, _] = useSelectSector();

  return (
    <div className="flex justify-between font-bold mt-4 p-4 shadow rounded">
      <p>{selectedSector?.name}</p>
      <p className="text-sky-500 underline underline-offset-4">{selectedSector?.price ?? 0}.00 MZN</p>
    </div>
  )
};

function SectorSelect({defaultSector, sectors}: {defaultSector: TSector, sectors: TSector[]}) {
  const [selectedSector, setSelectedSector] = useSelectSector();

  React.useEffect(() => {
    setSelectedSector(defaultSector);
  }, []);

  function onChange(selectedSectorSlug: string) {
    setSelectedSector(sectors.find((s) => s.slug == selectedSectorSlug));
  }

  return (
    <Select onValueChange={onChange} value={selectedSector?.slug}>
      <SelectTrigger className="w-full text-lg">
        <SelectValue placeholder="Escolha o sector" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Sectores</SelectLabel>
          {sectors.map((s, _) => (<SectorSelectItem key={s.slug} name={s.name} value={s.slug} />))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

function SectorSelectItem({value, name}: {value: string, name: string}) {
  return (
    <SelectItem value={value}>{name}</SelectItem>
  )
}

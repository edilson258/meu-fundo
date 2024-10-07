"use client"

import * as React from "react"
import type {TSector} from "@/types";

interface ISelectSector {
  sector: TSector | undefined,
  changeSector: (s: TSector | undefined) => void,
}

const SelectSectorContext = React.createContext<ISelectSector | undefined>(undefined);

export const SelectSectorProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  const [selectedSector, setSelectedSector] = React.useState<TSector | undefined>(undefined);

  const setSector = (s: TSector | undefined) => {
    setSelectedSector(() => s);
  }

  return (
    <SelectSectorContext.Provider value={
      {sector: selectedSector, changeSector: setSector}
    }>
      {children}
    </SelectSectorContext.Provider>
  )
}

export function useSelectSector(): [TSector | undefined, (s: TSector | undefined) => void] {
  const context = React.useContext(SelectSectorContext);

  if (!context) {
    alert("Algo deu errado, recaregue a pagina")
    throw new Error("Algo deu errado")
  }

  return [context.sector, context.changeSector];
}

import {ReactNode} from "react";

export default function Container({children}: {children: Readonly<ReactNode>}) {
  return (
    <main className="px-4 max-w-[480px] mx-auto">
      {children}
    </main>
  )
}

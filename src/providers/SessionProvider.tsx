"use client"

import * as React from "react"
import {SessionProvider} from "next-auth/react"

interface NextAuthSessionProviderProps {
  children: Readonly<React.ReactNode>,
}

export default function NextAuthSessionProvider({children}: NextAuthSessionProviderProps) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}

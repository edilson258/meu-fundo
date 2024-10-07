import "next-auth";
import {JWT} from "next-auth/jwt"
import {type User} from "next-auth";
import {} from "next-auth"

declare module "next-auth" {
  /**
   * The shape of the user object returned in the OAuth providers' `profile` callback,
   * or the second parameter of the `session` callback, when using a database.
   */
  interface User {
    id?: string,
    code?: string,
    phone?: string
    balance?: number,
    totalWin?: number,
    sectorName?: string,
    role?: "USER" | "ADMIN",
  }
  /**
   * The shape of the account object returned in the OAuth providers' `account` callback,
   * Usually contains information about the provider being used, like OAuth tokens (`access_token`, etc).
   */
  interface Account {}
  /**
   * Returned by `useSession`, `auth`, contains information about the active session.
   */
  interface Session {}
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT {
    user?: User,
  }
}

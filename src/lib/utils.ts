import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import crypto from "crypto"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function saltAndHashPassword(plain: string): string {
  return crypto.pbkdf2Sync(plain, process.env?.HASH_SALT ?? "salt", 100, 24, "SHA512").toString("hex");
}

import { paymentModeEnum } from "@/db/schema"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const PAYMENT_MODE_LABELS = {
  CASH: "",
  CHEQUE: "Cheque Number",
  UPI: "UTR/TxId",
  ONLINE: "NEFT/IMPS/RTGS No.",
  DD: "DD Number",
  CRYPTO: "Crypto Exchange Id"
} as const satisfies Record<typeof paymentModeEnum.enumValues[number], string>;

export function getPaymentModeHelper(paymentMode: typeof paymentModeEnum.enumValues[number]) {
  return PAYMENT_MODE_LABELS[paymentMode];
}

export const escapeCSVValue = (value: string | number | null): string => {
  if (value === null) return "-"
  const stringValue = String(value);
  if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
    return `"${stringValue.replace(/"/g, '""')}"`;
  }
  return stringValue;
};

export function escapeRupees(paise: number | null | undefined): number | null {
  return paise == null ? null : paise / 100;
}

export function formatMonth(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: 'long',
    year: "numeric"
  }).format(date)
}
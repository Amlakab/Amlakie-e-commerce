import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatNumberWithDecimal = (num: number): string => {
  const [int, decimal] = num.toString().split('.')
  return decimal ? `${int}.${decimal.padEnd(2, '0')}` : int
}

export const toSlug = (text: string): string =>
  text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')     // Remove non-word characters
    .replace(/\s+/g, '-')         // Replace spaces with hyphens  // Replace multiple hyphens with single
    .trim()                       // Remove leading/trailing whitespace
    .replace(/^-+|-+$/g, '')      // Remove leading/trailing hyphens


    const CURRENCY_FORMATTER = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    
    
    export function formatCurrency(amount: number): string {
      return CURRENCY_FORMATTER.format(amount);
    }
    const NUMBER_FORMATTER = new Intl.NumberFormat('en-US');

    export function formatNumber(number: number): string {
      return NUMBER_FORMATTER.format(number);
    }
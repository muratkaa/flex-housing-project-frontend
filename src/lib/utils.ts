import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

//util function for api call params
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const removeEmptyParams = (params: Record<string, any>) => {
  return Object.fromEntries(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Object.entries(params).filter(([_, v]) => v != null && v !== '')
  );
};
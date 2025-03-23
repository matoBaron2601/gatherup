import { parse, differenceInDays } from "date-fns";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const getDaysDifference = (date1: string, date2: string): number => {
  const format = "dd-MM-yyyy";
  const parsedDate1 = parse(date1, format, new Date());
  const parsedDate2 = parse(date2, format, new Date());

  return Math.abs(differenceInDays(parsedDate1, parsedDate2));
};

export const convertStringToDate = (dateStr: string): Date => {
  return parse(dateStr, "dd-MM-yyyy", new Date());
};

export const convertDateToString = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};

export const convertStringFromDefaultToDotNotation = (dateString: string) => {
  return dateString.replace(/\-/g, ".");
};
export const convertStringFromDotToDefaultNotation = (dateString: string) => {
  return dateString.replace(/./g, "-");
};
export const createUUIDToken = () => crypto.randomUUID();

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

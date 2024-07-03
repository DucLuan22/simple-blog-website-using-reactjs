import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getTextFromParagraphString(pString: string): string {
  const parser = new DOMParser();

  const doc = parser.parseFromString(pString, "text/html");
  const pElement = doc.querySelector("p");

  if (!pElement) {
    return "";
  }

  const tempElement = document.createElement("div");
  tempElement.innerHTML = pElement.innerHTML;

  const childElements = tempElement.querySelectorAll("*");
  childElements.forEach((child) => child.remove());

  return tempElement.textContent?.trim() || "";
}

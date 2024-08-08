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

export function htmlStringToElements(htmlString: string) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");
  return doc.body.children;
}

export function getRandomBgColor() {
  const colors = [
    "bg-red-500",
    "bg-green-500",
    "bg-blue-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-teal-500",
    "bg-orange-500",
    "bg-gray-500",
  ];

  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

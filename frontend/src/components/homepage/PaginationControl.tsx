import { cn } from "@/lib/utils";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
}

export function PaginationControls({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
}: PaginationControlsProps) {
  return (
    <Pagination>
      <PaginationContent className="w-full justify-between">
        <PaginationItem>
          <PaginationPrevious
            onClick={onPrevious}
            className={cn(
              "border-[1px] cursor-pointer border-foreground pointer-events-auto",
              currentPage === 0 ? "pointer-events-none opacity-50" : undefined
            )}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            onClick={onNext}
            className={cn(
              "border-[1px] cursor-pointer border-foreground pointer-events-auto",
              currentPage >= totalPages - 1
                ? "pointer-events-none opacity-50"
                : undefined
            )}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

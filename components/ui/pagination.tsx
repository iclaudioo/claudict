import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
  searchParams?: Record<string, string>;
}

export function Pagination({
  currentPage,
  totalPages,
  basePath,
  searchParams = {},
}: PaginationProps) {
  if (totalPages <= 1) return null;

  function buildHref(page: number) {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(page));
    return `${basePath}?${params.toString()}`;
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      {currentPage > 1 && (
        <Link
          href={buildHref(currentPage - 1)}
          className="text-sm text-muted hover:text-text transition-colors px-3 py-1.5 border border-border rounded-md"
        >
          Previous
        </Link>
      )}
      <span className="text-sm text-muted font-mono">
        {currentPage} / {totalPages}
      </span>
      {currentPage < totalPages && (
        <Link
          href={buildHref(currentPage + 1)}
          className="text-sm text-muted hover:text-text transition-colors px-3 py-1.5 border border-border rounded-md"
        >
          Next
        </Link>
      )}
    </div>
  );
}

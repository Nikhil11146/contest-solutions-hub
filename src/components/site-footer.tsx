import { Link } from "@tanstack/react-router";
import { SITE_NAME } from "@/data";

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-5 py-10 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>
          {SITE_NAME} — a weekly contest series. Editorials published every Sunday.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link to="/solutions" className="transition-colors hover:text-foreground">
            Solutions
          </Link>
          <Link to="/rules" className="transition-colors hover:text-foreground">
            Rules
          </Link>
          <Link to="/contact" className="transition-colors hover:text-foreground">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}

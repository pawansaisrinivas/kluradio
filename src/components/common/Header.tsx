"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Logo from "../Logo";
import { useAppContext } from "@/contexts/AppContext";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Radio } from "lucide-react";

const NavLinks = ({ inSheet = false }: { inSheet?: boolean }) => {
  const { user, logout } = useAppContext();
  const linkClass = inSheet
    ? "block py-2 text-lg"
    : "text-sm font-medium hover:text-primary transition-colors";

  return (
    <>
      <Link href="/" className={linkClass}>
        Home
      </Link>
      <Link href="/team" className={linkClass}>
        Our Team
      </Link>
      <Link href="/recruitment" className={linkClass}>
        Recruitment
      </Link>
      {user?.role === "admin" && (
        <Link href="/admin" className={linkClass}>
          Admin
        </Link>
      )}
      {user ? (
        <Button onClick={logout} variant={inSheet ? "default" : "secondary"} size="sm">
          Logout
        </Button>
      ) : (
        <Button asChild size="sm">
          <Link href="/login">Login</Link>
        </Button>
      )}
    </>
  );
};

export default function Header() {
  const { user } = useAppContext();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center">
          <Logo />
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          <NavLinks />
        </nav>

        <div className="flex flex-1 items-center justify-end gap-4">
          {user && (
            <div className="hidden md:flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Radio className="h-4 w-4 text-primary" />
              <span>Welcome, {user.name}</span>
            </div>
          )}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="p-4">
                <Link href="/" className="mb-8 block">
                  <Logo />
                </Link>
                <nav className="flex flex-col gap-6">
                  <NavLinks inSheet />
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

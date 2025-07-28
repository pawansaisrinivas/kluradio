import { Facebook, Instagram, Twitter } from "lucide-react";
import Link from "next/link";
import Logo from "../Logo";

export default function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <div className="flex justify-center md:justify-start mb-4">
              <Logo />
            </div>
            <p className="text-sm">
              The sound of our campus. Tune in for music, news, and events.
            </p>
          </div>
          <div>
            <h3 className="font-bold font-headline mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/team"
                  className="hover:text-primary transition-colors"
                >
                  Our Team
                </Link>
              </li>
              <li>
                <Link
                  href="/recruitment"
                  className="hover:text-primary transition-colors"
                >
                  Join Us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold font-headline mb-4">Connect With Us</h3>
            <div className="flex justify-center md:justify-start space-x-4">
              <Link href="#" aria-label="Facebook">
                <Facebook className="h-6 w-6 hover:text-primary transition-colors" />
              </Link>
              <Link href="#" aria-label="Instagram">
                <Instagram className="h-6 w-6 hover:text-primary transition-colors" />
              </Link>
              <Link href="#" aria-label="Twitter">
                <Twitter className="h-6 w-6 hover:text-primary transition-colors" />
              </Link>
            </div>
          </div>
        </div>
        <div className="text-center text-sm text-muted-foreground mt-8 pt-8 border-t">
          <p>&copy; {new Date().getFullYear()} KL Radio Hub. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}

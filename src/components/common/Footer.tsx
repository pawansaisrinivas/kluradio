import { Instagram, Linkedin, Youtube } from "lucide-react";
import Link from "next/link";
import Logo from "../Logo";

const SpotifyIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-6 w-6 hover:text-primary transition-colors"
    >
        <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm4.183 14.25a.599.599 0 0 1-.817.568c-2.034-1.24-4.597-1.527-7.624-.836a.6.6 0 0 1-.682-.556.6.6 0 0 1 .556-.682c3.273-.74 6.066-.4 8.327.98a.599.599 0 0 1 .248.526zm.78-2.31a.75.75 0 0 1-1.025.698c-2.28-1.38-5.748-1.76-8.484-1.025a.75.75 0 0 1-.825-.688.75.75 0 0 1 .688-.825c3.088-.817 6.848-.383 9.458 1.15a.75.75 0 0 1 .328.7zM18.6 9.57A.9.9 0 0 1 17.43 10.5c-2.73-1.59-7.22-2.1-9.98-1.15a.9.9 0 0 1-.986-1.12.9.9 0 0 1 1.12-.986c3.21-1.1 8.02-.45 11.01 1.51a.9.9 0 0 1 .016 1.616z" />
    </svg>
);


export default function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <Logo />
            <p className="text-sm mt-4 text-center md:text-left">
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
              <Link href="https://www.linkedin.com/company/klradio/posts/?feedView=all" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-6 w-6 hover:text-primary transition-colors" />
              </Link>
              <Link href="https://www.youtube.com/@klradio9994" aria-label="Youtube" target="_blank" rel="noopener noreferrer">
                <Youtube className="h-6 w-6 hover:text-primary transition-colors" />
              </Link>
              <Link href="https://www.instagram.com/kl__radio" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                <Instagram className="h-6 w-6 hover:text-primary transition-colors" />
              </Link>
              <Link href="https://open.spotify.com/show/50TzLR1hsu0y6hwVExHHqO" aria-label="Spotify" target="_blank" rel="noopener noreferrer">
                <SpotifyIcon />
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

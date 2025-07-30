import { Instagram, Linkedin, Youtube } from "lucide-react";
import Link from "next/link";
import Logo from "../Logo";

const SpotifyIcon = () => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className="h-6 w-6 hover:text-primary transition-colors"
    >
        <path d="M12 24a12 12 0 1 0 0-24 12 12 0 0 0 0 24z"/>
        <path d="M18.15 12.89a.48.48 0 0 1-.68.16 4.11 4.11 0 0 0-3.46-2.09c-.22 0-.44.02-.66.07a.5.5 0 0 1-.55-.48.5.5 0 0 1 .48-.55c.26-.06.52-.09.79-.09a5.07 5.07 0 0 1 4.25 2.53.48.48 0 0 1 .18.67zM17.5 15.94a.42.42 0 0 1-.58.17 3.3 3.3 0 0 0-3-1.45.42.42 0 0 1-.47-.53c.04-.21.25-.36.47-.32a4.13 4.13 0 0 1 3.73 1.81.42.42 0 0 1-.15.62zM16.5 18.73a.35.35 0 0 1-.49.13 2.47 2.47 0 0 0-2.2-.95.34.34 0 0 1-.36-.42c.04-.17.2-.28.37-.25a3.17 3.17 0 0 1 2.8 1.19.35.35 0 0 1-.12.5z"/>
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

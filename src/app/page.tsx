"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppContext } from "@/contexts/AppContext";
import { Newspaper, Rss } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const { posts } = useAppContext();

  return (
    <div className="space-y-12">
      <section className="text-center bg-card p-8 rounded-lg shadow-md border">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary mb-4">
          Welcome to KL Radio Hub
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
          Your one-stop portal for all announcements, events, and recruitment
          updates from KL Radio. Stay tuned, stay connected!
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/team">Meet The Team</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/recruitment">Join Us</Link>
          </Button>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold font-headline text-center mb-8 flex items-center justify-center gap-3">
          <Newspaper className="w-8 h-8 text-primary" />
          Latest Announcements
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.length > 0 ? (
            posts.map((post) => (
              <Card key={post.id} className="flex flex-col">
                <CardHeader>
                  <CardTitle className="flex items-start gap-3">
                    <Rss className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                    <span className="flex-grow">{post.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground">{post.content}</p>
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="col-span-full text-center text-muted-foreground">
              No announcements right now. Check back later!
            </p>
          )}
        </div>
      </section>
    </div>
  );
}

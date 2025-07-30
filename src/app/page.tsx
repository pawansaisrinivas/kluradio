
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppContext } from "@/contexts/AppContext";
import { List, Newspaper, Rss } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const { posts } = useAppContext();

  return (
    <div className="space-y-12">
      <section className="bg-card p-8 rounded-lg shadow-md border">
        <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary mb-2">
                🎙️ Welcome to KL RADIO – The Voice of KLUians!
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-semibold">
                Tune in. Speak out. Stand out.
            </p>
        </div>

        <div className="mt-6 text-center max-w-4xl mx-auto">
            <p className="text-lg">
                At KL RADIO, we’re more than just a student-run radio station – we’re a movement that brings campus life to your ears. From music and talk shows to campus updates and student voices, KL RADIO is the heartbeat of our university.
            </p>
        </div>

        <div className="mt-8 grid md:grid-cols-2 gap-8 text-left">
            <div className="bg-secondary/50 p-6 rounded-lg">
                <h2 className="text-2xl font-bold font-headline mb-4 text-primary flex items-center gap-2"><List className="w-6 h-6"/>What We Do:</h2>
                <ul className="space-y-3 list-inside">
                    <li className="flex items-start gap-2">🎧 <span className="flex-1">Stream dynamic music playlists curated by students</span></li>
                    <li className="flex items-start gap-2">🗣️ <span className="flex-1">Host live shows, faculty interviews, and podcasts</span></li>
                    <li className="flex items-start gap-2">🎤 <span className="flex-1">Share student stories, achievements, and events</span></li>
                    <li className="flex items-start gap-2">📢 <span className="flex-1">Offer campus updates and event highlights</span></li>
                    <li className="flex items-start gap-2">🎬 <span className="flex-1">Bring behind-the-scenes fun and creative projects</span></li>
                </ul>
            </div>
            <div className="bg-secondary/50 p-6 rounded-lg">
                <h2 className="text-2xl font-bold font-headline mb-4 text-primary">🧑‍🎓 By the Students, For the Students</h2>
                <p className="mb-4">
                    KL RADIO is powered by passionate student hosts, producers, and creatives. Whether you're into tech, RJing, storytelling, or marketing, there's a space for you to shine here.
                </p>
                <h3 className="text-xl font-bold font-headline mb-2">💡 Join the Vibe</h3>
                <p className="mb-4">
                    Want to be a part of something cool and creative? We’re always looking for new talent and fresh voices.
                </p>
                <Button asChild>
                    <Link href="/recruitment">Check out our Recruitment Page</Link>
                </Button>
            </div>
        </div>
        <p className="text-center text-xl font-semibold mt-8">
            🎶 Let Your Voice Echo Across KL!
        </p>
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

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { AlertCircle, FileText, Megaphone, PlusCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function AdminPage() {
  const { user, addPost, recruitmentOpen, toggleRecruitment, posts } = useAppContext();
  const router = useRouter();
  const { toast } = useToast();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && user?.role !== "admin") {
      toast({
        variant: "destructive",
        title: "Access Denied",
        description: "You must be an admin to view this page.",
      });
      router.push("/login");
    }
  }, [user, router, toast, isMounted]);

  const handleAddPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && content) {
      addPost({ title, content });
      toast({
        title: "Post Published!",
        description: "Your new announcement is now live.",
      });
      setTitle("");
      setContent("");
    }
  };

  if (!isMounted || user?.role !== "admin") {
    return (
        <div className="flex justify-center items-center h-full">
            <Alert className="max-w-md">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Authenticating...</AlertTitle>
                <AlertDescription>
                Please wait while we verify your access rights.
                </AlertDescription>
            </Alert>
        </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold font-headline">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage announcements and recruitment.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PlusCircle className="text-primary" />
                Create New Announcement
              </CardTitle>
              <CardDescription>
                Publish a new post to the home page.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddPost} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., Upcoming Event"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Describe the announcement..."
                    required
                  />
                </div>
                <Button type="submit">Publish Post</Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
               <CardTitle className="flex items-center gap-2">
                <FileText className="text-primary" />
                Published Posts
              </CardTitle>
              <CardDescription>
                A list of all current announcements.
              </CardDescription>
            </CardHeader>
            <CardContent>
                <ul className="space-y-4">
                    {posts.map(post => (
                        <li key={post.id} className="border-l-4 border-primary pl-4 py-2 bg-secondary/50 rounded-r-md">
                            <h4 className="font-bold">{post.title}</h4>
                            <p className="text-sm text-muted-foreground">{post.content}</p>
                        </li>
                    ))}
                </ul>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Megaphone className="text-primary" />
                Recruitment Status
              </CardTitle>
              <CardDescription>
                Activate or deactivate the member recruitment form.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4 rounded-md border p-4">
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Recruitment Form
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {recruitmentOpen ? "The form is currently active and public." : "The form is currently inactive."}
                  </p>
                </div>
                <Switch
                  checked={recruitmentOpen}
                  onCheckedChange={toggleRecruitment}
                  aria-label="Toggle recruitment form"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

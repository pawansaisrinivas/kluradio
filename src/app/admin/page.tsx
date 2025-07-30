
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import * as XLSX from "xlsx";
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
import { AlertCircle, Download, FileText, Loader2, Megaphone, PlusCircle, Trash2, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { db } from "@/lib/firebase";
import { collection, onSnapshot, query, orderBy, doc } from "firebase/firestore";

interface Post {
  id: string;
  title: string;
  content: string;
}

interface Applicant {
  id: string;
  fullName: string;
  email: string;
  wing: string;
}

export default function AdminPage() {
  const { user, addPost, deletePost, toggleRecruitment, deleteApplicant } = useAppContext();
  const router = useRouter();
  const { toast } = useToast();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [recruitmentOpen, setRecruitmentOpen] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.role !== "admin") {
      // Non-admins will be redirected by the main check below
      return;
    }

    const postsQuery = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const applicantsQuery = query(collection(db, "applicants"), orderBy("fullName"));
    const recruitmentRef = doc(db, "settings", "recruitment");

    const unsubPosts = onSnapshot(postsQuery, (snapshot) => {
      const postsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Post[];
      setPosts(postsData);
    });

    const unsubApplicants = onSnapshot(applicantsQuery, (snapshot) => {
      const applicantsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Applicant[];
      setApplicants(applicantsData);
    });

    const unsubRecruitment = onSnapshot(recruitmentRef, (doc) => {
        if (doc.exists()) {
            setRecruitmentOpen(doc.data().isOpen);
        } else {
            setRecruitmentOpen(false);
        }
        // Once we get the recruitment status, we can stop the main loader.
        setLoading(false);
    });


    return () => {
      unsubPosts();
      unsubApplicants();
      unsubRecruitment();
    };
  }, [user]);

  useEffect(() => {
    // This effect handles redirection if the user is not an admin.
    // It runs after the initial loading state is resolved.
    if (!loading && user?.role !== "admin") {
      toast({
        variant: "destructive",
        title: "Access Denied",
        description: "You must be an admin to view this page.",
      });
      router.push("/login");
    }
  }, [user, router, toast, loading]);

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
  
  const handleDeletePost = (postId: string) => {
    deletePost(postId);
    toast({
      variant: "destructive",
      title: "Post Deleted",
      description: "The announcement has been removed.",
    });
  };
  
  const handleDeleteApplicant = (applicantId: string) => {
    deleteApplicant(applicantId);
    toast({
      variant: "destructive",
      title: "Applicant Deleted",
      description: "The applicant has been removed from the list.",
    });
  };

  const handleDownloadExcel = () => {
    if (applicants.length === 0) {
      toast({
        variant: "destructive",
        title: "No Applicants",
        description: "There is no applicant data to download.",
      });
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(applicants.map(({ id, ...rest }) => rest));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Applicants");
    XLSX.writeFile(workbook, "KL_Radio_Applicants.xlsx");
     toast({
        title: "Download Started",
        description: "Your applicants list is downloading as an Excel file.",
      });
  };


  if (loading || user?.role !== "admin") {
    return (
        <div className="flex justify-center items-center h-full">
            <Alert className="max-w-md">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Authenticating & Loading Data...</AlertTitle>
                <AlertDescription>
                Please wait while we verify your access and load the dashboard.
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
                {posts.length > 0 ? (
                  <ul className="space-y-4">
                      {posts.map(post => (
                          <li key={post.id} className="flex items-start justify-between gap-4 border-l-4 border-primary pl-4 py-2 bg-secondary/50 rounded-r-md">
                              <div className="flex-grow">
                                  <h4 className="font-bold">{post.title}</h4>
                                  <p className="text-sm text-muted-foreground">{post.content}</p>
                              </div>
                              <Button variant="ghost" size="icon" onClick={() => handleDeletePost(post.id)} aria-label="Delete post">
                                  <Trash2 className="h-4 w-4 text-destructive"/>
                              </Button>
                          </li>
                      ))}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">
                      No announcements yet.
                  </p>
                )}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1 space-y-8">
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
                  checked={recruitmentOpen ?? false}
                  onCheckedChange={() => toggleRecruitment(recruitmentOpen!)}
                  aria-label="Toggle recruitment form"
                  disabled={recruitmentOpen === null}
                />
              </div>
            </CardContent>
          </Card>

           <Card>
            <CardHeader>
               <div className="flex items-center justify-between gap-2">
                <CardTitle className="flex items-center gap-2">
                  <Users className="text-primary" />
                  Recruitment Applicants
                </CardTitle>
                <Button variant="outline" size="sm" onClick={handleDownloadExcel} disabled={applicants.length === 0}>
                  <Download className="mr-2 h-4 w-4" />
                  Excel
                </Button>
              </div>
              <CardDescription>
                View all applications submitted for open positions.
              </CardDescription>
            </CardHeader>
            <CardContent>
                {applicants.length > 0 ? (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Applicant</TableHead>
                                <TableHead>Wing</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {applicants.map((applicant) => (
                                <TableRow key={applicant.id}>
                                    <TableCell>
                                        <div className="font-medium">{applicant.fullName}</div>
                                        <div className="text-xs text-muted-foreground">{applicant.email}</div>
                                    </TableCell>
                                    <TableCell>
                                      <Badge variant="outline">{applicant.wing}</Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                      <Button variant="ghost" size="icon" onClick={() => handleDeleteApplicant(applicant.id)}>
                                        <Trash2 className="h-4 w-4 text-destructive" />
                                      </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                ) : (
                    <p className="text-sm text-muted-foreground text-center py-4">
                        No applications yet.
                    </p>
                )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

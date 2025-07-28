"use client";

import RecruitmentForm from "@/components/recruitment/RecruitmentForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppContext } from "@/contexts/AppContext";
import { PartyPopper, XCircle } from "lucide-react";

export default function RecruitmentPage() {
  const { recruitmentOpen } = useAppContext();

  return (
    <div className="max-w-4xl mx-auto">
      {recruitmentOpen ? (
        <Card>
            <CardHeader className="text-center">
                <div className="mx-auto bg-primary rounded-full p-3 w-fit mb-4">
                    <PartyPopper className="h-8 w-8 text-primary-foreground" />
                </div>
                <CardTitle className="text-3xl font-headline">Join the KL Radio Team!</CardTitle>
                <CardDescription>We're excited to have you. Please fill out the form below to apply.</CardDescription>
            </CardHeader>
            <CardContent>
                <RecruitmentForm />
            </CardContent>
        </Card>
      ) : (
        <Card className="text-center p-8">
            <div className="mx-auto bg-muted rounded-full p-4 w-fit mb-6">
                <XCircle className="h-12 w-12 text-muted-foreground" />
            </div>
            <CardTitle className="text-3xl font-headline">Recruitment is Currently Closed</CardTitle>
            <CardDescription className="mt-4 text-lg">
                We are not accepting new applications at this time.
                <br />
                Please check back later or follow our announcements for future opportunities.
            </CardDescription>
        </Card>
      )}
    </div>
  );
}

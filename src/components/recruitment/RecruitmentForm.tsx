
"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useAppContext } from "@/contexts/AppContext";
import { useEffect } from "react";

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  regdId: z.string().min(1, {
    message: "Registration ID is required.",
  }),
   email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  mobileNumber: z.string().regex(/^\d{10}$/, {
    message: "Please enter a valid 10-digit mobile number.",
  }),
  department: z.string().min(1, { message: "Please select a department." }),
  otherDepartment: z.string().optional(),
  regulation: z.string().min(1, { message: "Please select a regulation." }),
  wing: z.string().min(1, { message: "Please select a wing." }),
  reason: z.string().min(1, { message: "This field is required." }),
}).refine(data => {
    if (data.department === 'other' && !data.otherDepartment) {
        return false;
    }
    return true;
}, {
    message: "Please specify your department",
    path: ["otherDepartment"],
});

export default function RecruitmentForm() {
  const { toast } = useToast();
  const { addApplicant } = useAppContext();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      regdId: "",
      email: "",
      mobileNumber: "",
      department: "",
      otherDepartment: "",
      regulation: "",
      wing: "",
      reason: "",
    },
  });

  const departmentValue = form.watch("department");

  useEffect(() => {
    if (departmentValue !== 'other') {
      form.setValue('otherDepartment', '');
    }
  }, [departmentValue, form]);


  function onSubmit(values: z.infer<typeof formSchema>) {
     const finalValues = {
      ...values,
      department: values.department === 'other' ? values.otherDepartment! : values.department,
    };
    addApplicant(finalValues);
    toast({
      title: "Application Submitted! 🎉",
      description: "Thank you for your interest. We will be in touch soon.",
    });

    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="regdId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Registration ID Number</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 23000..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email ID</FormLabel>
                <FormControl>
                  <Input placeholder="you@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="mobileNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mobile Number</FormLabel>
                <FormControl>
                  <Input placeholder="10-digit mobile number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="department"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Department</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                    <SelectTrigger>
                        <SelectValue placeholder="Select your department" />
                    </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        <SelectItem value="CSE">CSE</SelectItem>
                        <SelectItem value="ECE">ECE</SelectItem>
                        <SelectItem value="CSIT">CSIT</SelectItem>
                        <SelectItem value="MECH">MECH</SelectItem>
                        <SelectItem value="CIVIL">CIVIL</SelectItem>
                        <SelectItem value="BBA">BBA</SelectItem>
                        <SelectItem value="BCA">BCA</SelectItem>
                        <SelectItem value="other">Others</SelectItem>
                    </SelectContent>
                </Select>
                <FormMessage />
                </FormItem>
            )}
            />
            {departmentValue === 'other' && (
                <FormField
                    control={form.control}
                    name="otherDepartment"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Please Specify Your Department</FormLabel>
                        <FormControl>
                        <Input placeholder="Your department" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
            )}
           <FormField
            control={form.control}
            name="regulation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Regulation</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your regulation" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Y23">Y23</SelectItem>
                    <SelectItem value="Y24">Y24</SelectItem>
                    <SelectItem value="Y25">Y25</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="wing"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Preferred Wing</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a wing to join" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="RJ">RJ</SelectItem>
                    <SelectItem value="Technical">Technical</SelectItem>
                    <SelectItem value="Creative">Creative/Content Writing</SelectItem>
                    <SelectItem value="Graphic Designing">Graphic Designing</SelectItem>
                    <SelectItem value="Broadcasting">Broadcasting</SelectItem>
                    <SelectItem value="Video Editing">Video Editing</SelectItem>
                    <SelectItem value="Public Relations">Public Relations</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="reason"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Why do you want to join KL Radio?</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us about your passion for radio, relevant skills, or what you hope to contribute..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit Application</Button>
      </form>
    </Form>
  );
}

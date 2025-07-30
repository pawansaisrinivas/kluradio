
'use server';

/**
 * @fileOverview A flow for sending a confirmation email to recruitment applicants.
 *
 * This file defines a Genkit flow that simulates sending an email.
 * In a real-world application, the console.log statements would be replaced
 * with a call to an email service provider like SendGrid, Nodemailer, or Resend.
 *
 * - sendConfirmationEmail - A function that handles the email sending process.
 * - ConfirmationEmailInput - The input type for the sendConfirmationEmail function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const ConfirmationEmailInputSchema = z.object({
  name: z.string().describe('The full name of the applicant.'),
  email: z.string().email().describe('The email address of the applicant.'),
});
export type ConfirmationEmailInput = z.infer<typeof ConfirmationEmailInputSchema>;

// This is the exported function that the frontend will call.
export async function sendConfirmationEmail(input: ConfirmationEmailInput): Promise<void> {
  await sendConfirmationEmailFlow(input);
}

const sendConfirmationEmailFlow = ai.defineFlow(
  {
    name: 'sendConfirmationEmailFlow',
    inputSchema: ConfirmationEmailInputSchema,
    outputSchema: z.void(),
  },
  async (input) => {
    console.log('--- SIMULATING EMAIL ---');
    console.log(`To: ${input.email}`);
    console.log(`From: klradio@kluniversity.in`);
    console.log('Subject: Your KL Radio Application has been received!');
    console.log('');
    console.log(`Hi ${input.name},`);
    console.log('');
    console.log(
      'Thank you for submitting your application to join the KL Radio team. We have successfully received it.'
    );
    console.log(
      'We appreciate your interest and will review your application carefully. We will get back to you soon.'
    );
    console.log('');
    console.log('Best Regards,');
    console.log('The KL Radio Team');
    console.log('--- END OF SIMULATION ---');

    // In a real application, you would add your email sending logic here.
    // For example, using a service like Nodemailer or an API like SendGrid.
  }
);


'use server';

/**
 * @fileOverview A flow for sending a confirmation email to recruitment applicants.
 *
 * This file defines a Genkit flow that sends an email using Nodemailer.
 * It reads SMTP configuration from environment variables.
 *
 * - sendConfirmationEmail - A function that handles the email sending process.
 * - ConfirmationEmailInput - The input type for the sendConfirmationEmail function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import * as nodemailer from 'nodemailer';
import 'dotenv/config';

const ConfirmationEmailInputSchema = z.object({
  name: z.string().describe('The full name of the applicant.'),
  email: z.string().email().describe('The email address of the applicant.'),
});
export type ConfirmationEmailInput = z.infer<typeof ConfirmationEmailInputSchema>;

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
    // Nodemailer transporter setup
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: Number(process.env.EMAIL_PORT) === 465, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: '"KL Radio" <klradio@kluniversity.in>',
      to: input.email,
      subject: 'Your KL Radio Application has been received!',
      html: `
        <p>Hi ${input.name},</p>
        <p>Thank you for submitting your application to join the KL Radio team. We have successfully received it.</p>
        <p>We appreciate your interest and will review your application carefully. We will get back to you soon.</p>
        <br/>
        <p>Best Regards,</p>
        <p>The KL Radio Team</p>
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log(`Confirmation email sent successfully to ${input.email}`);
    } catch (error) {
      console.error('Error sending email:', error);
      // Optional: re-throw the error if you want the flow to fail
      throw new Error('Failed to send confirmation email.');
    }
  }
);

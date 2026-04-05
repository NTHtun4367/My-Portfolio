import { Request, Response } from "express";
import { Resend } from "resend";
import { ENV } from "../utils/env";
import asyncHandler from "../utils/asyncHandler";

const resend = new Resend(ENV.RESEND_API_KEY);

export const sendEmail = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { name, email, message } = req.body;

    const { data, error } = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: ["naythu1943@gmail.com"],
      subject: `New Message from ${name}`,
      replyTo: email,
      html: `
      <div style="font-family: sans-serif; padding: 20px; background-color: #f9f9f9; border-radius: 10px; border: 1px solid #e5e7eb;">
        <h2 style="color: #3b82f6; margin-bottom: 10px;">New Contact Form Submission</h2>
        <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
        <p style="font-size: 16px; color: #374151;"><strong>Name:</strong> ${name}</p>
        <p style="font-size: 16px; color: #374151;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #3b82f6; text-decoration: none;">${email}</a></p>
        <div style="margin-top: 20px; padding: 15px; background-color: #ffffff; border-radius: 8px; border-left: 4px solid #3b82f6;">
          <p style="font-size: 16px; color: #374151; font-weight: bold; margin-bottom: 8px;">Message:</p>
          <p style="font-size: 15px; color: #4b5563; white-space: pre-wrap; line-height: 1.6;">${message}</p>
        </div>
      </div>
    `,
    });

    if (error) {
      res.status(400).json({
        success: false,
        error: error.message,
      });
      return;
    }

    res.status(200).json({
      success: true,
      data,
    });
  },
);

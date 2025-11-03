import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactMessageSchema } from "@shared/schema";
import { z } from "zod";
import nodemailer from "nodemailer";

// Configure email transporter
const createEmailTransporter = () => {
  // For development, you can use a service like Gmail
  // In production, use a professional email service like SendGrid, Mailgun, etc.
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const contactMessage = await storage.createContactMessage(validatedData);
      
      // Send email notification
      try {
        const transporter = createEmailTransporter();
        
        const emailContent = `
New contact form submission from Cyber Business Solutions website:

Name: ${contactMessage.name}
Email: ${contactMessage.email}
Company: ${contactMessage.company || 'Not provided'}

Message:
${contactMessage.message}

Submitted on: ${contactMessage.createdAt.toLocaleString()}
        `;

        await transporter.sendMail({
          from: process.env.SMTP_USER || contactMessage.email,
          to: 'cbs@cyberalloy.eu',
          subject: `New Contact Form Submission from ${contactMessage.name}`,
          text: emailContent,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${contactMessage.name}</p>
            <p><strong>Email:</strong> ${contactMessage.email}</p>
            <p><strong>Company:</strong> ${contactMessage.company || 'Not provided'}</p>
            <p><strong>Message:</strong></p>
            <p>${contactMessage.message.replace(/\n/g, '<br>')}</p>
            <p><strong>Submitted on:</strong> ${contactMessage.createdAt.toLocaleString()}</p>
          `,
        });
      } catch (emailError) {
        console.error('Failed to send email:', emailError);
        // Continue even if email fails - we still store the message
      }
      
      res.status(201).json({ 
        success: true, 
        message: "Message sent successfully",
        id: contactMessage.id 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Invalid form data", 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Failed to send message" 
        });
      }
    }
  });

  // Get all contact messages (for admin purposes)
  app.get("/api/contact", async (req, res) => {
    try {
      const messages = await storage.getContactMessages();
      res.json(messages);
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to retrieve messages" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

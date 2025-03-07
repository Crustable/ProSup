import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertTicketSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all categories
  app.get("/api/categories", async (_req, res) => {
    const categories = await storage.getCategories();
    res.json(categories);
  });

  // Get category by slug
  app.get("/api/categories/:slug", async (req, res) => {
    const category = await storage.getCategoryBySlug(req.params.slug);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json(category);
  });

  // Get articles by category ID
  app.get("/api/categories/:id/articles", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid category ID" });
    }
    const articles = await storage.getArticles(id);
    res.json(articles);
  });

  // Get article by slug
  app.get("/api/articles/:slug", async (req, res) => {
    const article = await storage.getArticleBySlug(req.params.slug);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.json(article);
  });

  // Create support ticket
  app.post("/api/tickets", async (req, res) => {
    try {
      const ticket = insertTicketSchema.parse(req.body);
      const created = await storage.createTicket(ticket);
      res.status(201).json(created);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid ticket data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create ticket" });
    }
  });

  // Get all tickets (admin only)
  app.get("/api/tickets", async (_req, res) => {
    const tickets = await storage.getTickets();
    res.json(tickets);
  });

  // Update ticket status (admin only)
  app.patch("/api/tickets/:id/status", async (req, res) => {
    const id = parseInt(req.params.id);
    const status = z.string().parse(req.body.status);
    
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid ticket ID" });
    }

    const updated = await storage.updateTicketStatus(id, status);
    if (!updated) {
      return res.status(404).json({ message: "Ticket not found" });
    }
    
    res.json(updated);
  });

  const httpServer = createServer(app);
  return httpServer;
}

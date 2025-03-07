import {
  type Category,
  type Article,
  type Ticket,
  type InsertCategory,
  type InsertArticle,
  type InsertTicket,
  categories,
  articles,
  tickets,
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  // Categories
  getCategories(): Promise<Category[]>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;

  // Articles
  getArticles(categoryId: number): Promise<Article[]>;
  getArticleBySlug(slug: string): Promise<Article | undefined>;

  // Tickets
  createTicket(ticket: InsertTicket): Promise<Ticket>;
  getTickets(): Promise<Ticket[]>;
  updateTicketStatus(id: number, status: string): Promise<Ticket | undefined>;
}

export class DatabaseStorage implements IStorage {
  async getCategories(): Promise<Category[]> {
    return await db.select().from(categories);
  }

  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    const [category] = await db
      .select()
      .from(categories)
      .where(eq(categories.slug, slug));
    return category;
  }

  async getArticles(categoryId: number): Promise<Article[]> {
    return await db
      .select()
      .from(articles)
      .where(eq(articles.categoryId, categoryId));
  }

  async getArticleBySlug(slug: string): Promise<Article | undefined> {
    const [article] = await db
      .select()
      .from(articles)
      .where(eq(articles.slug, slug));
    return article;
  }

  async createTicket(ticket: InsertTicket): Promise<Ticket> {
    const [newTicket] = await db
      .insert(tickets)
      .values({
        ...ticket,
        status: "open",
        createdAt: new Date(),
      })
      .returning();
    return newTicket;
  }

  async getTickets(): Promise<Ticket[]> {
    return await db.select().from(tickets);
  }

  async updateTicketStatus(id: number, status: string): Promise<Ticket | undefined> {
    const [updatedTicket] = await db
      .update(tickets)
      .set({ status })
      .where(eq(tickets.id, id))
      .returning();
    return updatedTicket;
  }
}

export const storage = new DatabaseStorage();
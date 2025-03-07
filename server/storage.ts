import {
  type Category,
  type Article,
  type Ticket,
  type InsertCategory,
  type InsertArticle,
  type InsertTicket,
} from "@shared/schema";

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

export class MemStorage implements IStorage {
  private categories: Map<number, Category>;
  private articles: Map<number, Article>;
  private tickets: Map<number, Ticket>;
  private currentIds: { category: number; article: number; ticket: number };

  constructor() {
    this.categories = new Map();
    this.articles = new Map();
    this.tickets = new Map();
    this.currentIds = { category: 1, article: 1, ticket: 1 };

    // Seed initial categories
    const seedCategories: InsertCategory[] = [
      {
        name: "Audio",
        slug: "audio",
        description: "Audio equipment and setup guides",
      },
      {
        name: "Lighting",
        slug: "lighting",
        description: "Lighting equipment and configuration",
      },
      {
        name: "Production Video",
        slug: "production-video",
        description: "Video production and streaming guides",
      },
    ];

    seedCategories.forEach((cat) => {
      const id = this.currentIds.category++;
      this.categories.set(id, { ...cat, id });
    });
  }

  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    return Array.from(this.categories.values()).find((c) => c.slug === slug);
  }

  async getArticles(categoryId: number): Promise<Article[]> {
    return Array.from(this.articles.values()).filter(
      (a) => a.categoryId === categoryId
    );
  }

  async getArticleBySlug(slug: string): Promise<Article | undefined> {
    return Array.from(this.articles.values()).find((a) => a.slug === slug);
  }

  async createTicket(ticket: InsertTicket): Promise<Ticket> {
    const id = this.currentIds.ticket++;
    const newTicket: Ticket = {
      ...ticket,
      id,
      status: "open",
      createdAt: new Date(),
    };
    this.tickets.set(id, newTicket);
    return newTicket;
  }

  async getTickets(): Promise<Ticket[]> {
    return Array.from(this.tickets.values());
  }

  async updateTicketStatus(id: number, status: string): Promise<Ticket | undefined> {
    const ticket = this.tickets.get(id);
    if (!ticket) return undefined;
    
    const updatedTicket = { ...ticket, status };
    this.tickets.set(id, updatedTicket);
    return updatedTicket;
  }
}

export const storage = new MemStorage();

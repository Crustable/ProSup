import { useQuery } from "@tanstack/react-query";
import { type Category } from "@shared/schema";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Link } from "wouter";
import { Headphones, Lightbulb, Video } from "lucide-react";

const categoryIcons = {
  audio: Headphones,
  lighting: Lightbulb,
  "production-video": Video,
};

export default function Home() {
  const { data: categories, isLoading } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  if (isLoading) {
    return (
      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-40 bg-muted animate-pulse rounded-lg" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Technical Documentation</h1>
        <p className="text-muted-foreground mt-2 text-sm sm:text-base">
          Find guides and documentation for audio, lighting, and video production.
        </p>
      </div>

      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {categories?.map((category) => {
          const Icon = categoryIcons[category.slug as keyof typeof categoryIcons];
          return (
            <Link key={category.id} href={`/category/${category.slug}`}>
              <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
                <CardHeader>
                  <Icon className="h-6 w-6 sm:h-8 sm:w-8 mb-2" />
                  <CardTitle className="text-lg sm:text-xl">{category.name}</CardTitle>
                  <CardDescription className="text-sm">{category.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
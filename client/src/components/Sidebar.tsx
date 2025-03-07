import { Link, useLocation } from "wouter";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { type Category } from "@shared/schema";
import { cn } from "@/lib/utils";
import { LayoutGrid, Headphones, Lightbulb, Video, Ticket, X } from "lucide-react";

const categoryIcons = {
  audio: Headphones,
  lighting: Lightbulb,
  "production-video": Video,
};

interface SidebarProps {
  onClose?: () => void;
}

export default function Sidebar({ onClose }: SidebarProps) {
  const [location] = useLocation();

  const { data: categories, isLoading } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const handleNavigate = () => {
    if (onClose) onClose();
  };

  if (isLoading) {
    return (
      <div className="w-full h-full bg-background border-r">
        <div className="p-4 space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-10 bg-muted animate-pulse rounded" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-background border-r">
      {onClose && (
        <div className="flex justify-end p-2 md:hidden">
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      <ScrollArea className="h-full">
        <div className="p-4 space-y-4">
          <Link href="/" onClick={handleNavigate}>
            <Button
              variant="ghost"
              className={cn("w-full justify-start", {
                "bg-accent": location === "/",
              })}
            >
              <LayoutGrid className="mr-2 h-4 w-4" />
              Overview
            </Button>
          </Link>

          <div className="space-y-1">
            {categories?.map((category) => {
              const Icon = categoryIcons[category.slug as keyof typeof categoryIcons];
              return (
                <Link 
                  key={category.id} 
                  href={`/category/${category.slug}`}
                  onClick={handleNavigate}
                >
                  <Button
                    variant="ghost"
                    className={cn("w-full justify-start", {
                      "bg-accent": location === `/category/${category.slug}`,
                    })}
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    {category.name}
                  </Button>
                </Link>
              );
            })}
          </div>

          <div className="pt-4 border-t">
            <Link href="/support" onClick={handleNavigate}>
              <Button
                variant="ghost"
                className={cn("w-full justify-start", {
                  "bg-accent": location === "/support",
                })}
              >
                <Ticket className="mr-2 h-4 w-4" />
                Support
              </Button>
            </Link>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
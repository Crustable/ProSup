import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import { type Category, type Article } from "@shared/schema";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { ChevronRight } from "lucide-react";

export default function CategoryPage() {
  const { slug } = useParams();

  const { data: category, isLoading: loadingCategory } = useQuery<Category>({
    queryKey: [`/api/categories/${slug}`],
  });

  const { data: articles, isLoading: loadingArticles } = useQuery<Article[]>({
    queryKey: [`/api/categories/${category?.id}/articles`],
    enabled: !!category?.id,
  });

  if (loadingCategory || loadingArticles) {
    return (
      <div className="space-y-6">
        <div className="h-20 bg-muted animate-pulse rounded" />
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 bg-muted animate-pulse rounded" />
          ))}
        </div>
      </div>
    );
  }

  if (!category) {
    return <div>Category not found</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{category.name}</h1>
        <p className="text-muted-foreground mt-2">{category.description}</p>
      </div>

      <div className="space-y-4">
        {articles?.map((article) => (
          <Link key={article.id} href={`/article/${article.slug}`}>
            <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
              <CardHeader className="flex-row items-center justify-between py-3">
                <CardTitle className="text-lg">{article.title}</CardTitle>
                <ChevronRight className="h-4 w-4" />
              </CardHeader>
            </Card>
          </Link>
        ))}

        {articles?.length === 0 && (
          <p className="text-muted-foreground">No articles yet.</p>
        )}
      </div>
    </div>
  );
}

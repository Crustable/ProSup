import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import { type Article } from "@shared/schema";
import ArticleContent from "@/components/ArticleContent";

export default function ArticlePage() {
  const { slug } = useParams();

  const { data: article, isLoading } = useQuery<Article>({
    queryKey: [`/api/articles/${slug}`],
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-64 bg-muted animate-pulse rounded" />
        <div className="space-y-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-4 bg-muted animate-pulse rounded" />
          ))}
        </div>
      </div>
    );
  }

  if (!article) {
    return <div>Article not found</div>;
  }

  return <ArticleContent article={article} />;
}

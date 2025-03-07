import { type Article } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import ReactMarkdown from "react-markdown";

interface ArticleContentProps {
  article: Article;
}

export default function ArticleContent({ article }: ArticleContentProps) {
  return (
    <Card>
      <CardContent className="prose prose-slate max-w-none p-6">
        <h1>{article.title}</h1>
        <ReactMarkdown>{article.content}</ReactMarkdown>
      </CardContent>
    </Card>
  );
}

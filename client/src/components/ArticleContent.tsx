import { type Article } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";
import { Smartphone, Network, Sliders, Settings } from "lucide-react";

interface ArticleContentProps {
  article: Article;
}

export default function ArticleContent({ article }: ArticleContentProps) {
  // Special handling for App Store link
  const appStoreUrl = "https://apps.apple.com/us/app/mxbus/id1530411157";

  return (
    <Card>
      <CardContent className="prose prose-slate max-w-none p-6">
        <h1>{article.title}</h1>

        {article.slug === 'mxbus-app-guide' && (
          <div className="not-prose mb-8">
            <h2 className="text-2xl font-bold mb-4">Download from App Store</h2>
            <a href={appStoreUrl} target="_blank" rel="noopener noreferrer">
              <Button className="w-full sm:w-auto">
                Download MXBus App
              </Button>
            </a>
          </div>
        )}

        <div className="grid gap-6 my-8">
          <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
            <Smartphone className="h-8 w-8 text-primary" />
            <div>
              <h3 className="font-bold">Initial Setup</h3>
              <p>Open the app and allow necessary permissions</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
            <Network className="h-8 w-8 text-primary" />
            <div>
              <h3 className="font-bold">Network Configuration</h3>
              <p>Connect to the same network as your audio system</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
            <Sliders className="h-8 w-8 text-primary" />
            <div>
              <h3 className="font-bold">Channel Control</h3>
              <p>Adjust levels and manage audio channels</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
            <Settings className="h-8 w-8 text-primary" />
            <div>
              <h3 className="font-bold">Mix Settings</h3>
              <p>Configure EQ, effects, and monitor routing</p>
            </div>
          </div>
        </div>

        <ReactMarkdown>{article.content}</ReactMarkdown>
      </CardContent>
    </Card>
  );
}
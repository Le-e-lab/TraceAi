
"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Newspaper, MapPin, Globe, Loader2, AlertTriangle } from "lucide-react";
import { fetchNews, type NewsItem, type FetchNewsOutput } from "@/ai/flows/fetch-news-flow"; // Assuming flow is created

export default function NewsPage() {
  const [newsData, setNewsData] = useState<FetchNewsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadNews() {
      setIsLoading(true);
      setError(null);
      try {
        // Mock location for now, replace with actual location detection later
        const data = await fetchNews({ country: "Global", city: "Local" });
        setNewsData(data);
      } catch (err) {
        console.error("Failed to fetch news:", err);
        setError("Could not load news at this time. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }
    loadNews();
  }, []);

  const renderNewsItems = (items: NewsItem[], title: string, icon: React.ReactNode) => (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {items && items.length > 0 ? (
          items.map((item, index) => (
            <div key={index} className="p-3 border rounded-lg bg-card hover:bg-muted/50 transition-colors">
              <h3 className="font-semibold text-md text-foreground">{item.title}</h3>
              <p className="text-xs text-muted-foreground mb-1">
                Source: {item.source} - {new Date(item.date).toLocaleDateString()}
              </p>
              <p className="text-sm text-foreground/90">{item.summary}</p>
            </div>
          ))
        ) : (
          <p className="text-sm text-muted-foreground">No news available for this section.</p>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto py-2 space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-2">
          <Newspaper className="h-8 w-8 text-primary" />
          News & Alerts
        </h1>
        <p className="text-muted-foreground">
          Stay updated on the latest health information and outbreaks.
        </p>
      </div>

      {isLoading && (
        <div className="flex flex-col items-center justify-center h-64">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="mt-4 text-muted-foreground">Loading news...</p>
        </div>
      )}

      {error && !isLoading && (
        <Alert variant="destructive" className="shadow-md">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error Fetching News</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {!isLoading && !error && newsData && (
        <>
          {renderNewsItems(newsData.nationalNews, "National News", <Globe className="h-6 w-6 text-primary" />)}
          {renderNewsItems(newsData.localNews, "Local News (Mock)", <MapPin className="h-6 w-6 text-primary" />)}
        </>
      )}
       <Card className="mt-6 shadow-md bg-muted/30">
        <CardContent className="p-4">
          <p className="text-xs text-center text-muted-foreground">
            News data is currently mocked for demonstration purposes. Location-based news would require further integration.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

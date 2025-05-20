
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { FeedbackData } from "@/lib/schemas";
import { FeedbackSchema } from "@/lib/schemas";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { analyzeSentiment, type SentimentAnalysisOutput } from "@/ai/flows/sentiment-analysis";
import { useState } from "react";
import { Loader2, Send, Smile, Meh, Frown, MessageSquare } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export function FeedbackForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [sentimentResult, setSentimentResult] = useState<SentimentAnalysisOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<FeedbackData>({
    resolver: zodResolver(FeedbackSchema),
    defaultValues: {
      feedbackText: "",
    },
  });

  async function onSubmit(data: FeedbackData) {
    setIsLoading(true);
    setSentimentResult(null);
    try {
      const result = await analyzeSentiment({ feedback: data.feedbackText });
      setSentimentResult(result);
      toast({
        title: "Feedback Analyzed",
        description: "AI has analyzed the sentiment of your feedback.",
      });
    } catch (error) {
      console.error("Error analyzing sentiment:", error);
      toast({
        title: "Error",
        description: "Could not analyze feedback sentiment.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }
  
  const getSentimentIcon = (score: number | undefined) => {
    if (score === undefined) return <Meh className="h-5 w-5" />;
    if (score > 0.3) return <Smile className="h-5 w-5 text-green-500" />;
    if (score < -0.3) return <Frown className="h-5 w-5 text-red-500" />;
    return <Meh className="h-5 w-5 text-yellow-500" />;
  };


  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2">
            <MessageSquare className="h-7 w-7 text-primary" />
            Share Your Feedback
        </CardTitle>
        <CardDescription className="text-sm">
          Your thoughts help us improve TraceWise. Let us know about your experience.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="feedbackText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">Your Feedback</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us how you feel about the app, its features, or the risk score accuracy..."
                      className="min-h-[120px] bg-input text-sm"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-xs">
                    Please be open and honest. This will be analyzed for sentiment.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="satisfaction"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-xs">Overall, how satisfied are you with the app?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1 sm:flex-row sm:space-y-0 sm:space-x-4"
                    >
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem value="satisfied" />
                        </FormControl>
                        <FormLabel className="font-normal text-sm">Satisfied</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem value="neutral" />
                        </FormControl>
                        <FormLabel className="font-normal text-sm">Neutral</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem value="dissatisfied" />
                        </FormControl>
                        <FormLabel className="font-normal text-sm">Dissatisfied</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full !mt-8 bg-secondary text-secondary-foreground hover:bg-secondary/90" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Send className="mr-2 h-4 w-4" />
              )}
              Submit & Analyze Feedback
            </Button>
          </form>
        </Form>

        {sentimentResult && (
          <Alert className={cn(
            "mt-6 rounded-lg", // Ensure consistent rounding
            sentimentResult.score > 0.3 ? "border-green-500/50 bg-green-500/10 text-green-700 dark:text-green-400" :
            sentimentResult.score < -0.3 ? "border-red-500/50 bg-red-500/10 text-red-700 dark:text-red-400" :
            "border-yellow-500/50 bg-yellow-500/10 text-yellow-700 dark:text-yellow-400"
          )}>
            <div className="flex items-center">
              {getSentimentIcon(sentimentResult.score)}
              <AlertTitle className="ml-2 font-semibold text-sm">AI Sentiment Analysis</AlertTitle>
            </div>
            <AlertDescription className="mt-1 text-xs">
              {sentimentResult.sentiment} (Score: {sentimentResult.score.toFixed(2)})
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}

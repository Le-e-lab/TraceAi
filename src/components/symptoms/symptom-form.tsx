
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { SymptomReportData } from "@/lib/schemas";
import { SymptomReportSchema } from "@/lib/schemas";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, FileText, Loader2 } from "lucide-react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export function SymptomForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<SymptomReportData>({
    resolver: zodResolver(SymptomReportSchema),
    defaultValues: {
      symptoms: "",
      fever: false,
      cough: false,
      shortnessOfBreath: false,
      fatigue: false,
      lossOfTasteSmell: false,
      reportDate: new Date(),
    },
  });

  async function onSubmit(data: SymptomReportData) {
    setIsLoading(true);
    console.log("Symptom Report Submitted:", data);
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    toast({
      title: "Symptoms Reported",
      description: "Your health status has been successfully logged. Thank you!",
    });
    form.reset(); // Reset form after successful submission
  }

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Symptom Self-Reporting</CardTitle>
        <CardDescription>
          Please report any symptoms you are experiencing. This helps us monitor community health.
          An optional daily reminder can be set up (feature coming soon).
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="reportDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Report Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("2020-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                { name: "fever", label: "Fever" },
                { name: "cough", label: "Cough" },
                { name: "shortnessOfBreath", label: "Shortness of Breath" },
                { name: "fatigue", label: "Fatigue / Tiredness" },
                { name: "lossOfTasteSmell", label: "Loss of Taste or Smell" },
              ].map(symptom => (
                <FormField
                  key={symptom.name}
                  control={form.control}
                  name={symptom.name as keyof SymptomReportData}
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4">
                       <FormControl>
                        <Checkbox
                          checked={field.value as boolean}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>{symptom.label}</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
              ))}
            </div>
            
            <FormField
              control={form.control}
              name="symptoms"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Other Symptoms or Details</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe any other symptoms or relevant details..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Please provide as much detail as possible.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <FileText className="mr-2 h-4 w-4" />
              )}
              Submit Report
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

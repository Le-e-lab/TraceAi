
'use server';
/**
 * @fileOverview Fetches news related to health outbreaks.
 *
 * - fetchNews - A function that retrieves national and local news.
 * - FetchNewsInput - The input type for the fetchNews function.
 * - FetchNewsOutput - The return type for the fetchNews function.
 * - NewsItem - Represents a single news article.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

export const NewsItemSchema = z.object({
  title: z.string().describe('The headline of the news article.'),
  summary: z.string().describe('A brief summary of the news article.'),
  source: z.string().describe('The source of the news article (e.g., WHO, CDC, Local Health Dept).'),
  date: z.string().datetime().describe('The publication date of the news article.'),
  url: z.string().url().optional().describe('A URL to the full article, if available.'),
});
export type NewsItem = z.infer<typeof NewsItemSchema>;

const FetchNewsInputSchema = z.object({
  country: z.string().describe('The country for which to fetch national news. Use "Global" for worldwide news.'),
  city: z.string().optional().describe('The city for which to fetch local news.'),
  // Future enhancements: keywords, specific diseases, etc.
});
export type FetchNewsInput = z.infer<typeof FetchNewsInputSchema>;

const FetchNewsOutputSchema = z.object({
  nationalNews: z.array(NewsItemSchema).describe('A list of national or global news items.'),
  localNews: z.array(NewsItemSchema).describe('A list of local news items relevant to the specified city.'),
});
export type FetchNewsOutput = z.infer<typeof FetchNewsOutputSchema>;

// Mock function to simulate fetching news from an API or database
async function getMockNews(input: FetchNewsInput): Promise<FetchNewsOutput> {
  const today = new Date().toISOString();
  const yesterday = new Date(Date.now() - 86400000).toISOString();

  const nationalNews: NewsItem[] = [
    {
      title: `Global Health Update: New Guidelines Issued for Seasonal Flu - ${input.country}`,
      summary: 'The World Health Organization has released updated recommendations for the upcoming flu season, emphasizing vaccination for vulnerable groups.',
      source: 'World Health Organization (WHO)',
      date: today,
      url: 'https://example.com/who-flu-update',
    },
    {
      title: 'Research Highlights Advances in Rapid Diagnostic Testing',
      summary: 'A new study published in "The Lancet" shows promising results for next-generation rapid tests for common respiratory viruses.',
      source: 'The Lancet',
      date: yesterday,
      url: 'https://example.com/lancet-diagnostics',
    },
  ];

  let localNews: NewsItem[] = [];
  if (input.city) {
    localNews = [
      {
        title: `Health Advisory for ${input.city}: Increase in Norovirus Cases Reported`,
        summary: `The ${input.city} Department of Health advises residents to take extra precautions due to a recent uptick in norovirus infections.`,
        source: `${input.city} Department of Health`,
        date: today,
        url: `https://example.com/local-${input.city}-norovirus`,
      },
      {
        title: `Community Health Fair Announced in ${input.city} Next Weekend`,
        summary: `Join us for free health screenings and information sessions at the annual ${input.city} Community Health Fair.`,
        source: `${input.city} Community Council`,
        date: yesterday,
        url: `https://example.com/local-${input.city}-health-fair`,
      },
    ];
  }

  return { nationalNews, localNews };
}


export async function fetchNews(input: FetchNewsInput): Promise<FetchNewsOutput> {
  // In a real application, this flow would call a Genkit prompt or tool
  // to interact with actual news APIs or a database.
  // For now, we are directly returning mock data for simplicity.
  // The Genkit flow structure is here to show how it *could* be integrated.
  return fetchNewsFlow(input);
}

// This is a placeholder prompt definition. 
// In a real scenario, you might use a prompt to summarize news or classify it.
// Or, more likely, use a tool to call external news APIs.
const newsPrompt = ai.definePrompt({
  name: 'newsPrompt',
  input: { schema: FetchNewsInputSchema },
  output: { schema: FetchNewsOutputSchema },
  prompt: `
    You are a helpful assistant that provides news updates.
    Based on the input:
    Country: {{country}}
    City: {{city}}
    
    Find relevant national and local health news.
    (This prompt is a placeholder; the actual logic is in getMockNews for now)
  `,
});

const fetchNewsFlow = ai.defineFlow(
  {
    name: 'fetchNewsFlow',
    inputSchema: FetchNewsInputSchema,
    outputSchema: FetchNewsOutputSchema,
  },
  async (input) => {
    // Simulate fetching news. Replace with actual API calls or more complex logic.
    // const { output } = await newsPrompt(input); // This would call the LLM if prompt was complex
    // return output!;
    
    // For this example, we directly use our mock data function
    const mockData = await getMockNews(input);
    return mockData;
  }
);

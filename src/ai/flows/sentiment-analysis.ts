// Implements the Genkit flow for the SentimentAnalysisFeedback story.

'use server';

/**
 * @fileOverview Implements the sentiment analysis flow for user feedback.
 *
 * - analyzeSentiment - Analyzes the sentiment of user feedback.
 * - SentimentAnalysisInput - The input type for the analyzeSentiment function.
 * - SentimentAnalysisOutput - The return type for the analyzeSentiment function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SentimentAnalysisInputSchema = z.object({
  feedback: z
    .string()
    .describe('The feedback provided by the user about their experience with the app.'),
});
export type SentimentAnalysisInput = z.infer<typeof SentimentAnalysisInputSchema>;

const SentimentAnalysisOutputSchema = z.object({
  sentiment: z
    .string()
    .describe(
      'The sentiment of the feedback, can be positive, negative, or neutral, with a short explanation.'
    ),
  score: z.number().describe('A numerical score from -1 to 1 indicating the sentiment strength.'),
});
export type SentimentAnalysisOutput = z.infer<typeof SentimentAnalysisOutputSchema>;

export async function analyzeSentiment(input: SentimentAnalysisInput): Promise<SentimentAnalysisOutput> {
  return analyzeSentimentFlow(input);
}

const sentimentAnalysisPrompt = ai.definePrompt({
  name: 'sentimentAnalysisPrompt',
  input: {schema: SentimentAnalysisInputSchema},
  output: {schema: SentimentAnalysisOutputSchema},
  prompt: `You are an AI that analyzes the sentiment of user feedback.

  Analyze the sentiment of the following feedback and provide a sentiment analysis and a sentiment score. The sentiment score should be between -1 and 1, where -1 is very negative, 0 is neutral, and 1 is very positive.  Respond in JSON format.

  Feedback: {{{feedback}}}`,
});

const analyzeSentimentFlow = ai.defineFlow(
  {
    name: 'analyzeSentimentFlow',
    inputSchema: SentimentAnalysisInputSchema,
    outputSchema: SentimentAnalysisOutputSchema,
  },
  async input => {
    const {output} = await sentimentAnalysisPrompt(input);
    return output!;
  }
);

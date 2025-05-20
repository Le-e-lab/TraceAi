// src/ai/flows/risk-score-explanation.ts
'use server';
/**
 * @fileOverview Explains the risk score received by a user.
 *
 * - explainRiskScore - A function that provides an explanation of a user's risk score.
 * - ExplainRiskScoreInput - The input type for the explainRiskScore function.
 * - ExplainRiskScoreOutput - The return type for the explainRiskScore function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExplainRiskScoreInputSchema = z.object({
  riskScore: z.enum(['low', 'medium', 'high']).describe('The risk score to explain.'),
  contactFrequency: z
    .number()
    .describe('The frequency of contacts the user has had with other people.'),
  contactDuration: z
    .number()
    .describe('The duration of contacts the user has had with other people, in minutes.'),
  locationRiskLevel: z
    .enum(['low', 'medium', 'high'])
    .describe('The risk level of the locations the user has visited.'),
});
export type ExplainRiskScoreInput = z.infer<typeof ExplainRiskScoreInputSchema>;

const ExplainRiskScoreOutputSchema = z.object({
  explanation: z.string().describe('The explanation of the risk score.'),
});
export type ExplainRiskScoreOutput = z.infer<typeof ExplainRiskScoreOutputSchema>;

export async function explainRiskScore(input: ExplainRiskScoreInput): Promise<ExplainRiskScoreOutput> {
  return explainRiskScoreFlow(input);
}

const prompt = ai.definePrompt({
  name: 'explainRiskScorePrompt',
  input: {schema: ExplainRiskScoreInputSchema},
  output: {schema: ExplainRiskScoreOutputSchema},
  prompt: `You are an AI assistant that explains risk scores to users of a contact tracing app.

  The user received a risk score of {{riskScore}}. Explain the factors that contributed to this score, including contact frequency ({{contactFrequency}}), contact duration ({{contactDuration}} minutes), and location risk level ({{locationRiskLevel}}). Provide a clear and concise explanation so the user can understand the factors and take appropriate action.
  `,
});

const explainRiskScoreFlow = ai.defineFlow(
  {
    name: 'explainRiskScoreFlow',
    inputSchema: ExplainRiskScoreInputSchema,
    outputSchema: ExplainRiskScoreOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

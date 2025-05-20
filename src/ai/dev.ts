import { config } from 'dotenv';
config();

import '@/ai/flows/sentiment-analysis.ts';
import '@/ai/flows/risk-score-explanation.ts';
import '@/ai/flows/fetch-news-flow.ts'; // Added new news flow

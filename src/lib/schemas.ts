import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
});
export type LoginData = z.infer<typeof LoginSchema>;

export const SignupSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
  confirmPassword: z.string(),
  role: z.enum(['public', 'healthcare_worker'], { required_error: 'Please select a role.' }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match.",
  path: ['confirmPassword'],
});
export type SignupData = z.infer<typeof SignupSchema>;

export const SymptomReportSchema = z.object({
  symptoms: z.string().min(10, { message: 'Please describe your symptoms in at least 10 characters.' }),
  fever: z.boolean().default(false),
  cough: z.boolean().default(false),
  shortnessOfBreath: z.boolean().default(false),
  fatigue: z.boolean().default(false),
  lossOfTasteSmell: z.boolean().default(false),
  reportDate: z.date().default(() => new Date()),
});
export type SymptomReportData = z.infer<typeof SymptomReportSchema>;

export const FeedbackSchema = z.object({
  feedbackText: z.string().min(10, { message: 'Feedback must be at least 10 characters.' }),
  satisfaction: z.enum(['satisfied', 'neutral', 'dissatisfied']).optional(),
});
export type FeedbackData = z.infer<typeof FeedbackSchema>;

export const RiskScoreInputSchema = z.object({
  contactFrequency: z.coerce.number().min(0, "Contact frequency cannot be negative.").max(100, "Contact frequency seems too high."),
  contactDuration: z.coerce.number().min(0, "Contact duration cannot be negative.").max(1440, "Contact duration seems too high (max 24 hours)."), // Max 24 hours in minutes
  locationRiskLevel: z.enum(['low', 'medium', 'high'], { required_error: "Please select a location risk level." }),
});
export type RiskScoreInputData = z.infer<typeof RiskScoreInputSchema>;

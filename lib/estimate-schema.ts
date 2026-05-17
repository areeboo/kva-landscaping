import { z } from "zod";

export const estimateSchema = z.object({
  name: z.string().min(2, "Tell us your name.").max(80),
  address: z.string().max(200).optional().or(z.literal("")),
  phone: z
    .string()
    .min(10, "Phone needs at least 10 digits.")
    .max(20)
    .regex(/[0-9]{3}.*[0-9]{3}.*[0-9]{4}/, "Use a 10-digit US phone number."),
  email: z.string().email("That email doesn't look right.").optional().or(z.literal("")),
  services: z.array(z.string()).min(1, "Pick at least one service."),
  message: z.string().max(2000).optional().or(z.literal("")),
  website: z.string().max(0).optional().or(z.literal("")), // honeypot
});

export type EstimateInput = z.infer<typeof estimateSchema>;

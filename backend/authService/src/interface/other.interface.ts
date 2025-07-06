interface EmailOptions {
  email: string | string[]; // Single or multiple recipients
  subject: string;
  html: string; // Direct HTML body
}

export type { EmailOptions };

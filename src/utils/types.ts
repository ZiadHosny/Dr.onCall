export interface LangType {
  ar: string;
  en: string;
}

export type EmailData = {
  userEmail: string;
  subject: string;
  token: string;
};

export type EmailHtml = {
  token: string;
};

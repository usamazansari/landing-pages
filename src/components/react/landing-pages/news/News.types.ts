export interface News {
  status: string;
  news: NewsElement[];
  page: number;
}

export interface NewsElement {
  id: string;
  title: string;
  description: string;
  url: string;
  author: string;
  image: string;
  language: Language;
  category: Category[];
  published: string;
}

export enum Category {
  General = 'general',
  Politics = 'politics',
  World = 'world',
}

export enum Language {
  En = 'en',
}

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
  language: string;
  category: NewsCategory[];
  published: string;
}

export enum NewsCategory {
  Academia = 'academia',
  Business = 'business',
  Entertainment = 'entertainment',
  Finance = 'finance',
  Food = 'food',
  Game = 'game',
  General = 'general',
  Health = 'health',
  Lifestyle = 'lifestyle',
  Opinion = 'opinion',
  Politics = 'politics',
  Programming = 'programming',
  Regional = 'regional',
  Science = 'science',
  Sports = 'sports',
  Technology = 'technology',
  World = 'world',
}

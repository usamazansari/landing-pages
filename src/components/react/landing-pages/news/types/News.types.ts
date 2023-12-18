export interface INews {
  id: string;
  title: string;
  description: string;
  url: string;
  author: string;
  image: string;
  language: string;
  category: string[];
  published: string;
}

export interface INewsResponse {
  status: string;
  news: INews[];
  page: number;
}

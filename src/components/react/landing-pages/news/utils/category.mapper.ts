import { type INews } from '../types';

export const NewsCategoryMapper = (news: INews[]) => {
  return news.map(n => ({ ...n, category: n.category.map(c => c.toLowerCase().replace(/\s/g, '-')) }));
};

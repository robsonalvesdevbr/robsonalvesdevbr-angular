import { PublishNameEnum } from '@path-app/models/PublishNameEnum';

export interface IBook {
  title: string;
  subtitle: string;
  author: string[];
  publishName: PublishNameEnum;
  publishYear: number;
  tags: string[];
  bookUrl: string | undefined | null;
  pages: number;
  progress: number;
  favorite: boolean;
}

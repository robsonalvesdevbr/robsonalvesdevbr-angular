import { PublishNameEnum } from '@path-app/models/PublishNameEnum';
import { BookTagEnum } from '@path-app/models/BookTagEnum';

export interface IBook {
  id: string;
  title: string;
  subtitle: string;
  author: string[];
  publishName: PublishNameEnum;
  publishYear: number;
  tags: BookTagEnum[];
  bookUrl: string | undefined | null;
  pages: number;
  progress: number;
  favorite: boolean;
}

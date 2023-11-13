import { Navigation } from './navigation';

export interface Talk {
  title: string;
  description?: string;
  date?: string;
  urlList?: Navigation[];
  imageLink?: string;
}

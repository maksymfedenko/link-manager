import { Tag } from './Tag.model';

export interface TagOption {
  id: string | undefined | null;
  title: string;
  tags?: Tag[];
}

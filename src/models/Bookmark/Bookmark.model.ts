import { Tag } from '../Tag.model';
import { BookmarkComment } from './BookmarkComment.model';

export interface Bookmark {
  id: string;
  title: string;
  link: string;
  tags: Tag[];
  userId: string;
  bookmarkComments: BookmarkComment[];
}

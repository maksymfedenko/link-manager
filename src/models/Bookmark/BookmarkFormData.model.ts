import { SelectOption } from '../SelectOption.model';

export interface BookmarkFormData {
  link: string;
  title: string;
  tags: SelectOption[];
}

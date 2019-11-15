import { Tag } from 'src/models/Tag.model';

const tagsToSelectOptions = (tags: Tag[]) => {
  return tags.map((tag) => ({
    label: tag.title,
    value: tag.id,
  }));
};

export default tagsToSelectOptions;

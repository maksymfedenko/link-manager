import useFetchTags from 'src/hooks/useFetchTags';
import { useMemo } from 'react';
import { SelectOption } from 'src/models/SelectOption.model';
import { FieldInputProps } from 'formik';
import IntegratedSelect from './Select/IntegratedSelect';

const selectStyles = {
  menuList: () => ({
    maxHeight: '112px',
    overflow: 'auto',
  }),
};

const TagSelect: React.FC<FieldInputProps<any>> = (props) => {
  const [{ loading, data }] = useFetchTags();
  const tagsOptions: SelectOption<string>[] = useMemo(() => {
    if (!data) return [];

    return data.tags.map((tag) => ({
      label: tag.title,
      value: tag.id,
    }));
  }, [data]);

  return (
    <IntegratedSelect
      isMulti
      isLoading={loading}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      styles={selectStyles}
      label="Tags"
      options={tagsOptions}
      placeholder="Select tags"
    />
  );
};

export default TagSelect;

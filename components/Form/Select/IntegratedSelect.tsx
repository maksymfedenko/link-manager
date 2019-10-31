import NoSsr from '@material-ui/core/NoSsr';
import CreatableSelect from 'react-select/creatable';
import { CSSProperties } from 'react';
import { useTheme } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import {
  useSelectStyles,
  selectReplacedComponents,
  ReactSelectProps,
} from './SelectIntegration';

const IntegratedSelect: React.FC<ReactSelectProps> = ({ label, ...props }) => {
  const classes = useSelectStyles();
  const theme = useTheme<Theme>();

  const selectStyles = {
    input: (base: CSSProperties) => ({
      ...base,
      color: theme.palette.text.primary,
      '& input': {
        font: 'inherit',
      },
    }),
    ...(props.styles || {}),
  };

  return (
    <NoSsr>
      <CreatableSelect
        classes={classes}
        styles={selectStyles}
        TextFieldProps={{
          label,
          InputLabelProps: {
            shrink: true,
          },
        }}
        components={selectReplacedComponents}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
      />
    </NoSsr>
  );
};

export default IntegratedSelect;

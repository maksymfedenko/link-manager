import { Snackbar } from '@material-ui/core';
import { ApolloError } from 'apollo-client';
import { useMemo } from 'react';
import { SnackbarOrigin } from '@material-ui/core/Snackbar';

const anchorOrigin: SnackbarOrigin = {
  vertical: 'bottom',
  horizontal: 'left',
};

const parseError = (error: ToastrError): React.ReactNode => {
  if (typeof error === 'object' && (error as ApolloError).message) {
    return (error as ApolloError).message;
  }

  return error;
};

const Toastr: React.FC<Props> = ({ open, error }) => {
  const parsedError = useMemo(() => parseError(error), [error]);

  return (
    <Snackbar
      anchorOrigin={anchorOrigin}
      open={open}
      autoHideDuration={3000}
      message={parsedError}
    />
  );
};

type ToastrError = ApolloError | JSX.Element | string | undefined;

type Props = {
  open: boolean;
  error: ToastrError;
};

export default Toastr;

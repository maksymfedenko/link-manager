import {
  Dialog,
  Slide,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
} from '@material-ui/core';
import { Formik, Form, Field, ErrorMessage, FieldProps } from 'formik';
import { forwardRef, useCallback, useContext } from 'react';
import TagSelect from 'components/Form/TagSelect';
import { AuthContext } from 'src/contexts/AuthContext';
import { BookmarkFormData } from 'src/models/Bookmark/BookmarkFormData.model';
import { isEmpty, filter } from 'lodash';
import { BookmarkEditRequestData } from 'src/models/Bookmark/BookmarkEditRequestData.model';
// eslint-disable-next-line import/no-unresolved
import { TransitionProps } from '@material-ui/core/transitions/transition';

const Transition = forwardRef<unknown, TransitionProps>(function Transition(
  props,
  ref,
) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Slide direction="up" ref={ref} {...props} />;
});

const BookmarkFormDialog: React.FC<Props> = ({
  initialValues,
  isEdit,
  open,
  onClose,
  onSubmit,
}) => {
  const action = isEdit ? 'Edit' : 'Create';
  const { user } = useContext(AuthContext);

  const handleSubmit = useCallback(
    (values: BookmarkFormData) => {
      const formData: BookmarkEditRequestData = {
        userId: user!.sub,
        status: 'PUBLISHED',
        title: values.title,
        link: values.link,
      };

      if (!isEmpty(values.tags)) {
        formData.tags = {
          // eslint-disable-next-line no-underscore-dangle
          connect: filter(values.tags, (tag) => !tag.__isNew__).map((tag) => ({
            id: tag.value,
          })),
          create: filter(values.tags, '__isNew__').map((tag) => ({
            status: 'PUBLISHED',
            title: tag.value,
            userId: user!.sub,
          })),
        };
      }
      onSubmit(formData);
    },
    [onSubmit, user],
  );

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      fullWidth
      maxWidth="xs"
      onClose={onClose}
    >
      <DialogTitle>{action} Bookmark</DialogTitle>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form>
            <DialogContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Field name="tags">
                    {({ field, form }: FieldProps<any>) => (
                      <TagSelect
                        // eslint-disable-next-line react/jsx-props-no-spreading
                        {...field}
                        onChange={(newValue: any) =>
                          form.setFieldValue(field.name, newValue)
                        }
                      />
                    )}
                  </Field>
                  <ErrorMessage name="tags" component="div" />
                </Grid>
                <Grid item xs={12}>
                  <Field name="title">
                    {({ field }: FieldProps<string>) => (
                      <TextField
                        fullWidth
                        value={field.value}
                        inputProps={field}
                        label="Title"
                      />
                    )}
                  </Field>
                  <ErrorMessage name="title" component="div" />
                </Grid>
                <Grid item xs={12}>
                  <Field name="link">
                    {({ field }: FieldProps<string>) => (
                      <TextField
                        fullWidth
                        value={field.value}
                        inputProps={field}
                        label="Link"
                      />
                    )}
                  </Field>
                  <ErrorMessage name="link" component="div" />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button type="button" onClick={onClose} color="default">
                Cancel
              </Button>
              <Button color="primary" type="submit" disabled={isSubmitting}>
                {action}
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

type Props = {
  isEdit?: boolean;
  initialValues: BookmarkFormData;
  open: boolean;
  onClose: () => void;
  onSubmit: (values: BookmarkEditRequestData) => void;
};

export default BookmarkFormDialog;

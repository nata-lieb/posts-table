import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Grid from '@mui/material/Unstable_Grid2';
import { InputField } from 'components/inputField';
import { usePostHandlers } from 'hooks';
import { useForm } from 'react-hook-form';
import { InferType } from 'yup';

import { defaultValues, FIELD_NAMES, schema } from './constants';

type PostFormValues = InferType<typeof schema>;

interface PostModalFormProps {
  id?: number;
  initialValues?: PostFormValues | null;
  submitLabel?: string;
  onSuccess: () => void;
  onClose: () => void;
}

/**
 * Edit post form. It can be extended and reused for create action.
 */

function PostModalForm({
  id,
  initialValues,
  submitLabel = 'Submit',
  onSuccess,
  onClose,
}: PostModalFormProps): JSX.Element {
  const { updatePostMutation } = usePostHandlers();
  const { control, formState, handleSubmit } = useForm<PostFormValues>({
    mode: 'onChange',
    defaultValues: initialValues || defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields } = formState;

  const isSubmitDisabled =
    !Object.keys(dirtyFields).length ||
    !isValid ||
    updatePostMutation.isPending;

  const onSubmit = (data: PostFormValues) => {
    if (id === undefined) return console.log('Implement create handler');

    const formData = {
      id,
      title: data.title.trim(),
      body: data.body.trim(),
    };

    updatePostMutation.mutate(formData, {
      onSuccess: (data) => {
        // Here we can add notification toast
        console.log('Saved post', data);
        onSuccess();
        onClose();
      },
      onError(error) {
        window.alert(error.message || 'Unexpected error');
      },
    });
  };

  return (
    <form name="post-form" onSubmit={handleSubmit(onSubmit)}>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid xs={12}>
            <InputField
              name={FIELD_NAMES.title}
              control={control}
              label="Title"
              required
              fullWidth
              autoComplete="off"
            />
          </Grid>
          <Grid xs={12}>
            <InputField
              name={FIELD_NAMES.body}
              control={control}
              label="Body"
              required
              fullWidth
              autoComplete="off"
              multiline
              // https://github.com/mui/material-ui/issues/39105
              rows={4}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          aria-label={submitLabel}
          disabled={isSubmitDisabled}
        >
          {submitLabel}
        </Button>
      </DialogActions>
    </form>
  );
}

export default PostModalForm;

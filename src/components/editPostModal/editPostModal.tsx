import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import { PostData } from 'api';
import { PostModalForm } from 'components/postModalForm';

interface EditPostModalProps {
  data: PostData | null;
  open: boolean;
  handleClose: () => void;
  onSuccess: () => void;
  onExited: () => void;
}

const DIALOG_LABEL = 'edit post dialog';

function EditPostModal({
  data,
  open,
  handleClose,
  onExited,
  onSuccess,
}: EditPostModalProps): JSX.Element {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperComponent={Paper}
      aria-label={DIALOG_LABEL}
      TransitionProps={{ onExited }}
      maxWidth={'lg'}
    >
      <DialogTitle>Edit post {data?.id}</DialogTitle>
      <PostModalForm
        id={data?.id}
        submitLabel={'Update'}
        initialValues={data}
        onSuccess={onSuccess}
        onClose={handleClose}
      />
    </Dialog>
  );
}

export default EditPostModal;

import { render, screen } from 'test/test-utils';

import EditPostModal from './editPostModal';

const postData = {
  id: 1,
  title: 'Abc',
  body: 'Hello World',
  userId: 1,
};

describe('<EditPostModal />', () => {
  test('renders content if is open', async () => {
    const handleClose = jest.fn();
    const onSuccess = jest.fn();
    const onExited = jest.fn();
    const { unmount } = render(
      <EditPostModal
        data={postData}
        open={true}
        handleClose={handleClose}
        onSuccess={onSuccess}
        onExited={onExited}
      />,
    );

    expect(screen.getByLabelText('edit post dialog')).toBeInTheDocument();
    expect(screen.getByText('Edit post 1')).toBeInTheDocument();

    unmount();
  });

  test("doesn't render content if closed", () => {
    const handleClose = jest.fn();
    const onSuccess = jest.fn();
    const onExited = jest.fn();
    render(
      <EditPostModal
        data={postData}
        open={false}
        handleClose={handleClose}
        onSuccess={onSuccess}
        onExited={onExited}
      />,
    );
    expect(screen.queryByLabelText('edit post dialog')).not.toBeInTheDocument();
  });
});

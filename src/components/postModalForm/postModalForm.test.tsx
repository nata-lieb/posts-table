import userEvent from '@testing-library/user-event';
import { PostData, API_HANDLERS } from 'api';
import React from 'react';
import { render, screen, waitFor } from 'test/test-utils';

import PostModalForm from './postModalForm';

const initialValues = { title: 'Hello World', body: '123' };

jest.mock('api', () => {
  return {
    API_HANDLERS: {
      POSTS: {
        UPDATE: jest.fn(),
      },
    },
  };
});

describe('<PostModalForm />', () => {
  test('renders form with text fields and control buttons', async () => {
    const onSuccess = jest.fn();
    const onClose = jest.fn();

    const { unmount } = render(
      <PostModalForm id={1} onSuccess={onSuccess} onClose={onClose} />,
    );
    expect(screen.getByRole('textbox', { name: 'Title' })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Body' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();

    // https://github.com/orgs/react-hook-form/discussions/4232
    unmount();
  });

  test('renders text fields with default values if initial not provided', async () => {
    const onSuccess = jest.fn();
    const onClose = jest.fn();

    const { unmount } = render(
      <PostModalForm id={1} onSuccess={onSuccess} onClose={onClose} />,
    );
    expect(screen.getByRole('textbox', { name: 'Title' })).toHaveValue('');
    expect(screen.getByRole('textbox', { name: 'Body' })).toHaveValue('');

    unmount();
  });

  test('renders text fields with provided initial values', async () => {
    const onSuccess = jest.fn();
    const onClose = jest.fn();

    const { unmount } = render(
      <PostModalForm
        id={1}
        initialValues={initialValues}
        onSuccess={onSuccess}
        onClose={onClose}
      />,
    );
    expect(screen.getByRole('textbox', { name: 'Title' })).toHaveValue(
      initialValues.title,
    );
    expect(screen.getByRole('textbox', { name: 'Body' })).toHaveValue(
      initialValues.body,
    );

    unmount();
  });

  test('renders custom submit button text', async () => {
    const onSuccess = jest.fn();
    const onClose = jest.fn();

    const { unmount } = render(
      <PostModalForm
        id={1}
        submitLabel={'Update'}
        initialValues={initialValues}
        onSuccess={onSuccess}
        onClose={onClose}
      />,
    );
    expect(screen.getAllByRole('button')).toHaveLength(2);
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Update' })).toBeInTheDocument();

    unmount();
  });

  test('calls onClose handler on cancel button click', async () => {
    const onSuccess = jest.fn();
    const onClose = jest.fn();

    const { unmount } = render(
      <PostModalForm
        id={1}
        initialValues={initialValues}
        onSuccess={onSuccess}
        onClose={onClose}
      />,
    );
    userEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(onClose).toHaveBeenCalledTimes(1);

    unmount();
  });

  test('submit button is initially disabled', async () => {
    const onSuccess = jest.fn();
    const onClose = jest.fn();

    const { unmount } = render(
      <PostModalForm
        id={1}
        initialValues={initialValues}
        onSuccess={onSuccess}
        onClose={onClose}
      />,
    );
    expect(screen.getByRole('button', { name: 'Submit' })).toBeDisabled();

    unmount();
  });

  test('disables submit button on validation error', async () => {
    const onSuccess = jest.fn();
    const onClose = jest.fn();

    render(
      <PostModalForm
        id={1}
        initialValues={initialValues}
        onSuccess={onSuccess}
        onClose={onClose}
      />,
    );
    const submitButton = screen.getByRole('button', { name: 'Submit' });
    const input = screen.getByRole('textbox', { name: 'Body' });

    userEvent.type(input, '{Backspace}{Backspace}');
    await waitFor(() => expect(submitButton).not.toBeDisabled());

    userEvent.type(input, '{Backspace}');
    await waitFor(() => expect(submitButton).toBeDisabled());
  });

  test('calls both onClose and onSuccess handlers on successful submit', async () => {
    (API_HANDLERS.POSTS.UPDATE as jest.Mock).mockReturnValue(
      new Promise((resolve) => resolve({} as PostData)),
    );

    const onSuccess = jest.fn();
    const onClose = jest.fn();

    render(
      <PostModalForm
        id={1}
        initialValues={initialValues}
        onSuccess={onSuccess}
        onClose={onClose}
      />,
    );
    const submitButton = screen.getByRole('button', { name: 'Submit' });

    userEvent.type(screen.getByRole('textbox', { name: 'Body' }), 'A');
    await waitFor(() => expect(submitButton).not.toBeDisabled());

    userEvent.click(submitButton);
    await waitFor(() => expect(onSuccess).toHaveBeenCalledTimes(1));
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(API_HANDLERS.POSTS.UPDATE as jest.Mock).toHaveBeenCalledWith({
      ...initialValues,
      body: '123A',
      id: 1,
    });
  });

  test("doesn't call onClose and onSuccess handlers on submit error", async () => {
    const onSuccess = jest.fn();
    const onClose = jest.fn();
    jest.spyOn(window, 'alert').mockImplementation();
    (API_HANDLERS.POSTS.UPDATE as jest.Mock).mockRejectedValue({});

    render(
      <PostModalForm
        id={1}
        initialValues={initialValues}
        onSuccess={onSuccess}
        onClose={onClose}
      />,
    );
    const submitButton = screen.getByRole('button', { name: 'Submit' });

    userEvent.type(screen.getByRole('textbox', { name: 'Body' }), 'A');
    await waitFor(() => expect(submitButton).not.toBeDisabled());

    userEvent.click(submitButton);
    await waitFor(() =>
      expect(API_HANDLERS.POSTS.UPDATE as jest.Mock).toHaveBeenCalledWith({
        ...initialValues,
        body: '123A',
        id: 1,
      }),
    );
    expect(onClose).not.toHaveBeenCalled();
    expect(onSuccess).not.toHaveBeenCalled();
  });

  test('returns early from submit if id is not specified', async () => {
    const onSuccess = jest.fn();
    const onClose = jest.fn();
    (API_HANDLERS.POSTS.UPDATE as jest.Mock).mockRejectedValue({});

    const { unmount } = render(
      <PostModalForm onSuccess={onSuccess} onClose={onClose} />,
    );
    const submitButton = screen.getByRole('button', { name: 'Submit' });

    userEvent.type(screen.getByRole('textbox', { name: 'Body' }), 'A');
    userEvent.type(screen.getByRole('textbox', { name: 'Title' }), 'A');
    await waitFor(() => expect(submitButton).not.toBeDisabled());

    userEvent.click(submitButton);
    await waitFor(
      () =>
        expect(API_HANDLERS.POSTS.UPDATE as jest.Mock).not.toHaveBeenCalled(),
      { timeout: 10 },
    );
    expect(onClose).not.toHaveBeenCalled();
    expect(onSuccess).not.toHaveBeenCalled();

    unmount();
  });

  test('calls alert on submit error', async () => {
    const onSuccess = jest.fn();
    const onClose = jest.fn();
    const alertMock = jest.spyOn(window, 'alert').mockImplementation();
    const message = 'Something went wrong';
    (API_HANDLERS.POSTS.UPDATE as jest.Mock).mockRejectedValue({
      message,
    });

    render(
      <PostModalForm
        id={1}
        initialValues={initialValues}
        onSuccess={onSuccess}
        onClose={onClose}
      />,
    );
    const submitButton = screen.getByRole('button', { name: 'Submit' });

    userEvent.type(screen.getByRole('textbox', { name: 'Body' }), 'A');
    await waitFor(() => expect(submitButton).not.toBeDisabled());

    userEvent.click(submitButton);
    await waitFor(() =>
      expect(API_HANDLERS.POSTS.UPDATE as jest.Mock).toHaveBeenCalledWith({
        ...initialValues,
        body: '123A',
        id: 1,
      }),
    );
    expect(alertMock).toHaveBeenCalledWith(message);
  });
});

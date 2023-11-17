import { render, screen } from 'test/test-utils';

import LoadingStatus from './loadingStatus';

describe('<LoadingStatus />', () => {
  test('renders default message', () => {
    render(<LoadingStatus />);
    expect(screen.getByRole('status', { hidden: true })).toBeInTheDocument();
    expect(screen.getByText('No data to show')).toBeInTheDocument();
    expect(screen.getByLabelText('No data')).toBeInTheDocument();
  });

  test('renders custom message', () => {
    const message = 'My message';
    render(<LoadingStatus message={message} />);
    expect(screen.getByText(message)).toBeInTheDocument();
    expect(screen.getByLabelText('No data')).toBeInTheDocument();
  });

  test('renders loading status', () => {
    render(<LoadingStatus isLoading />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.getByLabelText('Loading')).toBeInTheDocument();
  });

  test('renders error status', () => {
    render(<LoadingStatus isError />);
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
    expect(screen.getByText('No data to show')).toBeInTheDocument();
    expect(screen.getByLabelText('Error')).toBeInTheDocument();
  });
});

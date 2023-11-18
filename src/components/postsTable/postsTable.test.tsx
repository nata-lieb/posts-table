import userEvent from '@testing-library/user-event';
import { render, screen } from 'test/test-utils';

import PostsTable from './postsTable';

const postsData = [
  {
    userId: 101,
    id: 1,
    title: 'title1',
    body: 'body1',
  },
  {
    userId: 102,
    id: 2,
    title: 'title2',
    body: 'body2',
  },
  {
    userId: 103,
    id: 3,
    title: 'title3',
    body: 'body3',
  },
  {
    userId: 104,
    id: 4,
    title: 'title4',
    body: 'body4',
  },
  {
    userId: 105,
    id: 5,
    title: 'title5',
    body: 'body5',
  },
];

describe('<PostsTable />', () => {
  test('renders table with data', () => {
    const handleEdit = jest.fn();
    render(<PostsTable data={[postsData[0]]} handleEdit={handleEdit} />);
    expect(screen.getByText('101')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('title1')).toBeInTheDocument();
    expect(screen.getByText('body1')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('renders styled id values', () => {
    const handleEdit = jest.fn();
    render(<PostsTable data={postsData} handleEdit={handleEdit} />);
    expect(screen.getByText('title4')).not.toHaveStyle(`
    font-style: italic;
  `);
    expect(screen.getByText('title5')).toHaveStyle(`
      font-style: italic;
    `);
  });

  test('handleEdit is called on button click', async () => {
    const handleEdit = jest.fn();
    render(<PostsTable data={[postsData[0]]} handleEdit={handleEdit} />);
    userEvent.click(screen.getByLabelText('Edit'));
    expect(handleEdit).toHaveBeenCalledTimes(1);
  });
});

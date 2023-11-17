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
    render(<PostsTable data={[postsData[0]]} />);
    expect(screen.getByText('101')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('title1')).toBeInTheDocument();
    expect(screen.getByText('body1')).toBeInTheDocument();
  });

  test('renders styled id values', () => {
    render(<PostsTable data={postsData} />);
    expect(screen.getByText('4')).not.toHaveStyle(`
    font-style: italic;
  `);
    expect(screen.getByText('5')).toHaveStyle(`
      font-style: italic;
    `);
  });
});

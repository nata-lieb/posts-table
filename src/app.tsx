import Container, { ContainerProps } from '@mui/material/Container';
import { css, styled } from '@mui/material/styles';
import { LoadingStatus } from 'components/loadingStatus';
import { PostsTable } from 'components/postsTable';
import { useSearchPostsQuery } from 'hooks';
import React from 'react';

const Main = styled(Container)<ContainerProps>`
  ${({ theme }) => css`
    max-height: 100vh;
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing(2)};

    ${theme.breakpoints.up('md')} {
      padding-bottom: ${theme.spacing(2)};
    }
  `}
`;

function App() {
  const { data, isLoading, isError } = useSearchPostsQuery();

  return (
    <Main component="main">
      <div>Posts</div>
      <div>Search</div>
      {data?.length ? (
        <PostsTable data={data} />
      ) : (
        <LoadingStatus isLoading={isLoading} isError={isError} />
      )}
    </Main>
  );
}

export default App;

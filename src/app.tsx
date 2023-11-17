import Container, { ContainerProps } from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { css, styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { LoadingStatus } from 'components/loadingStatus';
import { PostsTable } from 'components/postsTable';
import { SearchInput } from 'components/searchInput';
import { useSearchPostsQuery } from 'hooks';
import React, { useState } from 'react';

const Main = styled(Container)<ContainerProps>`
  ${({ theme }) => css`
    max-height: 100vh;
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing(2)};
    padding-bottom: ${theme.spacing(2)};
  `}
`;

function App() {
  const [search, setSearch] = useState('');
  const { data, isLoading, isError } = useSearchPostsQuery(search);

  console.log(search);

  return (
    <Main component="main">
      <Typography variant="h6" sx={{ marginTop: 2 }}>
        Posts
      </Typography>
      <Paper sx={{ padding: 2 }} elevation={0}>
        <SearchInput label="Search by title" onChange={setSearch} />
      </Paper>
      {data?.length ? (
        <PostsTable data={data} />
      ) : (
        <LoadingStatus isLoading={isLoading} isError={isError} />
      )}
    </Main>
  );
}

export default App;

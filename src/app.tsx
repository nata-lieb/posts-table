import Container, { ContainerProps } from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { css, styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { PostData } from 'api';
import { EditPostModal } from 'components/editPostModal';
import { LoadingStatus } from 'components/loadingStatus';
import { PostsTable } from 'components/postsTable';
import { SearchInput } from 'components/searchInput';
import { useSearchPostsQuery } from 'hooks';
import React, { useCallback, useState } from 'react';

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
  const { data, isLoading, isError, refetch } = useSearchPostsQuery(search);

  const [postData, setPostData] = useState<PostData | null>(null);
  const resetPostData = () => setPostData(null);

  const [openEdit, setOpenEdit] = useState(false);
  const handleCloseEdit = () => setOpenEdit(false);
  const handleOpenEdit = useCallback((data: PostData) => {
    setPostData(data);
    setOpenEdit(true);
  }, []);

  return (
    <Main component="main">
      <Typography variant="h6" sx={{ marginTop: 2 }}>
        Posts
      </Typography>
      <Paper sx={{ padding: 2 }}>
        <SearchInput label="Search by title" onChange={setSearch} />
      </Paper>
      {data?.length ? (
        <PostsTable data={data} handleEdit={handleOpenEdit} />
      ) : (
        <LoadingStatus isLoading={isLoading} isError={isError} />
      )}
      <EditPostModal
        data={postData}
        open={openEdit}
        handleClose={handleCloseEdit}
        // Here an optimistic update can be implemented, but I prefer refetch
        onSuccess={refetch}
        onExited={resetPostData}
      />
    </Main>
  );
}

export default App;

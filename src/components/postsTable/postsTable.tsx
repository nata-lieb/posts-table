import Paper from '@mui/material/Paper';
import { SxProps, Theme } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { PostData } from 'api';
import { memo } from 'react';

interface PostsTableProps {
  data: PostData[];
}

interface Column {
  id: keyof PostData;
  label: string;
  minWidth?: number;
  align?: 'right';
  getStyle?: (value: number) => SxProps<Theme>;
}

const columns: readonly Column[] = [
  {
    id: 'id',
    label: 'Id',
    minWidth: 80,
    align: 'right',
    getStyle: (value: number) => ({
      fontStyle: value === 5 ? 'italic' : null,
    }),
  },
  { id: 'title', label: 'Title', minWidth: 200 },
  {
    id: 'body',
    label: 'Body',
    minWidth: 170,
  },
  {
    id: 'userId',
    label: 'User Id',
    minWidth: 80,
    align: 'right',
  },
];

function PostsTable({ data }: PostsTableProps): JSX.Element {
  return (
    <TableContainer sx={{ width: '100%' }} component={Paper}>
      <Table stickyHeader aria-label="Posts table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.id}
                align={column.align}
                style={{ minWidth: column.minWidth }}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => {
            return (
              <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                {columns.map((column) => {
                  const value = row[column.id];
                  return (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      sx={column.getStyle?.(row.id)}
                    >
                      {value}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const MemoisePostsTable = memo(PostsTable);
MemoisePostsTable.displayName = 'PostsTable';
export default MemoisePostsTable;

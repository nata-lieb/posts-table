import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import { SxProps, Theme } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { TableCellProps } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import { PostData } from 'api';
import { memo } from 'react';
import { createPrimeChecker } from 'utils';

const isPrime = createPrimeChecker();

interface PostsTableProps {
  data: PostData[];
  handleEdit: (item: PostData) => void;
}

interface Column {
  id: keyof PostData | 'edit';
  label: string;
  minWidth?: number;
  align?: TableCellProps['align'];
  getStyle?: (value: number) => SxProps<Theme>;
}

const columns: readonly Column[] = [
  {
    id: 'id',
    label: 'Id',
    minWidth: 80,
    align: 'right',
    getStyle: (value: number) => ({
      fontStyle: isPrime(value) ? 'italic' : null,
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
  {
    id: 'edit',
    label: '',
    minWidth: 60,
    align: 'center',
  },
];

function PostsTable({ data, handleEdit }: PostsTableProps): JSX.Element {
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
                  return (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      sx={column.getStyle?.(row.id)}
                    >
                      {column.id === 'edit' ? (
                        <Tooltip title={'Edit'} placement="top">
                          <IconButton
                            size="small"
                            color="primary"
                            onClick={() => handleEdit(row)}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                      ) : (
                        row[column.id]
                      )}
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

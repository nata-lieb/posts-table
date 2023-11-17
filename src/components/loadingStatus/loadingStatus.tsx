import BlockIcon from '@mui/icons-material/Block';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { css, styled } from '@mui/system';

interface LoadingStatusProps {
  message?: string;
  isLoading?: boolean;
  isError?: boolean;
  isPlain?: boolean;
}

const StyledPaper = styled(Paper)`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    padding: ${theme.spacing(2)};
  `}
`;

function LoadingStatus({
  message = 'No data to show',
  isLoading = false,
  isError = false,
  isPlain = false,
}: LoadingStatusProps): JSX.Element {
  return (
    <StyledPaper
      elevation={isPlain ? 0 : 1}
      role="status"
      aria-label={isLoading ? 'Loading' : isError ? 'Error' : 'No data'}
    >
      {isLoading ? (
        <CircularProgress size={24} color="warning" sx={{ mr: 1 }} />
      ) : (
        <BlockIcon color={isError ? 'error' : 'disabled'} sx={{ mr: 1 }} />
      )}
      <Typography color={!isLoading && isError ? 'error.main' : 'GrayText'}>
        {isLoading ? 'Loading...' : message}
      </Typography>
    </StyledPaper>
  );
}

export default LoadingStatus;

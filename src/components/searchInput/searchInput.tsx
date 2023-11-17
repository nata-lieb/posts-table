import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { ChangeEventHandler, useRef } from 'react';

interface SearchInputProps {
  label?: string;
  debounceTimeout?: number;
  onChange: (value: string) => void;
}

function SearchInput({
  label = 'Search',
  debounceTimeout = 200,
  onChange,
}: SearchInputProps): JSX.Element {
  const timerRef = useRef<number>();

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = window.setTimeout(() => {
      onChange(event.target.value);
    }, debounceTimeout);
  };

  return (
    <TextField
      label={label}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      variant="outlined"
      size="small"
      onChange={handleChange}
    />
  );
}

export default SearchInput;

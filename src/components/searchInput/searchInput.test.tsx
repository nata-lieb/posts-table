import userEvent from '@testing-library/user-event';
import { act, render, screen, waitFor } from 'test/test-utils';

import SearchInput from './searchInput';

describe('<SearchInput />', () => {
  test('renders input', () => {
    const handleChange = jest.fn();
    render(<SearchInput onChange={handleChange} />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  test('renders with default label', () => {
    const handleChange = jest.fn();
    render(<SearchInput onChange={handleChange} />);
    expect(screen.getByLabelText('Search')).toBeInTheDocument();
  });

  test('renders with custom label', () => {
    const handleChange = jest.fn();
    const label = 'Test label';
    render(<SearchInput onChange={handleChange} label={label} />);
    expect(screen.getByLabelText(label)).toBeInTheDocument();
  });

  test('calls onChange callback with debounce', async () => {
    const handleChange = jest.fn();
    render(<SearchInput onChange={handleChange} />);

    // Microtasks (setTimeout) in the component cause 'not wrapped in act' warning
    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => userEvent.type(screen.getByRole('textbox'), 'A'));
    // It won't be called immediately since default delay is 200ms
    expect(handleChange).not.toHaveBeenCalledWith('A');
    await waitFor(() => expect(handleChange).toHaveBeenCalledWith('A'), {
      timeout: 300,
    });
  });

  test('calls onChange callback with custom debounce', async () => {
    const handleChange = jest.fn();
    render(<SearchInput onChange={handleChange} debounceTimeout={50} />);

    // Microtasks (setTimeout) in the component cause 'not wrapped in act' warning
    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => userEvent.type(screen.getByRole('textbox'), 'A'));
    // It won't be called immediately since the delay is set to 50ms
    expect(handleChange).not.toHaveBeenCalledWith('A');
    await waitFor(() => expect(handleChange).toHaveBeenCalledWith('A'), {
      timeout: 100,
    });
  });

  test('debounces onChange handler properly', async () => {
    const handleChange = jest.fn();
    render(<SearchInput onChange={handleChange} debounceTimeout={50} />);

    // Microtasks (setTimeout) in the component cause 'not wrapped in act' warning
    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      userEvent.type(screen.getByRole('textbox'), 'Abc', { delay: 25 });
    });

    await waitFor(() => expect(handleChange).toHaveBeenCalledTimes(1), {
      timeout: 400,
    });
    expect(handleChange).toHaveBeenCalledWith('Abc');
  });
});

import userEvent from '@testing-library/user-event';
import React from 'react';
import { useForm, Resolver } from 'react-hook-form';
import { render, screen, waitFor } from 'test/test-utils';

import InputField from './inputField';

type TestFormData = {
  name?: string;
};

const validateResolver: Resolver<TestFormData> = (values: TestFormData) => {
  if (values.name === 'John')
    return {
      values,
      errors: {},
    };
  return {
    values: {},
    errors: {
      name: { message: 'Invalid name' },
    },
  };
};

const TestForm = ({ defaultValue = '' }: { defaultValue?: string }) => {
  const { control, handleSubmit } = useForm<TestFormData>({
    mode: 'onChange',
    defaultValues: { name: defaultValue },
    resolver: validateResolver,
  });

  const onSubmit = jest.fn();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputField name="name" label="Enter name" control={control} />
    </form>
  );
};

describe('<InputField />', () => {
  test('renders an input field', () => {
    render(<TestForm />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  test('renders an input field with a typed value', async () => {
    render(<TestForm />);
    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'John', { delay: 1 });
    expect(input).toHaveValue('John');
  });

  test('renders an invalid field if validation fails', async () => {
    render(<TestForm />);
    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'M{Enter}', { delay: 1 });
    await waitFor(() => expect(input).toBeInvalid());
    const errorMessage = await screen.findByText('Invalid name');
    expect(errorMessage).toBeInTheDocument();
  });
});

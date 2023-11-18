import TextField, { TextFieldProps } from '@mui/material/TextField';
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';

type InputFieldProps<
  FormFieldValues extends FieldValues,
  FieldName extends FieldPath<FormFieldValues>,
> = { name: FieldName; control: Control<FormFieldValues> } & TextFieldProps;

function InputField<
  FormFieldValues extends FieldValues,
  FieldName extends FieldPath<FormFieldValues>,
>({
  name,
  control,
  type = 'text',
  variant = 'outlined',
  ...props
}: InputFieldProps<FormFieldValues, FieldName>): JSX.Element {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          type={type}
          variant={variant}
          error={!!fieldState.error}
          helperText={fieldState.error?.message}
          {...props}
        />
      )}
    />
  );
}

export default InputField;

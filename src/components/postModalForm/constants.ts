import * as yup from 'yup';

export const FIELD_NAMES = {
  title: 'title',
  body: 'body',
} as const;

export const schema = yup.object().shape({
  [FIELD_NAMES.title]: yup.string().required('Title is required'),
  [FIELD_NAMES.body]: yup.string().required('Body is required'),
});

export const defaultValues = {
  [FIELD_NAMES.title]: '',
  [FIELD_NAMES.body]: '',
};

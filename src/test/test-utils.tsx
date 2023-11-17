import {
  render as rtlRender,
  RenderOptions,
  RenderResult,
} from '@testing-library/react';
import * as React from 'react';

import AppWrapper from '../appWrapper';

function render(
  ui: React.ReactElement,
  options: Omit<RenderOptions, 'queries'> = {},
): RenderResult {
  return rtlRender(ui, {
    wrapper: AppWrapper as React.FunctionComponent,
    ...options,
  });
}

export * from '@testing-library/react';
// Override React Testing Library's render with our own
export { render };

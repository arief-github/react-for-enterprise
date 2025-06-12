import { render, RenderOptions } from '@testing-library/react';
import '@/index.css';
import React from 'react';

export type AllTheProviderProps<P> = P & { children: React.ReactNode };

const AllTheProviders = <P extends Record<string, unknown>>({
  children,
}: AllTheProviderProps<P>) => {
  return <>{children}</>;
};
const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'queries'>
) => render(ui, { wrapper: AllTheProviders, ...options });
export * from '@testing-library/react';
export { customRender as render };

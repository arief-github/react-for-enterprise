declare module '@testing-library/jest-dom/matchers' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  import type { Expect } from 'vitest';
  import type matchers from '@testing-library/jest-dom/types/matchers';

  const customMatchers: typeof matchers;
  export default customMatchers;
}

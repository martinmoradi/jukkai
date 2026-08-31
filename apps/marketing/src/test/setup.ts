import '@testing-library/jest-dom/vitest';

import { afterEach, vi } from 'vitest';

afterEach(() => {
  // Tests that opt out of jsdom (`@vitest-environment node`) have no document.
  if (typeof document !== 'undefined') {
    document.body.innerHTML = '';
  }

  vi.restoreAllMocks();
});

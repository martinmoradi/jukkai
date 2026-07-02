import { getByRole } from '@testing-library/dom';
import { describe, expect, it } from 'vitest';

import { formatPageTitle } from './page-title';

describe('formatPageTitle', () => {
  it('keeps the site name uncluttered for the homepage', () => {
    expect(formatPageTitle('Jukkai')).toBe('Jukkai');
  });

  it('adds the site name to named pages', () => {
    document.body.innerHTML = `<main><h1>${formatPageTitle('Accueil')}</h1></main>`;

    expect(
      getByRole(document.body, 'heading', { name: 'Accueil | Jukkai' }),
    ).toBeInTheDocument();
  });
});

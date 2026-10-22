import { getInitialLang } from './initial-lang';

describe('getInitialLang', () => {
  const base = { cultureLang: 'en-US', defaultLang: 'en' };

  it('should prefer the cached language over the browser language', () => {
    expect(getInitialLang({ ...base, cachedLang: 'en', browserLang: 'fr' })).toBe('en');
  });

  it('should follow the browser language on a first visit', () => {
    expect(getInitialLang({ ...base, cachedLang: null, browserLang: 'fr' })).toBe('fr');
  });

  it('should fall back to the default language when the browser language is unsupported', () => {
    expect(getInitialLang({ ...base, cachedLang: null, browserLang: 'de' })).toBe('en');
  });

  it('should fall back to the default language when no browser language is known', () => {
    expect(getInitialLang({ ...base, cachedLang: null })).toBe('en');
  });

  it('should ignore an unsupported cached value and use the browser language', () => {
    expect(getInitialLang({ ...base, cachedLang: 'de', browserLang: 'fr' })).toBe('fr');
  });
});

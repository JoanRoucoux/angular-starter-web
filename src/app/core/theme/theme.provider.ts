import { EnvironmentProviders, inject, provideAppInitializer } from '@angular/core';

import { ThemeService } from '@core/theme/theme';

/**
 * Instantiates ThemeService at bootstrap so its effect applies the persisted
 * theme even though no component injects it (the host portal drives the theme).
 */
export const provideTheme = (): EnvironmentProviders => provideAppInitializer(() => void inject(ThemeService));

import { ReactElement } from 'react';

export type AppConfig = {
  apiHost: string,
  apiPort: string,
  apiPaths: {
    moviesPath: string,
    movieShowingsPath: string,
    movieBookingPath: string,
  }
}

export type ConfigObject = {
  key: string
  value: unknown 
};

export type ConfigContextState = {
  configs: AppConfig;
};

export type ProviderPorps = {
  configJson: AppConfig,
  children: ReactElement
}
import { createContext } from 'react';
import { ConfigContextState } from './types';

const contextDefaultValues: ConfigContextState = {
  configs: {
    apiHost: '',
    apiPort: '',
    apiPaths: {
      moviesPath: '',
      movieShowingsPath: '',
      movieBookingPath: '',
    }
  }
};

const ConfigContext = createContext<ConfigContextState>(
  contextDefaultValues
);

export default ConfigContext;
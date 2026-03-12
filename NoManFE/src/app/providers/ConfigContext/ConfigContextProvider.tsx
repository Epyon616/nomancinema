import { useState, FC } from 'react';
import { ProviderPorps, AppConfig } from './types';
import ConfigContext from './ConfigContext';

const ConfigsProvider: FC<ProviderPorps> = (props) => {
  const [configs] = useState<AppConfig>(props.configJson);

  return (
    <ConfigContext.Provider value={{configs}}>
      {props.children}
    </ConfigContext.Provider>
  );
};
export default ConfigsProvider;
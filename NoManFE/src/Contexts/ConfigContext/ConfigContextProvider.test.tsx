import { render } from '@testing-library/react';
import { useContext } from 'react';
import ConfigContext from './ConfigContext';
import ConfigsProvider from './ConfigContextProvider';
import configData from '../../../config/config.json';

const TestComponent = () => {
  const { configs } = useContext(ConfigContext);
  return (
    <>
      <p data-testid="host">{configs.apiHost}</p>
      <p data-testid="port">{configs.apiPort}</p>
    </>
  )
};

describe('<ConfigProvider />', () => {
  test('provides the expected config to child elements', () => {
    const { getByTestId } = render(
      <ConfigsProvider configJson={configData}>
        <TestComponent />
      </ConfigsProvider>,
    );
    
    const name = getByTestId('host');
    const domain = getByTestId('port');

    expect(name.textContent).toEqual(configData.apiHost);
    expect(domain.textContent).toEqual(configData.apiPort);
  });
});
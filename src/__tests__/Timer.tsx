import { cleanup, render } from '@testing-library/react';
import { Timer } from '../components/Timer';

describe('<Timer/>', () => {
  afterEach(cleanup);
  const pros = {name: 'Test', totalTime: 1000};
  it('should render timer in running state', () => {
    const component = <Timer runnable={true} time={100} {...pros}/>;
    const { getByText } = render(component);
    expect(() => {
      getByText("Pause");
    }).not.toThrow();
    expect(() => {
      getByText("Run");
    }).toThrow();
  });
  it('should render timer in paused state', () => {
    const component = <Timer runnable={false} time={100} {...pros}/>;
    const { getByText } = render(component);
    expect(() => {
      getByText("Run");
    }).not.toThrow();
    expect(() => {
      getByText("Pause");
    }).toThrow();
  });
});

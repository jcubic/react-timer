import { useState } from 'react';
import { cleanup, render, act } from '@testing-library/react';

import { Timer } from '../components/Timer';

describe('<Timer/>', () => {

  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
    cleanup();
  });

  const props = { name: 'Test', totalTime: 1000 };

  it('should render timer in running state', () => {
    const component = <Timer runnable={true} time={100} {...props}/>;
    const { getByText } = render(component);
    expect(() => {
      getByText("Pause");
    }).not.toThrow();
    expect(() => {
      getByText("Run");
    }).toThrow();
  });

  it('should render timer in paused state', () => {
    const component = <Timer runnable={false} time={100} {...props}/>;
    const { getByText } = render(component);
    expect(() => {
      getByText("Run");
    }).not.toThrow();
    expect(() => {
      getByText("Pause");
    }).toThrow();
  });

  it('should countdown to zero', async () => {
    const onEnd = jest.fn();
    const TimerWrapper = () => {
      const [time, setTime] = useState(1000);
      const onProgress = (time: number) => {
        act(() => setTime(time));
      };
      return (
        <Timer
          runnable={true}
          time={time}
          onEnd={onEnd}
          onProgress={onProgress}
          {...props}
        />
      );
    };
    const { getByText } = render(<TimerWrapper/>);
    jest.advanceTimersByTime(2000);
    expect(onEnd).toHaveBeenCalled();
    expect(() => {
      getByText("00:00:00.0");
    }).not.toThrow();
  });
});

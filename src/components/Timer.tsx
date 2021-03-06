import { Component } from "react";

import type { TimerBaseT } from "./TimerEditor";
import { TimeFormatter } from "./TimeFormatter";

import "./Timer.css";

export type TimerT = TimerBaseT & {
  totalTime: number;
  runnable: boolean;
};

type TimerPropsT = TimerT & {
  onToggle?: (arg: boolean) => void;
  onProgress?: (arg: number) => void;
  onEnd?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
};

const INCREMENT = 100;

type TimerStateT = {
  timer: number | undefined;
};

export class Timer extends Component<TimerPropsT, TimerStateT> {
  timer: number | undefined;
  componentDidMount() {
    if (this.props.runnable) {
      this.start();
    } else {
      this.stop();
    }
  }
  componentWillUnmount() {
    this.stop();
  }
  toggle() {
    const running = !this.props.runnable;
    if (this.props.onToggle) {
      this.props.onToggle(running);
    }
    if (running) {
      this.start();
    } else {
      this.stop();
    }
  }
  start() {
    // strict mode run this code twice
    if (!this.timer) {
      this.timer = window.setInterval(() => {
        let time = this.props.time - INCREMENT;
        if (time < 0) {
          time = 0;
        }
        if (this.props.onProgress) {
          this.props.onProgress(time);
        }
        if (time === 0) {
          this.stop();
          if (this.props.onEnd) {
            this.props.onEnd();
          }
        }
      }, INCREMENT);
    }
  }
  stop() {
    clearInterval(this.timer);
    delete this.timer;
  }
  render() {
    const { name, time, runnable, totalTime, onEdit, onDelete } = this.props;
    return (
      <div className="timer box">
        <h2>{name}</h2>
        <div>
          <TimeFormatter time={time} />
        </div>
        <progress max={totalTime} value={totalTime - time} />
        <div className="buttons">
          {time === 0 ? (
            <button>DONE</button>
          ) : (
            <button onClick={() => this.toggle()}>
              {runnable ? "Pause" : "Run"}
            </button>
          )}
          <button onClick={onEdit}>Edit</button>
          <button onClick={onDelete}>Delete</button>
        </div>
      </div>
    );
  }
}

import { Component } from "react";

import { Timer, TimerT } from "./Timer";
import { TimerEditor } from "./TimerEditor";
import type { TimerBaseT } from "./TimerEditor";

type TimerStateT = TimerT & {
  id: number;
  editable: boolean;
  totalTime: number;
};

type AppStateT = {
  index: number;
  timers: Array<TimerStateT>;
};

export default class Timers extends Component<{}, AppStateT> {
  constructor(props: {}) {
    super(props);
    this.state = {
      index: 0,
      timers: []
    };
  }
  toggleRunning(index: number, runnable: boolean) {
    const timers = [...this.state.timers];
    timers[index] = { ...timers[index], runnable };
    this.setState({ timers });
  }
  addTimer(data: TimerBaseT) {
    const timers = [...this.state.timers];
    const time = data.time * 1000;
    const index = this.state.index + 1;
    timers.push({
      ...data,
      id: index,
      time: time,
      totalTime: time,
      editable: false,
      runnable: true
    });
    this.setState({ index, timers });
  }
  progress(index: number, time: number) {
    const timers = [...this.state.timers];
    timers[index] = { ...timers[index], time };
    this.setState({ timers });
  }
  stop(index: number) {
    const timers = [...this.state.timers];
    timers[index] = { ...timers[index], runnable: false, time: 0 };
    this.setState({ timers });
  }
  toggleEdit(index: number) {
    const timers = [...this.state.timers];
    timers[index] = { ...timers[index], editable: true, runnable: false };
    this.setState({ timers });
  }
  update(index: number, { time, ...data }: TimerBaseT) {
    const timers = [...this.state.timers];
    time *= 1000;
    timers[index] = {
      ...timers[index],
      time,
      totalTime: time,
      editable: false,
      ...data
    };
    this.setState({ timers });
  }
  delete(index: number) {
    const timers = [...this.state.timers];
    timers.splice(index, 1);
    this.setState({ timers });
  }
  render() {
    //console.log(this.state.timers);
    return (
      <>
        <TimerEditor
          key="editor"
          submitLabel="Add"
          onChange={(value) => this.addTimer(value)}
        />
        <br />
        <div>
          {this.state.timers.map((timer: TimerStateT, i: number) => {
            if (timer.editable) {
              return (
                <TimerEditor
                  key={"edit-" + timer.id}
                  onChange={(value) => this.update(i, value)}
                  name={timer.name}
                  time={timer.time / 1000}
                  submitLabel="Save"
                />
              );
            }
            return (
              <Timer
                key={timer.id}
                {...timer}
                onEdit={() => this.toggleEdit(i)}
                onDelete={() => this.delete(i)}
                onEnd={() => this.stop(i)}
                onProgress={(time: number) => this.progress(i, time)}
                onToggle={(run: boolean) => this.toggleRunning(i, run)}
              />
            );
          })}
        </div>
      </>
    );
  }
}

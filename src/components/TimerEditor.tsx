import { Component, FormEvent, SyntheticEvent } from "react";

import "./TimerEditor.css";

export type TimerBaseT = {
  name: string;
  time: number;
};

type onChangeT = (value: TimerBaseT) => void;

type TimerEditorT = {
  onChange: onChangeT;
  submitLabel: string;
  name?: string;
  time?: number;
};

export class TimerEditor extends Component<TimerEditorT, TimerBaseT> {
  private onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  private onChangeName: (event: SyntheticEvent<HTMLInputElement>) => void;
  private onChangeTime: (event: SyntheticEvent<HTMLInputElement>) => void;
  constructor(props: TimerEditorT) {
    super(props);
    console.log("constructor");
    this.state = {
      name: props.name ?? "",
      time: props.time ?? 0
    };
    this.onSubmit = (event) => {
      const { name, time } = this.state;
      event.preventDefault();
      props.onChange({ name, time });
    };
    this.onChangeName = (event) => {
      const name = event.currentTarget.value;
      this.setState({ name });
    };
    this.onChangeTime = (event) => {
      const time = +event.currentTarget.value;
      this.setState({ time });
    };
  }
  render() {
    return (
      <div className="editor box">
        <form onSubmit={this.onSubmit}>
          <div className="edtor-row">
            <label htmlFor="timer-name">Timer name</label>
            <input
              id="timer-name"
              defaultValue={this.props.name}
              onChange={this.onChangeName}
            />
          </div>
          <div className="edtor-row">
            <label htmlFor="time">Time in seconds</label>
            <input
              id="time"
              pattern="[0-9.]+"
              defaultValue={this.props.time}
              onChange={this.onChangeTime}
            />
          </div>
          <input type="submit" value={this.props.submitLabel} />
        </form>
      </div>
    );
  }
}

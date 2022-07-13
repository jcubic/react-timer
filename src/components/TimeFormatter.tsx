function padStart(num: number) {
  return num < 10 ? "0" + num : num;
}
function formatTime(duration: number) {
  const milliseconds = Math.floor((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
  const time: Array<number | string> = [hours, minutes, seconds].map(padStart);
  return time.join(":") + "." + milliseconds;
}
type TimeT = {
  time: number;
};

export function TimeFormatter({ time }: TimeT) {
  return <span>{formatTime(time)}</span>;
}

import type { Item } from "@/stores/radio";

export function getItemPlayedSeconds(item: Item): number {
  const now = +new Date();
  const start = +getItemTimeDate(item);

  let played = (now - start) / 1000;
  const duration = getDurationInSeconds(item.duration);

  if (played > duration) {
    while (played > duration) {
      played -= duration;
    }

    return played;
  }

  return played;
}

export function getItemPlayedTime(item: Item): string {
  const sec = getItemPlayedSeconds(item);

  let hours: string | number = Math.floor(sec / 3600);
  let minutes: string | number = Math.floor((sec - hours * 3600) / 60);
  let seconds: string | number = Math.round(sec - hours * 3600 - minutes * 60);

  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  return hours + ":" + minutes + ":" + seconds;
}

export function getPlayedPercentage(item: Item) {
  return (
    (getItemPlayedSeconds(item) / getDurationInSeconds(item.duration)) * 100
  );
}

export function getDurationInSeconds(duration: string): number {
  const [h, m, s] = duration.split(":").map((v) => Number(v));

  return h * 60 * 60 + m * 60 + s;
}

export function getItemTimeDate(item: Item): Date {
  return new Date(item.time);
}

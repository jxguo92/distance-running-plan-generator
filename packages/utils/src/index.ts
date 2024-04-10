interface Time {
  hours: number
  minutes: number
  seconds: number
}

const SECONDS_IN_MINUTE = 60
const MINUTES_IN_HOUR = 60
export const secondsToTime = (seconds: number): Time => {
  return {
    hours: Math.floor(seconds / (SECONDS_IN_MINUTE * MINUTES_IN_HOUR)),
    minutes: Math.floor(seconds / SECONDS_IN_MINUTE) % MINUTES_IN_HOUR,
    seconds: Math.floor(seconds % (SECONDS_IN_MINUTE * MINUTES_IN_HOUR)),
  }
}
export const timeToSeconds = ({ hours, minutes, seconds }: Time): number => {
  return (hours * MINUTES_IN_HOUR + minutes) * SECONDS_IN_MINUTE + seconds
}

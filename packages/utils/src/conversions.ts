import { Time } from './types'

const SECONDS_IN_MINUTE = 60
const MINUTES_IN_HOUR = 60
export const secondsToMinutes = (seconds: number): number => seconds / SECONDS_IN_MINUTE
export const minutesToSeconds = (minutes: number): number => minutes * SECONDS_IN_MINUTE
export const secondsToTime = (seconds: number): Time => {
  return {
    hours: Math.floor(seconds / (SECONDS_IN_MINUTE * MINUTES_IN_HOUR)),
    minutes: Math.floor(seconds / SECONDS_IN_MINUTE) % MINUTES_IN_HOUR,
    seconds: Math.floor(seconds % SECONDS_IN_MINUTE),
  }
}
export const timeToSeconds = ({ hours, minutes, seconds }: Time): number => {
  return (hours * MINUTES_IN_HOUR + minutes) * SECONDS_IN_MINUTE + seconds
}

const METERS_IN_KILOMETER = 1000
const METERS_IN_MILE = 1609
export const metersToKilometer = (meters: number): number => meters / METERS_IN_KILOMETER
export const metersToMILE = (meters: number): number => meters / METERS_IN_MILE

// speed is always in m/s
export const speedToPace = (speed: number): Time => {
  const secondsPerKilometer = METERS_IN_KILOMETER / speed
  return secondsToTime(secondsPerKilometer)
}
export const paceToSpeed = (pace: Time): number => {
  const secondsPerKilometer = timeToSeconds(pace)
  return METERS_IN_KILOMETER / secondsPerKilometer
}

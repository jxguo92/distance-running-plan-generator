export { Formula } from './vdot'

export interface Time {
  hours: number
  minutes: number
  seconds: number
}

const SECONDS_IN_MINUTE = 60
const MINUTES_IN_HOUR = 60
export const secondsToMinutes = (seconds: number): number => seconds / SECONDS_IN_MINUTE
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

const METERS_IN_KILOMETER = 1000
const METERS_IN_MILE = 1609
export const metersToKilometer = (meters: number): number => meters / METERS_IN_KILOMETER
export const metersToMILE = (meters: number): number => meters / METERS_IN_MILE

// speed is always in m/s
const speedToPace = (speed: number): Time => {
  const secondsPerKilometer = METERS_IN_KILOMETER / speed
  return secondsToTime(secondsPerKilometer)
}
const paceToSpeed = (pace: Time): number => {
  const secondsPerKilometer = timeToSeconds(pace)
  return METERS_IN_KILOMETER / secondsPerKilometer
}

type ArrayElementType<ArrayType> = ArrayType extends ReadonlyArray<infer T> ? T : never
export const RACE_TYPES = ['marathon', 'half', '10k', '5k', '3k', '1500'] as const
export type RaceType = ArrayElementType<typeof RACE_TYPES>
export const RACE_DISTANCES: Record<RaceType, number> = {
  marathon: 41195,
  half: 21097,
  '10k': 10000,
  '5k': 5000,
  '3k': 3000,
  '1500': 1500,
}

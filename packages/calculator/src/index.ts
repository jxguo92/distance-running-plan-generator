import {
  Formula,
  metersToKilometer, minutesToSeconds,
  RACE_DISTANCES,
  RACE_TYPES,
  RaceType,
  secondsToMinutes,
  secondsToTime,
  Time
} from 'utils/index'

export const getVDOT = (seconds: number, meters: number): number => {
  return Formula.getVDOT(meters, secondsToMinutes(seconds))
}

type RaceTimes = Record<RaceType, Time>
export const getEquivalentRaceTimesFromVdot = (vdot: number): RaceTimes => {
  return Object.fromEntries(RACE_TYPES
    .map(type => {
      const distance = RACE_DISTANCES[type]
      const timeInMinutes = Formula.getPredictedRaceTime(vdot, distance)
      return [type, secondsToTime(minutesToSeconds(timeInMinutes))]
    })) as RaceTimes
}
export const getEquivalentRaceTimes = (seconds: number, meters: number): RaceTimes => {
  const vdot = getVDOT(seconds, meters)
  return getEquivalentRaceTimesFromVdot(vdot)
}


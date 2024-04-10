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

type RacePaces = Record<RaceType, Time>
export const getEquivalentRacePacesFromVdot = (vdot: number): RacePaces => {
  return Object.fromEntries(RACE_TYPES
    .map(type => {
      const distance = RACE_DISTANCES[type]
      const timeInMinutes = Formula.getPredictedRaceTime(vdot, distance)
      return [type, secondsToTime(minutesToSeconds(timeInMinutes))]
    })) as RacePaces
}
export const getEquivalentRacePaces = (seconds: number, meters: number): RacePaces => {
  const vdot = getVDOT(seconds, meters)
  return getEquivalentRacePacesFromVdot(vdot)
}


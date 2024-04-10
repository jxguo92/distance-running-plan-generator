import {
  Formula,
  minutesToSeconds,
  RACE_DISTANCES,
  RACE_TYPES,
  RaceType,
  secondsToMinutes,
  secondsToTime, speedToPace,
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

type RacePaces = Record<RaceType, Time>
export const getEquivalentRacePacesFromVdot = (vdot: number): RacePaces => {
  return Object.fromEntries(RACE_TYPES
    .map(type => {
      const distance = RACE_DISTANCES[type]
      const timeInMinutes = Formula.getPredictedRaceTime(vdot, distance)
      const timeInSeconds = minutesToSeconds(timeInMinutes)
      const speed = distance / timeInSeconds
      const pace = speedToPace(speed)
      return [type, pace]
    })) as RaceTimes
}
export const getEquivalentRacePaces = (seconds: number, meters: number): RacePaces => {
  const vdot = getVDOT(seconds, meters)
  return getEquivalentRacePacesFromVdot(vdot)
}

export const getEquivalentRacePace = (vdot: number, type: RaceType): Time => {
  const distance = RACE_DISTANCES[type]
  const timeInMinutes = Formula.getPredictedRaceTime(vdot, distance)
  const timeInSeconds = minutesToSeconds(timeInMinutes)
  const speed = distance / timeInSeconds
  return speedToPace(speed)
}

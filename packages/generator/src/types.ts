import { RaceType, Time, WorkoutType } from 'utils/index'

interface Race {
  type: RaceType
  time: Time
}
interface Progression {
  workoutPace: boolean
  coreWorkoutDistance: boolean
}
type PaceCustomization = 'slower' | 'default' | 'faster'
interface Customization {
  paces: Record<WorkoutType, PaceCustomization>
  progression: Progression
}
export interface GeneratorOptions {
  trainingWeeks: number
  target: {
    race: Race
    weeklyDistance: number
  }
  current: {
    race: Race
    weeklyDistance: number
  }

  // TODO
  customization?: Customization
}

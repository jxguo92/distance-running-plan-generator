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

type TrainingPeriodType = 'introductory' | 'aerobic' | 'speed' | 'race'
export type Duration = {
  type: 'distance'
  distance: number
} | {
  type: 'time'
  time: number
}
type StepType = 'warmup' | 'cooldown' | 'training' | 'recovery'
export interface TrainingWorkoutStep {
  type: StepType
  pace: Time
  duration: Duration
}
export interface TrainingWorkout {
  workoutType: WorkoutType
  steps: TrainingWorkoutStep[]
}
export interface TrainingDay {
  workouts: TrainingWorkout[]
}
export interface TrainingWeek {
  days: [TrainingDay, TrainingDay, TrainingDay, TrainingDay, TrainingDay, TrainingDay, TrainingDay]
}
export interface TrainingPeriod {
  type: TrainingPeriodType
  weeks: TrainingWeek[]
}
export interface TrainingPlan {
  option: GeneratorOptions
  periods: TrainingPeriod[]
}

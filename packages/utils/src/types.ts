export interface Time {
  hours: number
  minutes: number
  seconds: number
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

export const WORKOUT_TYPES = ['easy', 'marathon', 'half', 'lactate', 'speed', 'vo2max'] as const
export type WorkoutType = ArrayElementType<typeof WORKOUT_TYPES>

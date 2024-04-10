import { GeneratorOptions } from './types'

export const generateTrainingPlan = (options: GeneratorOptions) => {
  validateOptions(options)
}

const validateOptions = (options: GeneratorOptions): void => {
  console.log(options)
}

import { ITartanPatternColors } from '@/client/models/profile.types'

export const generateRandomPattern =
  async (): Promise<ITartanPatternColors> => {
    return new Promise((resolve) => {
      const allowedValues = '0123456789abcdef'
      const numberOfColors = Math.floor(Math.random() * 5) + 2
      const numberOfSteps = Math.floor(Math.random() * 10) + numberOfColors
      const steps = []
      const colors = {}

      for (let i = 0; i < numberOfColors; i++) {
        let color = '#'
        for (let c = 0; c < 6; c++) {
          color += allowedValues.charAt(
            Math.floor(Math.random() * allowedValues.length),
          )
        }
        colors[color] = false
      }

      let previousColor = null
      for (let i = 0; i < numberOfSteps; i++) {
        const critical =
          numberOfSteps - i <=
          Object.values(colors).filter((value) => value).length
        let color
        let newColor = false
        let tries = 0
        do {
          if (tries > 10) {
            break
          }
          color =
            Object.keys(colors)[
              Math.floor(Math.random() * Object.keys(colors).length)
            ]
          newColor = !colors[color]
          colors[color] = true
          tries++
        } while (color === previousColor || (critical && !newColor))
        if (tries > 10) {
          continue
        }
        previousColor = color
        const size = Math.floor(Math.random() * 40) + 1
        steps.push({ color: color, size: size })
      }

      resolve(steps)
    })
  }

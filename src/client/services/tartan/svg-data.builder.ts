import svgBuilder from 'svg-builder'
import { CSS_COLORS } from './css-colors'

/* Convert Color objects to array of pixel sequence
   Example: Array with two Colors [ {color:'#fff', size:3}, {color:'#000', size:2} ] 
   becomes a sequence [ '#fff', '#fff', '#fff', '#000', '#000', '#000', '#fff', '#fff']
 */
const asSequence = (colors) => {
  const sequence = []
  for (let c = 0; c < colors.length; c++) {
    const color = colors[c]
    for (let i = 0; i < color.size; i++) {
      sequence.push(color.color)
    }
  }
  for (let c = colors.length - 2; c > 0; c--) {
    const color = colors[c]
    for (let i = 0; i < color.size; i++) {
      sequence.push(color.color)
    }
  }
  return sequence
}
/* Horrizontal seam filling */
const wFirstFill = (x, y, seamSize, fillStyle, strokeStyle, strokeWidth) => {
  return {
    x: (seamSize * x - y) * seamSize,
    y: y * seamSize,
    width: seamSize * seamSize,
    height: seamSize,
    fill: fillStyle,
    stroke: strokeStyle,
    'stroke-width': strokeWidth,
  }
}
/* Vertical seam filling */
const hFirstFill = (x, y, seamSize, fillStyle, strokeStyle, strokeWidth) => {
  return {
    x: x * seamSize,
    y: (seamSize * y - x + seamSize) * seamSize,
    width: seamSize,
    height: seamSize * seamSize,
    fill: fillStyle,
    stroke: strokeStyle,
    'stroke-width': strokeWidth,
  }
}

const isValidSeam = (seam, minWidth, minHeight, maxWidth, maxHeight) => {
  const x = seam.x
  const y = seam.y
  const w = seam.width
  const h = seam.height
  if (x + w < minWidth || x > maxWidth) return false
  if (y + h < minHeight || y > maxHeight) return false
  return true
}

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null
}

function rgbToHex(r, g, b) {
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
}

function parseColor(color) {
  if (color?.length && color.length === 4) {
    return hexToRgb(
      `#${color[1]}${color[1]}${color[2]}${color[2]}${color[3]}${color[3]}`,
    )
  } else if (CSS_COLORS[color]) {
    return CSS_COLORS[color]
  }
  return hexToRgb(color)
}

const toTone = (color, tone) => {
  const rgb = parseColor(color)
  if (!rgb) return color
  rgb['r'] = Math.round(rgb['r'] * tone)
  rgb['g'] = Math.round(rgb['g'] * tone)
  rgb['b'] = Math.round(rgb['b'] * tone)
  const hex = rgbToHex(rgb['r'], rgb['g'], rgb['b'])
  return hex
}

const getBuilder = (colors) => {
  let fillStyle = ''
  let strokeStyle = ''
  const strokeWidth = 0.25
  //const halfStrokeWidth = strokeWidth / 2
  const seamSize = 2
  const sequence = asSequence(colors)

  const seqLen = sequence.length
  const matrixLen = seqLen * 2

  const builder = svgBuilder.newInstance().width(matrixLen).height(matrixLen)

  for (let y = 0; y < seqLen; y++) {
    fillStyle = sequence[y % seqLen]
    strokeStyle = toTone(fillStyle, 0.4)
    for (let x = 0; x < seqLen; x += seamSize) {
      const ff = wFirstFill(x, y, seamSize, fillStyle, strokeStyle, strokeWidth)
      isValidSeam(ff, 0, 0, matrixLen, matrixLen) && builder.rect(ff)
    }
  }

  for (let x = 0; x < seqLen; x++) {
    fillStyle = sequence[x % seqLen]
    strokeStyle = toTone(fillStyle, 0.7)
    for (let y = 0; y < seqLen + x; y += seamSize) {
      const ff = hFirstFill(x, y, seamSize, fillStyle, strokeStyle, strokeWidth)
      isValidSeam(ff, 0, 0, matrixLen, matrixLen) && builder.rect(ff)
    }
  }
  return builder
}

export const getTartanAsRender = async (colors) => {
  return new Promise((resolve) => {
    const builder = getBuilder(colors)
    resolve(builder.render())
  })
}

export const getRenderAsBuffer = (colors) => {
  const builder = getBuilder(colors)
  return builder.buffer()
}

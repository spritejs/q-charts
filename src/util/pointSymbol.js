import { Ellipse, Triangle, Rect, Star, Sprite, Path } from 'spritejs'
import { isArray, isNumber } from './is'

const getRealPath = (str, start) => {
  const urls = str.split(start)
  return urls[urls.length - 1]
}

const convert2Array = num => {
  return isArray(num) ? num : [num, num]
}

const getTriangleStyle = size => {
  return {
    angle: 60,
    sides: size.map(s => s * 2),
    anchor: [1, 1],
    rotate: 180,
    translate: size
  }
}

const getRectStyle = size => {
  return {
    angle: 90,
    sides: size.map(s => s * 2)
  }
}

const getStarStyle = size => {
  const [sizeX, sizeY] = size
  let style = {
    radius: sizeX * 1.1,
    angle: 5,
    anchor: [0.5, 0.5]
  }
  if (sizeX !== sizeY) {
    style.innerRadius = sizeY * 1.1
  }
  return style
}

const getEllipseStyle = size => {
  const [radiusX, radiusY] = size
  return {
    radiusX,
    radiusY,
    anchor: [0.5, 0.5]
  }
}

const getSpriteStyle = (pointType, size) => {
  return size
    ? {
      textures: getRealPath(pointType, 'image://'),
      size
    }
    : {
      textures: getRealPath(pointType, 'image://')
    }
}

const getPathStyle = (pointType, scale) => {
  const scaleArray = scale && convert2Array(scale)
  const style = {
    d: getRealPath(pointType, 'path://'),
    anchor: [0.5, 0.5]
  }
  return scaleArray ? { ...style, scale: scaleArray } : { ...style }
}

/**
 * 根据用户给的style，计算出各个图形真实的样式
 * @param {Object} style normal style
 * @param {Object} hStyle hover style
 * @returns {Object} {PointSymbol, normalStyle, hoverStyle}
 */
export function getSymbolAndStyle(style, hStyle) {
  let normalStyle
  let hoverStyle
  let PointSymbol = Ellipse

  // normal
  let pointType = 'circle'
  if (style && style.pointType) {
    pointType = style.pointType
  }
  let sizeArray = null
  if (style && isNumber(style.size)) {
    sizeArray = convert2Array(style.size)
  }
  // hover
  let hSizeArray = null
  if (hStyle && isNumber(hStyle.size)) {
    hSizeArray = convert2Array(hStyle.size)
  }

  if (pointType.startsWith('image://')) {
    PointSymbol = Sprite
    normalStyle = getSpriteStyle(pointType, sizeArray)
    hoverStyle = getSpriteStyle(pointType, hSizeArray)
  } else if (pointType.startsWith('path://')) {
    PointSymbol = Path
    normalStyle = getPathStyle(pointType, style && style.scale)
    hoverStyle = getPathStyle(pointType, hStyle && hStyle.scale)
  } else {
    sizeArray = sizeArray || [3, 3]
    hSizeArray = hSizeArray || sizeArray
    switch (pointType) {
      case 'triangle':
        normalStyle = getTriangleStyle(sizeArray)
        hoverStyle = getTriangleStyle(hSizeArray)
        PointSymbol = Triangle
        break
      case 'rect':
        normalStyle = getRectStyle(sizeArray)
        hoverStyle = getRectStyle(hSizeArray)
        PointSymbol = Rect
        break
      case 'star':
        normalStyle = getStarStyle(sizeArray)
        hoverStyle = getStarStyle(hSizeArray)
        PointSymbol = Star
        break
      default:
        normalStyle = getEllipseStyle(sizeArray)
        hoverStyle = getEllipseStyle(hSizeArray)
        PointSymbol = Ellipse
    }
  }

  const mergeNormalStyle = { ...style, ...normalStyle }
  const mergeHoverStyle = { ...hStyle, ...hoverStyle }
  // 非图片样式的删除 size属性，避免bug
  if (!pointType.startsWith('image://')) {
    if (mergeNormalStyle) {
      delete mergeNormalStyle.size
    }
    if (mergeHoverStyle) {
      delete mergeHoverStyle.size
    }
  }
  return {
    PointSymbol,
    normalStyle: mergeNormalStyle,
    hoverStyle: mergeHoverStyle
  }
}

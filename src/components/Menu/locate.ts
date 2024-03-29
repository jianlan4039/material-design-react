import {Corner} from "../internal/alignment/geometry";
import {CSSProperties} from "react";

export const alignAnchor = (anchor: HTMLElement, self: HTMLElement, anchorCorner: Corner, selfCorner: Corner) => {
  const {height: anchorHeight, width: anchorWidth} = anchor?.getBoundingClientRect()
  const {width: menuWidth} = self?.getBoundingClientRect()
  const {offsetLeft: anchorLeft, offsetTop: anchorTop, offsetParent} = anchor
  const parentHeight: number = offsetParent?.getBoundingClientRect().height ?? window.innerHeight

  const anchorCorners = {
    [Corner.START_START]: {x: anchorLeft, y: anchorTop},
    [Corner.START_END]: {x: anchorLeft + anchorWidth, y: anchorTop},
    [Corner.END_START]: {x: anchorLeft, y: anchorTop + anchorHeight},
    [Corner.END_END]: {x: anchorLeft + anchorWidth, y: anchorTop + anchorHeight},
  }

  let menuPosition: { top?: number, left?: number, bottom?: number } = {}
  const {y, x} = anchorCorners[anchorCorner]
  switch (selfCorner) {
    case Corner.START_START:
      menuPosition = {
        top: y,
        left: x
      }
      break
    case Corner.START_END:
      menuPosition = {
        top: y,
        left: x - menuWidth
      }
      break
    case Corner.END_START:
      menuPosition = {
        bottom: parentHeight - y,
        left: x
      }
      break
    case Corner.END_END:
      menuPosition = {
        bottom: parentHeight - y,
        left: x - menuWidth
      }
      break
  }

  const positionStyle: CSSProperties = {left: `${menuPosition.left}px`}
  if (menuPosition.top !== undefined) {
    positionStyle.top = `${menuPosition.top}px`
  } else {
    positionStyle.bottom = `${menuPosition.bottom}px`
  }

  return positionStyle
}
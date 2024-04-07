import {Corner} from "./geometry";
import {CSSProperties} from "react";

export const alignToAnchor = (anchor: HTMLElement, self: HTMLElement, anchorCorner: Corner, selfCorner: Corner, offsetX: number = 0, offsetY: number = 0) => {
  const {height: anchorHeight, width: anchorWidth} = anchor?.getBoundingClientRect()
  const {width: menuWidth} = self?.getBoundingClientRect()
  const {offsetLeft: anchorLeft, offsetTop: anchorTop, offsetParent} = anchor
  const parentHeight: number = offsetParent?.getBoundingClientRect().height ?? window.innerHeight

  const anchorCorners = {
    [Corner.START_START]: {x: anchorLeft + offsetX, y: anchorTop + offsetY},
    [Corner.START_END]: {x: anchorLeft + anchorWidth + offsetX, y: anchorTop + offsetY},
    [Corner.END_START]: {x: anchorLeft + offsetX, y: anchorTop + anchorHeight + offsetY},
    [Corner.END_END]: {x: anchorLeft + anchorWidth + offsetX, y: anchorTop + anchorHeight + offsetY},
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

export const setPosition = (x: number, y: number) => {
  const positionStyle: CSSProperties = {position: 'fixed', left: `${x}px`, top: `${y}px`}
  return positionStyle
}
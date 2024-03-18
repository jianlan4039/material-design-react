import React, {HTMLAttributes, ReactNode, useEffect, useState} from 'react'
import StateLayer from "../StateLayer";
import Elevation from "../Elevation";
import FocusRing from "../Focus/FocusRing";
import c from 'classnames'

export interface IconButtonContainerProps extends HTMLAttributes<HTMLDivElement>{
  children?: ReactNode
  toggled?: boolean
  selected?: boolean
  disabled?: boolean
}

export default function IconButtonContainer(props: IconButtonContainerProps) {
  const {
    children,
    disabled,
    toggled,
    selected: _selected,
    className
  } = props

  const [selected, setSelected] = useState<boolean>(Boolean(_selected))

  const clickHandler = () => {
    if (disabled) {
      return
    }
    if (toggled) {
      setSelected(!selected)
    }
  };

  useEffect(() => {
    setSelected(Boolean(_selected))
  }, [_selected]);

  return (
    <div
      className={c(className, {
        'disabled': disabled,
        'toggled': toggled,
        'selected': toggled && selected
      })}
      onClick={clickHandler}
    >
      <FocusRing></FocusRing>
      <Elevation></Elevation>
      <StateLayer disabled={disabled}></StateLayer>
      {children}
    </div>
  )
}
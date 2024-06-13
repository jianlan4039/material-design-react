import React, {forwardRef, HTMLAttributes, ReactNode, useEffect, useState} from 'react'
import withStateLayer from "../StateLayer";
import Elevation from "../Elevation";
import FocusRing from "../Focus/FocusRing";
import c from 'classnames'
import {StateElement} from "../internal/common/StateElement";

export interface IconButtonContainerProps extends HTMLAttributes<HTMLDivElement>, StateElement {
  children?: ReactNode
  toggled?: boolean
  selected?: boolean
  disabled?: boolean
}

const IconButtonContainer = withStateLayer<HTMLDivElement, IconButtonContainerProps>(forwardRef<HTMLDivElement, IconButtonContainerProps>((props, ref) => {
  const {
    children,
    disabled,
    toggled,
    selected: _selected,
    className,
    stateLayer,
    ...rest
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
      ref={ref}
      className={c(className, {
        'disabled': disabled,
        'toggled': toggled,
        'selected': toggled && selected
      })}
      onClick={clickHandler}
      {...rest}
    >
      <FocusRing></FocusRing>
      <Elevation></Elevation>
      { !disabled && stateLayer}
      {children}
    </div>
  )
}))

export default IconButtonContainer
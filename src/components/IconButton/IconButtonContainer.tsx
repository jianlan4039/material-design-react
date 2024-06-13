import React, {forwardRef, HTMLAttributes, ReactNode, useEffect, useState} from 'react'
import withStateLayer from "../StateLayer";
import Elevation from "../Elevation";
import c from 'classnames'
import {StateElement} from "../internal/common/StateElement";
import {FocusRingProps} from "../Focus";

export interface IconButtonContainerProps extends HTMLAttributes<HTMLDivElement>, StateElement, FocusRingProps {
  children?: ReactNode
  toggled?: boolean
  selected?: boolean
  disabled?: boolean
}

const IconButtonContainer = withStateLayer(forwardRef<HTMLDivElement, IconButtonContainerProps>((props, ref) => {
  const {
    children,
    disabled,
    toggled,
    selected: _selected,
    className,
    stateLayer,
    focusRing,
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
      <Elevation></Elevation>
      {!disabled && stateLayer}
      {focusRing}
      {children}
    </div>
  )
}))

export default IconButtonContainer
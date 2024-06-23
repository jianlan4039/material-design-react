import React, {forwardRef, ReactNode, useContext, useEffect, useId, useImperativeHandle, useRef, useState} from 'react'
import SegmentedButtonContent, {SegmentedButtonContentProps} from "./internal/SegmentedButtonContent";
import Outline from "../Outline/Outline";
import {MultiSelectionContext} from "./internal/context";
import useRipple from "../Ripple/useRipple";
import useFocusRing from "../Focus/useFocusRing";
import classNames from "classnames";
import './SegmentedButton.scss'

export interface SegmentedButtonProps extends SegmentedButtonContentProps {
  children?: ReactNode
  ndId?: string
}

export interface SegmentedButtonHandle {
  button?: HTMLButtonElement | null
}

const SegmentedButton = forwardRef<SegmentedButtonHandle, SegmentedButtonProps>((props, ref) => {
  const {
    children,
    ndId,
    disabled,
    onFocus,
    onBlur,
    ...rest
  } = props

  const id = ndId ?? useId()
  const {list, setList} = useContext(MultiSelectionContext)
  const [selected, setSelected] = useState<boolean>(false)
  const [parent, setParent] = useState<HTMLButtonElement>()
  const btnRef = useRef<HTMLButtonElement>(null);

  const [rippleProps, ripple] = useRipple<HTMLDivElement>({})
  const [focusRingProps, focusRing] = useFocusRing<HTMLButtonElement>({parent, onFocus, onBlur})

  useEffect(() => {
    setSelected(list?.includes(id) ?? false)
  }, [list]);

  useEffect(() => {
    if (btnRef.current) {
      setParent(btnRef.current)
    }
  }, [btnRef]);

  useImperativeHandle(ref, () => ({
    button: btnRef.current
  }))

  const clickHandler = () => {
    setList?.([id])
  }

  return (
    <div
      onClick={clickHandler}
      className={classNames('nd-segmented-button', {
        'nd-selected': selected,
        'nd-disabled': disabled
      })}
      {...rippleProps}
    >
      <Outline disabled={disabled}></Outline>
      {ripple}
      {focusRing}
      <SegmentedButtonContent
        ref={btnRef}
        disabled={disabled}
        {...focusRingProps}
        {...rest}
      >{children}</SegmentedButtonContent>
    </div>
  )
})

export default SegmentedButton
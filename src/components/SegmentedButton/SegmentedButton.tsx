import React, {forwardRef, ReactNode, useContext, useEffect, useId, useImperativeHandle, useRef, useState} from 'react'
import SegmentedButtonContent, {SegmentedButtonContentProps} from "./internal/SegmentedButtonContent";
import Outline from "../Outline/Outline";
import {MultiSelectionContext} from "./internal/context";
import useRipple from "../Ripple/useRipple";
import useFocusRing from "../Focus/useFocusRing";
import classNames from "classnames";
import './SegmentedButton.scss'
import StatefulBox from "../StatefulBox/StatefulBox";

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
  const btnRef = useRef<HTMLButtonElement>(null);


  useEffect(() => {
    setSelected(list?.includes(id) ?? false)
  }, [list]);

  useImperativeHandle(ref, () => ({
    button: btnRef.current
  }))

  const clickHandler = () => {
    setList?.([id])
  }

  return (
    <StatefulBox
      onClick={clickHandler}
      className={classNames('nd-segmented-button', {
        'nd-selected': selected,
        'nd-disabled': disabled
      })}
      disabled={disabled}
    >
      <Outline disabled={disabled}></Outline>
      <SegmentedButtonContent
        ref={btnRef}
        disabled={disabled}
        {...rest}
      >
        {children}
      </SegmentedButtonContent>
    </StatefulBox>
  )
})

export default SegmentedButton
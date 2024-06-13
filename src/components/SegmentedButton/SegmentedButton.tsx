import React, {forwardRef, ReactNode, useContext, useEffect, useId, useState} from 'react'
import './SegmentedButton.scss'
import cln from "classnames";
import SegmentedButtonContent, {SegmentedButtonContentProps} from "./internal/SegmentedButtonContent";
import withStateLayer from "../StateLayer";
import Outline from "../Outline/Outline";
import {MultiSelectionContext} from "./internal/context";
import {StateElement} from "../internal/common/StateElement";
import withFocusRing, {FocusRingProps} from "../Focus";

export interface SegmentedButtonProps extends SegmentedButtonContentProps, StateElement, FocusRingProps {
  children?: ReactNode
  ndId?: string
}

const SegmentedButton = withFocusRing(withStateLayer(forwardRef<HTMLButtonElement, SegmentedButtonProps>((props, ref) => {
  const {
    children,
    ndId,
    disabled,
    stateLayer,
    focusRing,
    ...rest
  } = props

  const id = ndId ?? useId()
  const {list, setList} = useContext(MultiSelectionContext)
  const [selected, setSelected] = useState<boolean>(false)

  const clickHandler = () => {
    setList?.([id])
  }

  useEffect(() => {
    setSelected(list?.includes(id) ?? false)
  }, [list]);

  return (
    <div
      onClick={clickHandler}
      className={cln('nd-segmented-button', {
        'nd-selected': selected,
        'nd-disabled': disabled
      })}
    >
      <Outline disabled={disabled}></Outline>
      {stateLayer}
      {focusRing}
      <SegmentedButtonContent ref={ref} disabled={disabled} {...rest}>{children}</SegmentedButtonContent>
    </div>
  )
})))

export default SegmentedButton
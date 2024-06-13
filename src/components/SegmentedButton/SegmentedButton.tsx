import React, {forwardRef, ReactNode, useContext, useEffect, useId, useState} from 'react'
import './SegmentedButton.scss'
import cln from "classnames";
import SegmentedButtonContent, {SegmentedButtonContentProps} from "./internal/SegmentedButtonContent";
import withStateLayer from "../StateLayer";
import Outline from "../Outline/Outline";
import {MultiSelectionContext} from "./internal/context";
import {StateElement} from "../internal/common/StateElement";

export interface SegmentedButtonProps extends SegmentedButtonContentProps, StateElement{
  children?: ReactNode
  ndId?: string
}

const SegmentedButton = withStateLayer<HTMLDivElement, SegmentedButtonProps>(forwardRef<HTMLDivElement, SegmentedButtonProps>((props, ref) => {
  const {
    children,
    ndId,
    disabled,
    stateLayer,
    ...rest
  } = props

  const id = ndId ?? useId()
  const {list, setList, multiple} = useContext(MultiSelectionContext)
  const [selected, setSelected] = useState<boolean>(false)

  const clickHandler = () => {
    setList?.([id])
  }

  useEffect(() => {
    setSelected(list?.includes(id) ?? false)
  }, [list]);

  return (
    <div
      ref={ref}
      onClick={clickHandler}
      className={cln('nd-segmented-button', {
        'nd-selected': selected,
        'nd-disabled': disabled
      })}
    >
      <Outline disabled={disabled}></Outline>
      {stateLayer}
      <SegmentedButtonContent disabled={disabled} {...rest}>{children}</SegmentedButtonContent>
    </div>
  )
}))

export default SegmentedButton
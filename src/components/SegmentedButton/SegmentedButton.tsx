import React, {ReactNode, useContext, useEffect, useId, useState} from 'react'
import './SegmentedButton.scss'
import cln from "classnames";
import SegmentedButtonContent, {SegmentedButtonContentProps} from "./content/SegmentedButtonContent";
import StateLayer from "../StateLayer";
import Outline from "../Outline/Outline";
import {MultiSelectionContext} from "../internal/context/SelectionContext";

export interface SegmentedButtonProps extends SegmentedButtonContentProps {
  children?: ReactNode
  ndId?: string
}

export default function SegmentedButton(props: SegmentedButtonProps) {
  const {
    children,
    ndId,
    disabled,
    ...rest
  } = props

  const id = ndId ?? useId()
  const {options, setOption, multiple} = useContext(MultiSelectionContext)
  const [selected, setSelected] = useState<boolean>(false)

  const clickHandler = () => {
    setOption?.(id)
  }

  useEffect(() => {
    setSelected(options?.includes(id) ?? false)
  }, [options]);

  return (
    <div
      onClick={clickHandler}
      className={cln('nd-segmented-button', {
        'nd-selected': selected,
        'nd-disabled': disabled
      })}
    >
      <Outline disabled={disabled}></Outline>
      <StateLayer disabled={disabled}></StateLayer>
      <SegmentedButtonContent disabled={disabled} {...rest}>{children}</SegmentedButtonContent>
    </div>
  )
}
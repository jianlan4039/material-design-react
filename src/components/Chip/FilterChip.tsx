import React, {forwardRef, useEffect, useState} from 'react'
import Button, {ButtonHandle, ButtonProps} from "./internal/Button";
import './FilterChip.scss'
import Outline from "../Outline/Outline";
import cln from "classnames";
import Elevation from "../Elevation";

export interface FilterChipProps extends ButtonProps {
  selected?: boolean
}

export interface FilterChipHandle extends ButtonHandle {
}

const FilterChip = forwardRef<FilterChipHandle, FilterChipProps>((props, ref) => {
  const {
    children,
    selected: _slc = false,
    disabled,
    elevated,
    ...rest
  } = props


  const [select, setSelect] = useState(_slc)

  const clickHandler = () => {
    !disabled && setSelect(!select)
  }

  useEffect(() => {
    setSelect(_slc)
  }, [_slc]);

  return (
    <div
      className={cln('nd-filter-chip', {
        'nd-selected': select,
        'nd-disabled': disabled,
        'nd-elevated': elevated
      })}
      onClick={clickHandler}
    >
      {elevated ? <Elevation></Elevation> : !select && <Outline></Outline>}
      <Button
        ref={ref}
        icon={select && <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 -960 960 960" width="18">
          <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/>
        </svg>
        }
        disabled={disabled}
        {...rest}
      >
        {children}
      </Button>
    </div>
  )
})

export default FilterChip
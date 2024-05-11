import React, {HTMLAttributes, useContext, useRef} from "react";
import {StateElement} from "../../internal/common/StateElement";
import StateLayer from "../../StateLayer";
import {SelectionContext} from "../../internal/context/SelectionContext";
import c from 'classnames'

export interface IMonthViewDateProps extends StateElement, HTMLAttributes<HTMLDivElement> {
  date?: number | null
  isToday?: boolean
  year?: number
  month?: number
}

const MonthViewDate: React.FC<IMonthViewDateProps> = StateLayer<HTMLDivElement, IMonthViewDateProps>((
  {
    date,
    year,
    month,
    onMouseOver,
    onMouseOut,
    onMouseDown,
    onMouseUp,
    stateLayer,
    isToday,
  }
) => {
  const now = new Date()
  const {setList, list} = useContext(SelectionContext)
  const selectedDate = useRef<number>(new Date(
    year ?? now.getFullYear(),
    month ?? now.getMonth(),
    date ?? now.getDate()
  ).getTime());

  const clickHandler = () => {
    setList?.([selectedDate.current])
  }

  return (
    <div
      className={c('date', {
        'selected': list?.includes(selectedDate.current),
        'blank': !date,
        'today': isToday
      })}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      onClick={clickHandler}
    >
      {date && stateLayer}
      {date || ''}
    </div>
  )
})

export default MonthViewDate
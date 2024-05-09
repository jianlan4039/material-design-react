import React, {HTMLAttributes, useContext} from "react";
import {StateElement} from "../../internal/common/StateElement";
import StateLayer from "../../StateLayer";
import {SelectionContext} from "../../internal/context/SelectionContext";
import c from 'classnames'

export interface IMonthViewDateProps extends StateElement, HTMLAttributes<HTMLDivElement> {
  date?: number | null
  isToday?: boolean
}

const MonthViewDate: React.FC<IMonthViewDateProps> = StateLayer<HTMLDivElement, IMonthViewDateProps>((
  {
    date,
    onMouseOver,
    onMouseOut,
    onMouseDown,
    onMouseUp,
    stateLayer,
    isToday,
  }
) => {

  const {setList, list} = useContext(SelectionContext)
  const today = new Date()

  const clickHandler = () => {
    setList?.(date)
  }

  return (
    <div
      className={c('date', {
        'selected': list?.includes(date),
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
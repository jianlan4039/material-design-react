import React, {HTMLAttributes, useContext} from "react";
import {StateElement} from "../../internal/common/StateElement";
import StateLayer from "../../StateLayer";
import {SelectionContext} from "../../internal/context/SelectionContext";
import c from 'classnames'

export interface IMonthViewDateProps extends StateElement, HTMLAttributes<HTMLDivElement> {
  date?: number | null
  id: string
}

const MonthViewDate: React.FC<IMonthViewDateProps> = StateLayer<HTMLDivElement, IMonthViewDateProps>((
  {
    date,
    onMouseOver,
    onMouseOut,
    onMouseDown,
    onMouseUp,
    stateLayer,
    id,
  }
) => {

  const {setList, list} = useContext(SelectionContext)

  const clickHandler = () => {
    setList?.(id)
  }

  return (
    <div
      className={c('date', {
        'selected': list?.includes(id),
        'blank': !date
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
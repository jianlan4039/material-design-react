import React, {HTMLAttributes, useContext, useRef} from "react";
import {MultiSelectContext} from "../../internal/context/MultiSelectContext";
import c from 'classnames'
import useRipple from "../../Ripple/useRipple";

export interface IMonthViewDateProps extends HTMLAttributes<HTMLDivElement> {
  date?: number | null
  isToday?: boolean
  year?: number
  month?: number // 注意，月份是从1开始的（1代表一月）
}

const MonthViewDate: React.FC<IMonthViewDateProps> = (
  {
    date,
    year,
    month,
    onMouseOver,
    onMouseOut,
    onMouseDown,
    onMouseUp,
    onTouchStart,
    onTouchEnd,
    isToday,
  }
) => {

  const [rippleProps, ripple] = useRipple<HTMLDivElement>({
    onMouseOver, onMouseOut, onMouseDown, onMouseUp, onTouchStart, onTouchEnd
  })

  const now = new Date()
  const {setList, list} = useContext(MultiSelectContext)
  const selectedDate = useRef<number>(new Date(
        year ?? now.getFullYear(),
        month ? month - 1 : now.getMonth(),
        date ?? now.getDate()
      ).getTime()
    )
  ;

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
      onClick={clickHandler}
      {...rippleProps}
    >
      {date && ripple}
      {date || ''}
    </div>
  )
}

export default MonthViewDate
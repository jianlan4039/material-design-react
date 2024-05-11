import React, {useState} from 'react';
import './MonthView.scss'
import {StateElement} from "../../internal/common/StateElement";
import MonthViewDate from "./MonthViewDate";
import {SelectionContextProvider} from "../../internal/context/SelectionContext";

interface IMonthViewProps extends StateElement {
  year: number;
  month: number;  // 注意，月份是从1开始的（1代表一月）
  startOfWeek: number;
  locale?: string;
  onDateChange?: (date: Date) => void
}

const MonthView: React.FC<IMonthViewProps> = (
  {
    year,
    month,
    startOfWeek,
    locale = 'en-US',
    onDateChange,
  }) => {

  const today = new Date()
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  const currentDate = today.getDate();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  // 计算起始偏移
  const offset = (firstDay - startOfWeek + 7) % 7;
  const dates = Array(daysInMonth + offset).fill(null).map((_, index) => {
    return index >= offset ? index - offset + 1 : null;
  });
  const [selected, setSelected] = useState<number[]>([])

  const setList = (dateList: number[]) => {
    setSelected(dateList)
    onDateChange?.(new Date(dateList[0]))
  }

  return (
    <SelectionContextProvider multiple={false} setList={setList} list={selected}>
      <div className={'month-view'}>
        {dates.map((date, index) => (
          <MonthViewDate
            key={`${year}-${month}-${index}`}
            date={date}
            year={year}
            month={month}
            isToday={year === currentYear && month === currentMonth && date === currentDate}></MonthViewDate>
        ))}
      </div>
    </SelectionContextProvider>
  );
};

export default MonthView;
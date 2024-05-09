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
}

const MonthView: React.FC<IMonthViewProps> = ({year, month, startOfWeek, locale = 'en-US'}) => {
  const daysInMonth = new Date(year, month, 0).getDate();
  const firstDay = new Date(year, month - 1, 1).getDay();

  // 计算起始偏移
  const offset = (firstDay - startOfWeek + 7) % 7;
  const dates = Array(daysInMonth + offset).fill(null).map((_, index) => {
    return index >= offset ? index - offset + 1 : null;
  });

  const [selected, setSelected] = useState<string[]>([])

  const setList = (date: string) => {
    setSelected([date])
  }

  return (
    <SelectionContextProvider multiple={false} setList={setList} list={selected}>
      <div className={'month-view'}>
        {dates.map((date, index) => (
          <MonthViewDate id={`${year}-${month}-${index}`} key={`${year}-${month}-${index}`} date={date}></MonthViewDate>
        ))}
      </div>
    </SelectionContextProvider>
  );
};

export default MonthView;

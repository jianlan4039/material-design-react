import React, {ReactNode, useEffect, useMemo, useRef, useState, MouseEvent} from 'react'
import Navigator from "./Navigator";
import './Panel.scss'
import Menu from "../../Menu/Menu";
import {MenuItemProps} from "../../Menu/MenuItem";
import TextButton from "../../Button/TextButton";
import MonthView from "./MonthView";
import {OptionValue} from "../../Menu/internal/menuTypes";

export interface PanelProps {
  children?: ReactNode
  year?: number;
  month?: number;        // 注意，月份是从1开始的（1代表一月）
  startOfWeek?: number;  // 一周的起始日，0 = 周日，1 = 周一，等等
  locale?: string;      // 可选的本地化设置，默认为英文
}

export default function Panel(props: PanelProps) {
  const {
    locale = 'en-US', // zh-CN：中文，en-US：英文
    startOfWeek = 0,
    year,
    month,
  } = props

  const weekdays = getShortWeekdays(startOfWeek, locale);

  // 生成本地化月份名称
  const monthList: MenuItemProps[] = Array.from(
    {length: 12},
    (_, i) => {
      return {
        label: new Intl.DateTimeFormat(locale, {month: 'long'}).format(new Date(2020, i)),
        value: i
      }
    }
  )

  const yearsMemo = useMemo(() => {
    const now = new Date()
    const yearsList: MenuItemProps[] = []
    const year = now.getFullYear()
    let start = year - 10
    if (start < 1970) {
      start = 1970
    }
    for (let i = 0; i < 20; i++) {
      yearsList.push({label: (start + i).toString(), value: start + i})
    }
    return yearsList
  }, []);

  const [now, setNow] = useState<Date>(new Date())
  const navigatorRef = useRef<HTMLDivElement>(null);
  const [navigatorAnchor, setNavigatorAnchor] = useState<HTMLDivElement>()
  const [monthMenuIsOpen, setMonthMenuIsOpen] = useState<boolean>()
  const [yearMenuIsOpen, setYearMenuIsOpen] = useState<boolean>()
  const [yearList, setYearList] = useState<MenuItemProps[]>(yearsMemo)

  useEffect(() => {
    if (navigatorRef.current) {
      setNavigatorAnchor(navigatorRef.current)
    }
  }, [navigatorRef]);

  function getShortWeekdays(startOfWeek: number, locale = 'en-US'): string[] {
    const baseDate = new Date(Date.UTC(2021, 0, 3));  // 2021年1月3日是周日
    let weekdays: string[] = [];

    for (let i = 0; i < 7; i++) {
      const day = new Date(baseDate);
      day.setUTCDate(day.getUTCDate() + i + startOfWeek);
      weekdays.push(new Intl.DateTimeFormat(locale, {weekday: 'narrow'}).format(day));
    }
    return weekdays;
  }

  const monthClickHandler = () => {
    setMonthMenuIsOpen(!monthMenuIsOpen)
  };

  const yearClickHandler = () => {
    setYearMenuIsOpen(!yearMenuIsOpen)
  };

  const loadMoreYears = (toEnd: boolean) => {
    const newYearList: MenuItemProps[] = []
    let start: number
    if (toEnd) {
      start = yearList[yearList.length - 1].value as number
    } else {
      start = (yearList[0].value as number - 11)
    }
    for (let i = 0; i < 10; i++) {
      start += 1
      newYearList.push({label: start.toString(), value: start})
    }
    if (toEnd) {
      setYearList([...yearList, ...newYearList])
    } else {
      setYearList([...newYearList, ...yearList])
    }
  }

  const yearScrollHandler = (e: MouseEvent<HTMLDivElement>) => {
    const {scrollTop, clientHeight, scrollHeight} = e.currentTarget;
    if (scrollHeight - scrollTop === clientHeight) {
      loadMoreYears(true)
    }
    if (scrollTop === 0) {
      loadMoreYears(false)
    }
  }

  const nextYear = () => {
    now.setFullYear(now.getFullYear() + 1)
    setNow(new Date(now))
  };

  const lastYear = () => {
    now.setFullYear(now.getFullYear() - 1)
    setNow(new Date(now))
  };

  const nextMonth = () => {
    now.setMonth(now.getMonth() + 1)
    setNow(new Date(now))
  };
  const lastMonth = () => {
    now.setMonth(now.getMonth() - 1)
    setNow(new Date(now))
  };

  const monthChangeHandler = (value: OptionValue) => {
    now.setMonth(value as number)
    setNow(new Date(now))
  };

  const yearChangeHandler = (value: OptionValue) => {
    now.setFullYear(value as number)
    setNow(new Date(now))
  };

  return (
    <div className={'date-picker-panel'}>
      <div ref={navigatorRef} className={'navigator-container'}>
        <Navigator
          label={new Intl.DateTimeFormat(locale, {month: 'long'}).format(now)}
          onClick={monthClickHandler}
          onNext={nextMonth}
          onLast={lastMonth}
        ></Navigator>
        <Navigator
          label={new Intl.DateTimeFormat(locale, {year: 'numeric'}).format(now)}
          onClick={yearClickHandler}
          onNext={nextYear}
          onLast={lastYear}
        ></Navigator>
      </div>
      <div className={'weekdays'}>
        {weekdays.map((day, index) => (
          <span key={index}>{day}</span>
        ))}
      </div>
      <MonthView year={now.getFullYear()} month={now.getMonth() + 1} startOfWeek={startOfWeek}/>
      <div className={'actions'}>
        <TextButton>Cancel</TextButton>
        <TextButton>OK</TextButton>
      </div>
      <Menu
        items={monthList}
        anchorEl={navigatorAnchor}
        open={monthMenuIsOpen}
        style={{blockSize: '392px'}}
        onClosed={() => setMonthMenuIsOpen(false)}
        onChange={monthChangeHandler}
      ></Menu>
      <Menu
        items={yearList}
        anchorEl={navigatorAnchor}
        open={yearMenuIsOpen}
        style={{blockSize: '392px'}}
        onScroll={yearScrollHandler}
        onClosed={() => setYearMenuIsOpen(false)}
        onChange={yearChangeHandler}
      ></Menu>
    </div>
  )
}
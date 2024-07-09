import React, {ReactNode, useEffect, useMemo, useRef, useState, MouseEvent as ReactMouseEvent} from 'react'
import Navigator from "./Navigator";
import './Panel.scss'
import Menu from "../../Menu/Menu";
import {MenuItemProps} from "../../Menu/MenuItem";
import TextButton from "../../Button/TextButton";
import MonthView from "./MonthView";
import {OptionValue} from "../../Menu/internal/menuTypes";
import SlideViewer from "../../SlideViewer/SlideViewer";

export interface PanelProps {
  children?: ReactNode
  year?: number;
  month?: number;        // 注意，获取月份是从1开始的（1代表一月）
  date?: number;
  startOfWeek?: number;  // 一周的起始日，0 = 周日，1 = 周一，等等
  locale?: string;      // 可选的本地化设置，默认为英文; zh-CN：中文，en-US：英文
  onDateChange?: (date: Date[]) => void
  onOutsideClick?: () => void
}

const Panel = React.memo((props: PanelProps) => {
  const {
    locale = 'en-US',
    startOfWeek = 0,
    year,
    month,
    onDateChange,
  } = props

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
    for (let i = 0; i < 20; i++) {
      yearsList.push({label: (start + i).toString(), value: start + i})
    }
    return yearsList
  }, []);

  const rootRef = useRef<HTMLDivElement>(null);
  const now = new Date()
  const [monthViewerDate, setMonthViewerDate] = useState<Date>(new Date(year ?? now.getFullYear(), month ?? now.getMonth(), 1))

  const navigatorRef = useRef<HTMLDivElement>(null);
  const [navigatorAnchor, setNavigatorAnchor] = useState<HTMLDivElement>()
  const [monthMenuIsOpen, setMonthMenuIsOpen] = useState<boolean>()
  const [yearMenuIsOpen, setYearMenuIsOpen] = useState<boolean>()
  const [yearList, setYearList] = useState<MenuItemProps[]>(yearsMemo)
  const [alternativeDateView, setAlternativeDateView] = useState<ReactNode>()
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>()

  useEffect(() => {
    if (navigatorRef.current) {
      setNavigatorAnchor(navigatorRef.current)
    }
  }, [navigatorRef]);

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

  const yearScrollHandler = (e: ReactMouseEvent<HTMLOListElement>) => {
    const {scrollTop, clientHeight, scrollHeight} = e.currentTarget;
    if (scrollHeight - scrollTop === clientHeight) {
      loadMoreYears(true)
    }
    if (scrollTop === 0) {
      loadMoreYears(false)
    }
  }

  const nextYear = () => {
    setSlideDirection('left')
    monthViewerDate.setFullYear(monthViewerDate.getFullYear() + 1)
    setAlternativeDateView(getDates(monthViewerDate))
    setMonthViewerDate(new Date(monthViewerDate))
  };

  const lastYear = () => {
    setSlideDirection('right')
    monthViewerDate.setFullYear(monthViewerDate.getFullYear() - 1)
    setAlternativeDateView(getDates(monthViewerDate))
    setMonthViewerDate(new Date(monthViewerDate))
  };

  const nextMonth = () => {
    monthViewerDate.setMonth(monthViewerDate.getMonth() + 1)
    setSlideDirection('left')
    setAlternativeDateView(getDates(monthViewerDate))
    setMonthViewerDate(new Date(monthViewerDate))
  };
  const lastMonth = () => {
    monthViewerDate.setMonth(monthViewerDate.getMonth() - 1)
    setSlideDirection('right')
    setAlternativeDateView(getDates(monthViewerDate))
    setMonthViewerDate(new Date(monthViewerDate))
  };

  const monthChangeHandler = (value: OptionValue) => {
    setSlideDirection((value as number) > monthViewerDate.getMonth() ? 'left' : 'right')
    monthViewerDate.setMonth(value as number)
    setAlternativeDateView(getDates(monthViewerDate))
    setMonthViewerDate(new Date(monthViewerDate))
  };

  const yearChangeHandler = (value: OptionValue) => {
    setSlideDirection((value as number) > monthViewerDate.getFullYear() ? 'left' : 'right')
    monthViewerDate.setFullYear(value as number)
    setAlternativeDateView(getDates(monthViewerDate))
    setMonthViewerDate(new Date(monthViewerDate))
  };

  const dateChangeHandler = (date: Date) => {
    onDateChange?.([date])
  }

  function getDates(date: Date) {
    return <>
      <MonthView
        year={date.getFullYear()}
        month={date.getMonth() + 1}
        startOfWeek={startOfWeek}
        onDateChange={dateChangeHandler}/>
    </>
  }

  return (
    <div ref={rootRef} className={'date-picker-panel'}>
      <div ref={navigatorRef} className={'navigator-container'}>
        <Navigator
          label={new Intl.DateTimeFormat(locale, {month: 'long'}).format(monthViewerDate)}
          onClick={monthClickHandler}
          onNext={nextMonth}
          onLast={lastMonth}
          disabled={yearMenuIsOpen}
        ></Navigator>
        <Navigator
          label={new Intl.DateTimeFormat(locale, {year: 'numeric'}).format(monthViewerDate)}
          onClick={yearClickHandler}
          onNext={nextYear}
          onLast={lastYear}
          disabled={monthMenuIsOpen}
        ></Navigator>
      </div>
      <SlideViewer alternativeView={alternativeDateView} direction={slideDirection}>
        {getDates(monthViewerDate)}
      </SlideViewer>
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
        onSelected={monthChangeHandler}
        preset={[monthViewerDate.getMonth()]}
        stayOpenOnOutsideClick={true}
      ></Menu>
      <Menu
        items={yearList}
        anchorEl={navigatorAnchor}
        open={yearMenuIsOpen}
        style={{blockSize: '392px'}}
        onScroll={yearScrollHandler}
        onClosed={() => setYearMenuIsOpen(false)}
        onSelected={yearChangeHandler}
        preset={[monthViewerDate.getFullYear()]}
        stayOpenOnOutsideClick={true}
      ></Menu>
    </div>
  )
})

export default Panel
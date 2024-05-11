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
  month?: number;        // 注意，月份是从1开始的（1代表一月）
  startOfWeek?: number;  // 一周的起始日，0 = 周日，1 = 周一，等等
  locale?: string;      // 可选的本地化设置，默认为英文
  onDateChange?: (date: Date[]) => void
  onOutsideClick?: () => void
}

const Panel = React.memo((props: PanelProps) => {
  const {
    locale = 'en-US', // zh-CN：中文，en-US：英文
    startOfWeek = 0,
    year,
    month,
    onDateChange,
    onOutsideClick
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
  const selectedDate = useRef<Date>(new Date());
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

  const yearScrollHandler = (e: ReactMouseEvent<HTMLDivElement>) => {
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
    selectedDate.current.setFullYear(selectedDate.current.getFullYear() + 1)
    setAlternativeDateView(getDates(selectedDate.current))

  };

  const lastYear = () => {
    setSlideDirection('right')
    selectedDate.current.setFullYear(selectedDate.current.getFullYear() - 1)
    setAlternativeDateView(getDates(selectedDate.current))
  };

  const nextMonth = () => {
    setSlideDirection('left')
    selectedDate.current.setMonth(selectedDate.current.getMonth() + 1)
    setAlternativeDateView(getDates(selectedDate.current))
  };
  const lastMonth = () => {
    setSlideDirection('right')
    selectedDate.current.setMonth(selectedDate.current.getMonth() - 1)
    setAlternativeDateView(getDates(selectedDate.current))
  };

  const monthChangeHandler = (value: OptionValue) => {
    setSlideDirection((value as number) > selectedDate.current.getMonth() ? 'left' : 'right')
    selectedDate.current.setMonth(value as number)
    setAlternativeDateView(getDates(selectedDate.current))
  };

  const yearChangeHandler = (value: OptionValue) => {
    setSlideDirection((value as number) > selectedDate.current.getFullYear() ? 'left' : 'right')
    selectedDate.current.setFullYear(value as number)
    setAlternativeDateView(getDates(selectedDate.current))
  };

  const dateChangeHandler = (date: Date) => {
    onDateChange?.([date])
  }

  function getDates(date: Date) {
    return <>
      <MonthView
        year={date.getFullYear()}
        month={date.getMonth()}
        startOfWeek={startOfWeek}
        onDateChange={dateChangeHandler}/>
    </>
  }

  return (
    <div ref={rootRef} className={'date-picker-panel'}>
      <div ref={navigatorRef} className={'navigator-container'}>
        <Navigator
          label={new Intl.DateTimeFormat(locale, {month: 'long'}).format(selectedDate.current)}
          onClick={monthClickHandler}
          onNext={nextMonth}
          onLast={lastMonth}
          disabled={yearMenuIsOpen}
        ></Navigator>
        <Navigator
          label={new Intl.DateTimeFormat(locale, {year: 'numeric'}).format(selectedDate.current)}
          onClick={yearClickHandler}
          onNext={nextYear}
          onLast={lastYear}
          disabled={monthMenuIsOpen}
        ></Navigator>
      </div>
      <SlideViewer alternativeView={alternativeDateView} direction={slideDirection}>
        {getDates(selectedDate.current)}
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
        onChange={monthChangeHandler}
        stayOpenOnOutsideClick={true}
      ></Menu>
      <Menu
        items={yearList}
        anchorEl={navigatorAnchor}
        open={yearMenuIsOpen}
        style={{blockSize: '392px'}}
        onScroll={yearScrollHandler}
        onClosed={() => setYearMenuIsOpen(false)}
        onChange={yearChangeHandler}
        stayOpenOnOutsideClick={true}
      ></Menu>
    </div>
  )
})

export default Panel
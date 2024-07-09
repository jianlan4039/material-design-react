import React, {ReactNode, useEffect, useMemo, useRef, useState, MouseEvent as ReactMouseEvent} from 'react'
import Navigator from "./Navigator";
import './Panel.scss'
import Menu, {MenuHandle} from "../../Menu/Menu";
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
        id: setMonthId(i),
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
      const value = start + i
      yearsList.push({label: (start + i).toString(), id: setYearId(value), value: value})
    }
    return yearsList
  }, []);

  const rootRef = useRef<HTMLDivElement>(null);
  const now = new Date()
  const [monthViewerDate, setMonthViewerDate] = useState<Date>(new Date(year ?? now.getFullYear(), month ?? now.getMonth(), 1))
  const [monthPreset, setMonthPreset] = useState<string[]>([setMonthId(monthViewerDate.getMonth())])
  const [yearPreset, setYearPreset] = useState<string[]>([setYearId(monthViewerDate.getFullYear())])
  const navigatorRef = useRef<HTMLDivElement>(null);
  const [navigatorAnchor, setNavigatorAnchor] = useState<HTMLDivElement>()
  const [monthMenuIsOpen, setMonthMenuIsOpen] = useState<boolean>()
  const [yearMenuIsOpen, setYearMenuIsOpen] = useState<boolean>()
  const [yearList, setYearList] = useState<MenuItemProps[]>(yearsMemo)
  const [alternativeDateView, setAlternativeDateView] = useState<ReactNode>()
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>()
  const yearMenuRef = useRef<MenuHandle>(null);
  // const scrollBefore = useRef<{ scrollTop?: number, scrollHeight?: number }>({});

  useEffect(() => {
    if (navigatorRef.current) {
      setNavigatorAnchor(navigatorRef.current)
    }
  }, [navigatorRef]);

  // useEffect(() => {
  //   if (yearList && yearMenuRef.current?.list && scrollBefore.current.scrollHeight && scrollBefore.current.scrollTop) {
  //     const scrollHeightAfter = yearMenuRef.current.list.scrollHeight
  //     const deltaHeight = scrollHeightAfter - scrollBefore.current.scrollHeight
  //     yearMenuRef.current.list.scrollTop = deltaHeight + scrollBefore.current.scrollTop
  //   }
  // }, [yearList, yearMenuRef]);

  const monthClickHandler = () => {
    setMonthMenuIsOpen(!monthMenuIsOpen)
  };

  const yearClickHandler = () => {
    setYearMenuIsOpen(!yearMenuIsOpen)
  };

  /**
   * 加载更多年选项
   *
   * @param toEnd 朝下加载还是朝上加载
   */
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
      newYearList.push({label: start.toString(), value: start, id: setYearId(start)})
    }
    if (toEnd) {
      setYearList([...yearList, ...newYearList])
    } else {
      setYearList([...newYearList, ...yearList])
      if (yearMenuRef.current?.list) {
        yearMenuRef.current.list.scrollTop += 560
      }
    }
  }

  const yearScrollHandler = (e: ReactMouseEvent<HTMLOListElement>) => {
    const {scrollTop, clientHeight, scrollHeight} = e.currentTarget;
    // scrollBefore.current = {scrollTop, scrollHeight}
    if (scrollHeight - scrollTop === clientHeight) {
      loadMoreYears(true)
    }
    if (scrollTop === 0) {
      loadMoreYears(false)
    }
  }

  function setYearId(year: number | string): string {
    return `year-${year}`
  }

  function setMonthId(month: number | string): string {
    return `month-${month}`
  }

  const nextYear = () => {
    const nextYear = monthViewerDate.getFullYear() + 1
    setSlideDirection('left')
    monthViewerDate.setFullYear(nextYear)
    setYearPreset([setYearId(nextYear)])
    setAlternativeDateView(getDates(monthViewerDate))
    setMonthViewerDate(new Date(monthViewerDate))
  };

  const lastYear = () => {
    const lastYear = monthViewerDate.getFullYear() - 1
    setSlideDirection('right')
    monthViewerDate.setFullYear(lastYear)
    setYearPreset([setYearId(lastYear)])
    setAlternativeDateView(getDates(monthViewerDate))
    setMonthViewerDate(new Date(monthViewerDate))
  };

  const nextMonth = () => {
    const nextMonth = monthViewerDate.getMonth() + 1
    monthViewerDate.setMonth(nextMonth)
    setMonthPreset([setMonthId(nextMonth > 11 ? 0 : nextMonth)])
    setSlideDirection('left')
    setAlternativeDateView(getDates(monthViewerDate))
    setMonthViewerDate(new Date(monthViewerDate))
  };
  const lastMonth = () => {
    const lastMonth = monthViewerDate.getMonth() - 1
    monthViewerDate.setMonth(lastMonth)
    setMonthPreset([setMonthId(lastMonth < 0 ? 11 : lastMonth)])
    setSlideDirection('right')
    setAlternativeDateView(getDates(monthViewerDate))
    setMonthViewerDate(new Date(monthViewerDate))
  };

  const monthChangeHandler = (ids: string[]) => {
    if (!ids) return;
    const id = ids[0];
    const index = monthList.findIndex((month) => month.id === id);
    const value = monthList[index].value
    setMonthPreset([setMonthId(value as number)])
    setSlideDirection((value as number) > monthViewerDate.getMonth() ? 'left' : 'right')
    monthViewerDate.setMonth(value as number)
    setAlternativeDateView(getDates(monthViewerDate))
    setMonthViewerDate(new Date(monthViewerDate))
  };

  const yearChangeHandler = (ids: string[]) => {
    if (!ids) return;
    const id = ids[0];
    const index = yearList.findIndex((year) => year.id === id);
    const value = yearList[index].value
    setYearPreset([setYearId(value as number)])
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
        preset={monthPreset}
        stayOpenOnOutsideClick={true}
      ></Menu>
      <Menu
        ref={yearMenuRef}
        items={yearList}
        anchorEl={navigatorAnchor}
        open={yearMenuIsOpen}
        style={{blockSize: '392px'}}
        onScroll={yearScrollHandler}
        onClosed={() => setYearMenuIsOpen(false)}
        onSelected={yearChangeHandler}
        preset={yearPreset}
        stayOpenOnOutsideClick={true}
      ></Menu>
    </div>
  )
})

export default Panel
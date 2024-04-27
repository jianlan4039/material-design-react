import React, {
  forwardRef,
  ReactNode,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  MouseEvent,
  useImperativeHandle, memo
} from 'react'
import ListItem, {ListItemHandle, ListItemProps} from "../../List/ListItem";
import './NavigationEnter.scss';
import c from 'classnames'
import {IndicatorRectContext, CurrentIndicator} from "../../internal/context/indicator";
import {EASING, DURATION} from "../../internal/motion/animation";

export interface NavigationEnterProps extends ListItemProps {
  id?: string
  active?: boolean
  subEntries?: NavigationEnterProps[]
}

export interface NavigationEnterHandle {
  root: HTMLLIElement | null
}

const NavigationEnter = memo(forwardRef<NavigationEnterHandle, NavigationEnterProps>((props, ref) => {
  const {
    id = useId(),
    active,
    subEntries,
    end,
    ...rest
  } = props

  const {current, setCurrent, init} = useContext(IndicatorRectContext)
  const listRef = useRef<NavigationEnterHandle>(null);
  const subEntryRef = useRef<HTMLUListElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

  // isActive and delayIsActive composed to a short circuit
  const [isActive, setIsActive] = useState<boolean>(false)
  const [delayIsActive, setDelayIsActive] = useState<boolean>(isActive)

  // isOpen and preIsOpen composed to a cutup circuit
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [delayClose, setDelayClose] = useState<boolean>(isOpen)

  useImperativeHandle(ref, () => ({
    root: listRef.current?.root || null
  }))

  useEffect(() => {
    if (listRef.current && listRef.current.root) {
      active && setCurrent?.({id: id})
    }
  }, [listRef]);

  useEffect(() => {
    if (current) {
      const activeState = current.id === id
      if (activeState) {
        setDelayIsActive(isActive)
        setIsActive(activeState)
      } else if (!activeState && isActive) {
        setDelayIsActive(isActive)
        setIsActive(activeState)
      }
    }
  }, [current]);

  useEffect(() => {
    if (isOpen) {
      animateOpen()
    } else {
      animateClose()
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isActive && delayIsActive) {
      animateInactive()
    }
  }, [isActive]);

  const clickHandler = (e: MouseEvent<HTMLLIElement>) => {
    e.stopPropagation()
    if (subEntries) {
      setIsOpen(!isOpen)
    } else {
      setCurrent?.({id: id})
      animateActive()
    }
  }

  const animateOpen = () => {
    if (!subEntryRef.current || !indicatorRef.current) return;
    const {height} = subEntryRef.current.getBoundingClientRect();
    subEntryRef.current.animate([
      {blockSize: `0`},
      {blockSize: `${height}px`}
    ], {easing: EASING.EMPHASIZED, duration: DURATION.DURATION_MEDIUM1})
    subEntryRef.current.animate([
      {opacity: '0'},
      {opacity: 1}
    ], {easing: EASING.EMPHASIZED, duration: DURATION.DURATION_LONG1})
    setDelayClose(true)
  }

  const animateClose = () => {
    if (!subEntryRef.current) return;
    const {height} = subEntryRef.current.getBoundingClientRect();
    const {paddingBlockStart} = subEntryRef.current.style
    subEntryRef.current.animate([
      {blockSize: `${height}px`, paddingBlockStart: `${paddingBlockStart}`},
      {blockSize: `0`, paddingBlockStart: `0`}
    ], {easing: EASING.EMPHASIZED_DECELERATE, duration: DURATION.DURATION_MEDIUM1})
    setDelayClose(false)
  }

  const animateActive = () => {
    if (!indicatorRef.current) return;
    indicatorRef.current.animate([
      {transform: `scaleX(0)`, opacity: 0},
      {transform: `scaleX(1)`, opacity: 1}
    ], {easing: EASING.EMPHASIZED, duration: DURATION.DURATION_SHORT4, pseudoElement: '::before'})
  }

  const animateInactive = () => {
    if (!indicatorRef.current) return;
    indicatorRef.current.animate([
      {transform: `scaleX(1)`, opacity: 1},
      {transform: `scaleX(0)`, opacity: 0}
    ], {easing: EASING.EMPHASIZED, duration: DURATION.DURATION_SHORT4, pseudoElement: '::before'})
    setDelayIsActive(false)
  }

  const DownArrow = () => (
    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
      <path d="M480-360 280-560h400L480-360Z"/>
    </svg>
  )

  const UpArrow = () => (
    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
      <path d="m280-400 200-200 200 200H280Z"/>
    </svg>
  )

  return <>
    <ListItem
      ref={listRef}
      className={c('navigation-enter', {
        'active': isActive || delayIsActive,
        'open': isOpen
      })}
      onClick={clickHandler}
      interactive={!isOpen}
      end={subEntries ? isOpen ? <UpArrow></UpArrow> : <DownArrow></DownArrow> : end}
      {...rest}
    >
      <div ref={indicatorRef} className={'indicator'}></div>
      {
        subEntries &&
        <ul ref={subEntryRef} className={c('sub-entries', {'open': isOpen || delayClose})}>
          {
            subEntries.map((e, i) => <NavigationEnter {...e} key={i}></NavigationEnter>)
          }
        </ul>
      }
    </ListItem>
  </>
}))

export default NavigationEnter;
import React, {
  forwardRef,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  MouseEvent,
  useImperativeHandle, memo
} from 'react'
import ListItem, {ListItemProps} from "../../List/ListItem";
import './NavigationEnter.scss';
import c from 'classnames'
import {IndicatorRectContext} from "../../internal/context/indicator";
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

  const {current, setCurrent} = useContext(IndicatorRectContext)
  const listRef = useRef<NavigationEnterHandle>(null);
  const subEntryRef = useRef<HTMLUListElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const animationBufferRef = useRef<Animation[]>([])

  const [isActive, setIsActive] = useState<boolean>(false)

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
      setIsActive(current.id === id)
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
    if (!delayClose) {
      cleanAnimation()
    }
  }, [delayClose]);

  const clickHandler = (e: MouseEvent<HTMLLIElement>) => {
    e.stopPropagation()
    if (subEntries) {
      setIsOpen(!isOpen)
    } else {
      setCurrent?.({id: id})
    }
  }

  const cleanAnimation = () => {
    const length = animationBufferRef.current.length
    for (let i = 0; i < length; i++) {
      const animation = animationBufferRef.current.shift()
      animation?.cancel()
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
    const animation = subEntryRef.current.animate([
      {blockSize: `${height}px`, paddingBlockStart: `${paddingBlockStart}`},
      {blockSize: `0`, paddingBlockStart: `0`}
    ], {easing: EASING.EMPHASIZED_DECELERATE, duration: DURATION.DURATION_MEDIUM1, fill: 'forwards'})
    animationBufferRef.current.push(animation)
    animation.addEventListener('finish', () => {
      setDelayClose(false)
    })
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
        'active': isActive,
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
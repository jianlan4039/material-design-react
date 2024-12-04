import React, {
  forwardRef,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  MouseEvent,
  useImperativeHandle, memo, useMemo
} from 'react'
import ListItem, {ListItemProps} from "../../List/ListItem";
import './NavigationEnter.scss';
import c from 'classnames'
import {IndicatorActiveContext} from "../../internal/context/IndicatorActiveContext";
import {EASING, DURATION} from "../../internal/motion/animation";

export interface NavigationEnterProps extends ListItemProps {
  id?: string
  active?: boolean
  subEntries?: NavigationEnterProps[]
}

export interface NavigationEnterHandle {
  container: HTMLLIElement | null
}

const NavigationEnter = memo(forwardRef<NavigationEnterHandle, NavigationEnterProps>((props, ref) => {
  const {
    id = useId(),
    subEntries,
    trailingIcon,
    value,
    ...rest
  } = props

  const {active, setActive} = useContext(IndicatorActiveContext)
  const listRef = useRef<NavigationEnterHandle>(null);
  const subEntryRef = useRef<HTMLUListElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const animationBufferRef = useRef<Animation[]>([])

  const [isActive, setIsActive] = useState<boolean>(false)

  // isOpen and preIsOpen composed to a cutup circuit
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [delayClose, setDelayClose] = useState<boolean>(isOpen)

  const SubEntries = useMemo(
    () => subEntries?.map((entry, i) =>
        <NavigationEnter key={`${entry.id}-${i}`} {...entry}></NavigationEnter>),
    [subEntries])

  useImperativeHandle(ref, () => ({
    container: listRef.current?.container || null
  }))

  useEffect(() => {
    if (listRef.current && listRef.current.container) {
      active && setActive?.({id: id, value: value})
    }
  }, [listRef.current]);

  useEffect(() => {
    if (active) {
      setIsActive(active.id === id)
    }
  }, [active]);

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
      setActive?.({id: id, value: value})
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

  return (
    <>
      <ListItem
        ref={listRef}
        className={c('navigation-enter', {
          'active': isActive,
          'open': isOpen
        })}
        onClick={clickHandler}
        interactive={!isOpen}
        trailingIcon={subEntries ? isOpen ? <UpArrow></UpArrow> : <DownArrow></DownArrow> : trailingIcon}
        {...rest}
      >
        <div ref={indicatorRef} className={'indicator'}></div>
      </ListItem>
      {
        subEntries &&
        <ul ref={subEntryRef} className={c('sub-entries', {'open': isOpen || delayClose})}>
          {SubEntries}
        </ul>
      }
    </>
  )
}))

export default NavigationEnter;
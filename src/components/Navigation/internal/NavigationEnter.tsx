import React, {forwardRef, ReactNode, useContext, useEffect, useId, useRef, useState, MouseEvent} from 'react'
import ListItem, {ListItemHandle, ListItemProps} from "../../List/ListItem";
import './NavigationEnter.scss';
import c from 'classnames'
import {IndicatorRectContext, CurrentIndicator} from "../../internal/context/indicator";
import {EASING, DURATION} from "../../internal/motion/animation";

export interface NavigationEnterProps extends ListItemProps {
  children?: ReactNode
  id?: string
  active?: boolean
  subEntries?: NavigationEnterProps[]
}

export interface NavigationEnterHandle extends ListItemHandle {

}

const NavigationEnter = forwardRef<NavigationEnterHandle, NavigationEnterProps>((props, ref) => {
  const {
    children,
    id = useId(),
    active,
    subEntries,
    end,
    ...rest
  } = props

  const {current, setCurrent, init} = useContext(IndicatorRectContext)
  const listRef = useRef<NavigationEnterHandle>(null);
  const subEntryRef = useRef<HTMLUListElement>(null);
  const [isActive, setIsActive] = useState<boolean>()
  const [isOpen, setIsOpen] = useState<boolean>(false)

  useEffect(() => {
    if (listRef.current && listRef.current.root) {
      init?.({rect: listRef.current.root.getBoundingClientRect(), id: id}, active)
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
    }
  }, [isOpen]);

  const clickHandler = (e: MouseEvent<HTMLLIElement>) => {
    e.stopPropagation()
    if (subEntries) {
      if (!isOpen) {
        setIsOpen(true)
      } else {
        animateClose()
      }
    } else {
      setCurrent?.({rect: e.currentTarget.getBoundingClientRect(), id: id})
    }
  }

  const animateOpen = () => {
    if (!subEntryRef.current) return;
    const {height} = subEntryRef.current.getBoundingClientRect();
    const blockAnimation = subEntryRef.current.animate([
      {blockSize: `0`},
      {blockSize: `${height}px`}
    ], {easing: EASING.EMPHASIZED, duration: DURATION.DURATION_MEDIUM1, fill: 'backwards'})

    const opacityAnimation = subEntryRef.current.animate([
      {opacity: '0'},
      {opacity: 1}
    ], {easing: EASING.EMPHASIZED, duration: DURATION.DURATION_LONG1, fill: 'backwards'})

    blockAnimation.addEventListener('finish', () => {
      blockAnimation.cancel()
    })
  }

  const animateClose = () => {
    if (!subEntryRef.current) return;
    const {height} = subEntryRef.current.getBoundingClientRect();
    const {paddingBlockStart} = subEntryRef.current.style
    const blockAnimation = subEntryRef.current.animate([
      {blockSize: `${height}px`, paddingBlockStart: `${paddingBlockStart}px`},
      {blockSize: `0`, paddingBlockStart: `0`}
    ], {easing: EASING.EMPHASIZED_DECELERATE, duration: DURATION.DURATION_MEDIUM1, fill: 'forwards'})

    blockAnimation.addEventListener('finish', () => {
      // blockAnimation.cancel()
      setIsOpen(false)
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
      <div className={'indicator'}></div>
      {
        subEntries && isOpen &&
        <ul ref={subEntryRef} className={'sub-entries'}>
          {
            subEntries.map((e, i) => <NavigationEnter {...e} key={i}></NavigationEnter>)
          }
        </ul>
      }
      {children}
    </ListItem>
  </>
})

export default NavigationEnter;
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
  const animationBuffer = useRef<Animation[]>([]);

  // isActive and delayActive composed to a short circuit
  const [isActive, setIsActive] = useState<boolean>(false)
  const [delayActive, setDelayActive] = useState<boolean>(isActive)

  // isOpen and delayOpen composed to a cutup circuit
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
        setIsActive(activeState)
        setDelayActive(isActive)
      } else if (!activeState && isActive) {
        setIsActive(activeState)
        setDelayActive(isActive)
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
    if (!delayClose || !delayActive) {
      cleanAnimation(animationBuffer.current)
    }
  }, [delayClose, delayActive]);

  useEffect(() => {
    if (!isActive && delayActive) {
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

  const cleanAnimation = (animationBuffer: Animation[]) => {
    const length = animationBuffer.length
    for (let i = 0; i < length; i++) {
      const animation = animationBuffer.shift()
      animation?.cancel()
    }
  }

  const animateOpen = () => {
    if (!subEntryRef.current || !indicatorRef.current) return;
    const {height} = subEntryRef.current.getBoundingClientRect();
    const blockAnimation = subEntryRef.current.animate([
      {blockSize: `0`},
      {blockSize: `${height}px`}
    ], {easing: EASING.EMPHASIZED, duration: DURATION.DURATION_MEDIUM1})
    const opacityAnimation = subEntryRef.current.animate([
      {opacity: '0'},
      {opacity: 1}
    ], {easing: EASING.EMPHASIZED, duration: DURATION.DURATION_LONG1, fill: 'backwards'})
    animationBuffer.current.push(blockAnimation, opacityAnimation)
    Promise.all([blockAnimation.finished, opacityAnimation.finished]).then(() => {
      setDelayClose(true)
    })
  }

  const animateClose = () => {
    if (!subEntryRef.current) return;
    const {height} = subEntryRef.current.getBoundingClientRect();
    const {paddingBlockStart} = subEntryRef.current.style
    const blockAnimation = subEntryRef.current.animate([
      {blockSize: `${height}px`, paddingBlockStart: `${paddingBlockStart}`},
      {blockSize: `0`, paddingBlockStart: `0`}
    ], {easing: EASING.EMPHASIZED_DECELERATE, duration: DURATION.DURATION_MEDIUM1, fill: 'forwards'})
    animationBuffer.current.push(blockAnimation)
    blockAnimation.addEventListener('finish', () => {
      setDelayClose(false)
    })
  }

  const animateActive = () => {
    if (!indicatorRef.current) return;
    const widthAnimation = indicatorRef.current.animate([
      {transform: `scaleX(0)`, opacity: 0},
      {transform: `scaleX(1)`, opacity: 1}
    ], {easing: EASING.EMPHASIZED, duration: DURATION.DURATION_SHORT4, fill: 'backwards', pseudoElement: '::before'})
    animationBuffer.current.push(widthAnimation)
  }

  const animateInactive = () => {
    if (!indicatorRef.current) return;
    const widthAnimation = indicatorRef.current.animate([
      {transform: `scaleX(1)`, opacity: 1},
      {transform: `scaleX(0)`, opacity: 0}
    ], {easing: EASING.EMPHASIZED, duration: DURATION.DURATION_SHORT4, fill: 'backwards', pseudoElement: '::before'})
    animationBuffer.current.push(widthAnimation)
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
import React, {useState, MouseEvent, FocusEvent} from "react"
import c from "classnames";
import useFocusRing from "../Focus/useFocusRing";
import useRipple from "../Ripple/useRipple";
import Elevation from "../Elevation";

type StatefulBoxProps<T extends React.ElementType> = {
  variant?: T; // 指定要渲染的 HTML 元素类型
  disabled?: boolean
  target?: HTMLElement
  focusable?: boolean
  elevatedable?: boolean
  rippleable?: boolean
} & React.ComponentPropsWithRef<T>; // 合并指定元素的原生属性，并支持 ref

type State = {
  hover?: boolean
  pressed?: boolean
  focus?: boolean
}

/**
 * This component is used to encapsulate mouse-related state effects,
 * including mouseenter, mouseleave, mousedown, mouseup, focus, and blur events.
 *
 */
const StatefulBox = React.forwardRef(<T extends React.ElementType = "div">(props: StatefulBoxProps<T>, ref: React.Ref<Element>) => {
  const {
    children,
    variant: Component = "div", // 默认渲染为 div
    target,
    className,
    disabled,
    focusable,
    elevatedable = true,
    rippleable = true,
    ...rest
  } = props

  const [state, setState] = useState<State>()
  const [FocusRing, {focusRingStart, focusRingEnd}] = useFocusRing()
  const [Ripple, {starHoverEffect, endHoverEffect, startRipple, endRipple}] = useRipple()

  const mouseDownHandler = (e: MouseEvent<HTMLElement>) => {
    if(disabled) return;
    setState(prevState => ({...prevState, pressed: true,}))
    startRipple(e)
  }

  const mouseUpHandler = () => {
    if(disabled) return;
    setState(prevState => ({...prevState, pressed: false,}))
    endRipple()
  }

  const mouseEnterHandler = () => {
    if(disabled) return;
    setState(prevState => ({...prevState, hover: true}))
    starHoverEffect()
  }

  const mouseLeaveHandler = () => {
    if(disabled) return;
    setState(prevState => ({...prevState, hover: false}))
    endHoverEffect()
  }

  const focusHandler = (e: FocusEvent) => {
    if(disabled) return;
    if (e.target.matches(':focus-visible')) {
      setState(prevState => ({...prevState, focus: true}))
      focusable && focusRingStart()
    }
  }

  const blurHandler = () => {
    if(disabled) return;
    setState(prevState => ({...prevState, focus: false}))
    focusable && focusRingEnd()
  }

  return (
    <Component
      ref={ref}
      className={c(className, {
        [`hover`]: state?.hover,
        [`pressed`]: state?.pressed,
        [`focus`]: state?.focus,
        [`disabled`]: disabled
      })}
      onMouseDown={mouseDownHandler}
      onMouseUp={mouseUpHandler}
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
      onFocus={focusHandler}
      onBlur={blurHandler}
      disabled={disabled}
      {...rest}
    >
      {elevatedable && <Elevation></Elevation>}
      {rippleable && Ripple}
      {focusable && FocusRing}
      {children}
    </Component>
  )
});

export default StatefulBox;
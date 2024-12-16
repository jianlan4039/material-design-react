import React, {useState, MouseEvent, FocusEvent, useImperativeHandle} from "react"
import c from "classnames";

type StatefulBoxProps<T extends React.ElementType> = {
  variant?: T; // 指定要渲染的 HTML 元素类型
  disabled?: boolean
} & React.ComponentPropsWithRef<T>; // 合并指定元素的原生属性，并支持 ref

type State = {
  hover?: boolean
  pressed?: boolean
  focus?: boolean
}

const StatefulBox = React.forwardRef(<T extends React.ElementType = "div">(props: StatefulBoxProps<T>, ref: React.Ref<Element>) => {
  const {
    children,
    variant: Component = "div", // 默认渲染为 div
    className,
    onMouseDown,
    onMouseUp,
    onMouseEnter,
    onMouseLeave,
    onFocus,
    onBlur,
    disabled,
    ...rest
  } = props

  const [state, setState] = useState<State>()

  const mouseDownHandler = (e: MouseEvent<T>) => {
    onMouseDown?.(e)
    setState(prevState => ({...prevState, pressed: true,}))
  }

  const mouseUpHandler = (e: MouseEvent<T>) => {
    onMouseUp?.(e)
    setState(prevState => ({ ...prevState, pressed: false,}))
  }

  const mouseEnterHandler = (e: MouseEvent<T>) => {
    onMouseEnter?.(e)
    setState(prevState => ({...prevState, hover: true}))
  }

  const mouseLeaveHandler = (e: MouseEvent<T>) => {
    onMouseLeave?.(e)
    setState(prevState => ({...prevState, hover: false}))
  }

  const focusHandler =(e: FocusEvent<T>) => {
    onFocus?.(e)
    if((e.target as unknown as HTMLElement).matches(':focus-visible')){
      setState(prevState => ({...prevState, focus: true}))
    }
  }

  const blurHandler = (e: FocusEvent<T>) => {
    onFocus?.(e)
    setState(prevState => ({...prevState, focus: false}))
  }

  return (
    <Component
      ref={ref}
      className={c(className, {
        [`${className}--hover`]: state?.hover,
        [`${className}--pressed`]: state?.pressed,
        [`${className}--focus`]: state?.focus,
        [`${className}--disabled`]: disabled
      })}
      onMouseDown={mouseDownHandler}
      onMouseUp={mouseUpHandler}
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
      onFocus={focusHandler}
      onBlur={blurHandler}
      {...rest}
    >
      {children}
    </Component>
  )
});

export default StatefulBox;
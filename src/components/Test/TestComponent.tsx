import React, {forwardRef, ReactNode} from 'react'

export interface TestComponentProps {
  children?: ReactNode
}

const TestComponent = forwardRef<HTMLDivElement, TestComponentProps>((props, ref) => {
  const {
    children,
    ...rest
  } = props

  return (
    <div ref={ref}>
      {children}
    </div>
  )
})

export default TestComponent;
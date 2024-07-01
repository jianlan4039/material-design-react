import React, {forwardRef, ReactNode} from 'react'
import './CarouselItem.scss'

export interface CarouselItemProps {
  children?: ReactNode
  width?: number
}

const CarouselItem = forwardRef<HTMLDivElement, CarouselItemProps>((props, ref) => {
  const {
    children,
    width,
    ...rest
  } = props

  return (
    <div
      ref={ref}
      className={'carousel-item'}
      style={{width: `${width}px`}}
      {...rest}
    >
      {children}
    </div>
  )
})

export default CarouselItem;

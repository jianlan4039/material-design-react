import React, {forwardRef, ReactNode} from 'react';
import c from 'classnames';

export interface CarouselProps {
  children?: ReactNode
  /**
   * The multi-browse layout shows at least one large, medium, and small carousel item.
   * The uncontained layout shows items that scroll to the edge of the container.
   * The hero layout shows at least one large item and one small item.
   * The full-screen layout shows one edge-to-edge large item.
   *
   * Large items have a customizable maximum width that's used to optimally fit carousel items into the available space.
   * Small carousel items have a minimum width of 40dp and a maximum width of 56dp.
   * Items change size as they move through the carousel layout.
   *
   */
  layout?: 'multi-browse' | 'uncontained' | 'hero' | 'full-screen'
}


const Carousel = forwardRef<HTMLDivElement, CarouselProps>((props, ref) => {
  const {
    children,
    layout,
    ...rest
  } = props

  return (
    <div
      ref={ref}
      className={c('carousel-container', {
        'layout__uncontained': layout === 'uncontained',
        'layout__hero': layout === 'hero',
        'layout__multi-browse': layout === 'multi-browse',
        'layout__full-screen': layout === 'full-screen',
      })}
      {...rest}
    >
      {children}
    </div>
  )
})

export default Carousel;

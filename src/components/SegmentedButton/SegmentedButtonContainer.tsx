import React, {HTMLAttributes, ReactNode, useEffect, useRef, useState} from 'react'
import './SegmentedButtonContainer.scss'
import { MultiSelectionContext } from './internal/context'

export interface SegmentedButtonContainerProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
  multiple?: boolean
  selectedOptions?: string[]
}

export default function SegmentedButtonContainer(props: SegmentedButtonContainerProps) {
  const {
    children,
    multiple = false,
    selectedOptions = [],
    ...rest
  } = props

  const ref = useRef<HTMLDivElement>(null);
  const [list, setList] = useState<string[]>(selectedOptions)

  const onOptionSet = (options: string[]) => {
    if (!multiple) {
      setList(options)
    } else {
      const option = options[0]
      if (list.includes(option)) {
        list.splice(list.indexOf(option), 1)
        setList([...list])
        return
      }
      setList([option, ...list])
    }
  }

  useEffect(() => {
    const widths: number[] = []
    if (ref.current) {
      const buttons: NodeListOf<HTMLElement> = ref.current.querySelectorAll(':scope > .nd-segmented-button')
      if (buttons) {
        buttons.forEach(b => {
          widths.push(b.getBoundingClientRect().width)
        })
        const maxWidth = Math.max(...widths)
        buttons.forEach(b => {
          b.style.width = `${maxWidth}px`
        })
      }
    }
  }, [ref]);

  return (
    <div ref={ref} className={'nd-segmented-button-container'} {...rest}>
      <MultiSelectionContext.Provider value={{multiple: multiple, list: list, setList: onOptionSet}}>
        {children}
      </MultiSelectionContext.Provider>
    </div>
  )
}
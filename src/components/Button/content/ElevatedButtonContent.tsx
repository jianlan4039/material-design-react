import React, {ReactNode, memo} from 'react'
import './ElevatedButtonContent.scss'

export interface ElevatedButtonContentProps {
  children?: ReactNode
}

const ElevatedButtonContent = memo((props: ElevatedButtonContentProps) => {
  const {
    children,
    ...rest
  } = props

  return <>
    <button className={'nd-elevated-button-content'}>
      A Button
    </button>
  </>
})

export default ElevatedButtonContent
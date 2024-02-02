import React, {ReactNode, memo, HTMLAttributes} from 'react'
import './ElevatedButtonContent.scss'
import {Simulate} from "react-dom/test-utils";
import click = Simulate.click;

export interface ElevatedButtonContentProps extends HTMLAttributes<HTMLButtonElement>{
  children?: ReactNode
}

const ElevatedButtonContent = memo((props: ElevatedButtonContentProps) => {
  const {
    children,
    ...rest
  } = props

  return <button className={'nd-elevated-button-content'} {...rest}>
    {children}
  </button>
})

export default ElevatedButtonContent
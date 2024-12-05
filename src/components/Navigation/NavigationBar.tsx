import React, {ReactNode, useState} from 'react';
import './NavigationBar.scss';
import Elevation from "../Elevation";
import {SelectionContextProvider} from './context'

export interface NavigationBarProps {
  children: ReactNode
  preset?: number
}

export default function NavigationBar(props: NavigationBarProps) {
  const {children} = props

  const [selected, setSelected] = useState<string[]>()

  return (
    <SelectionContextProvider config={{multiple: false}} list={selected} setList={setSelected}>
      <div className={'md-navigation-bar'}>
        <Elevation></Elevation>
        {children}
      </div>
    </SelectionContextProvider>
  )
}
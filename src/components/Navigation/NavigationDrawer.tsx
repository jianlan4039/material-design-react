import React, {ReactNode} from 'react'
import {IndicatorRectContextProvider} from "../internal/context/indicator";
import './NavigationDrawer.scss'
import NavigationEnter, {NavigationEnterProps} from "./internal/NavigationEnter";
import Divider from "../Divider/Divider";

export interface Block {
  headline: string
  items?: NavigationEnterProps[]
}

export interface NavigationDrawerProps {
  children?: ReactNode
  items?: NavigationEnterProps[]
  block?: Block
}

export default function NavigationDrawer(props: NavigationDrawerProps) {
  const {
    children,
    items,
    block,
    ...rest
  } = props

  return (
    <IndicatorRectContextProvider>
      <ul className={'navigation-drawer'}>
        {
          items?.map((enter, index) => {
            return (
              <NavigationEnter key={index} {...enter} ></NavigationEnter>
            )
          })
        }
        {
          block && <>
            <h3 className={'headline'}>{block.headline}</h3>
            {
              block.items?.map((enter, index) => {
                return (
                  <NavigationEnter key={index} {...enter} ></NavigationEnter>
                )
              })
            }
            <Divider variant={'inset'}></Divider>
          </>
        }
      </ul>
    </IndicatorRectContextProvider>
  )
}
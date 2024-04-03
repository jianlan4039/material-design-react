import {Meta, StoryObj} from "@storybook/react";
import React, {useEffect, useRef, useState} from "react";
import Menu from "../components/Menu/Menu";
import {MenuItemProps} from "../components/Menu/MenuItem";
import ElevatedButton from "../components/Button/ElevatedButton";
import {Option, OptionValue} from "../components/Menu/internal/MenuTypes";

const meta: Meta<typeof Menu> = {
  component: Menu,
  title: 'Container/Menu',
  parameters: {
    // layout: 'centered'
  },
  tags: ['autodocs']
}

export default meta;
type Story = StoryObj<typeof Menu>;

export const Default: Story = {
  render: (args) => {
    const items = [
      {label: 'Item One', value: '1'},
      {label: 'Item two', value: '2'},
      {label: 'Item three', value: '3'},
      {
        label: 'Item four',
        subMenu: [
          {label: 'Item five', value: '5'},
          {label: 'Item six', value: '6'},
          {
            label: 'Item seven',
            subMenu: [
              {label: 'item eight', value: '8'},
              {label: 'item nine', value: '9'},
            ]
          },
        ]
      },
    ]

    const [open, setOpen] = useState(false)
    const btnRef = useRef<HTMLButtonElement>(null);
    const [anchor, setAnchor] = useState<HTMLElement>()

    const clickHandler = () => {
      setOpen(!open)
    }

    const changeHandler = (value: OptionValue[]) => {
      console.log(value)
    }

    useEffect(() => {
      if (btnRef.current) {
        setAnchor(btnRef.current)
      }
    }, [btnRef]);

    return (
      <div style={{position: 'relative'}}>
        {/*<ElevatedButton onClick={clickHandler}>Open</ElevatedButton>*/}
        <button ref={btnRef} onClick={clickHandler}>Open</button>
        <Menu open={open} items={items} anchorEl={anchor} style={{minWidth: '300px'}} onChange={changeHandler}></Menu>
      </div>
    )
  }
}
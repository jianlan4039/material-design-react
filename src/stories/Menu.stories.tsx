import {Meta, StoryObj} from "@storybook/react";
import React, {useEffect, useRef, useState} from "react";
import Menu from "../components/Menu/Menu";
import {Option, OptionValue} from "../components/Menu/internal/menuTypes";
import ElevatedButton from "../components/Button/ElevatedButton";
import {FilledIcon} from "../icons";
import {FocusRingHandle} from "../components/Focus";

const meta: Meta<typeof Menu> = {
  component: Menu,
  title: 'Container/Menu',
  parameters: {},
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
    const btnRef = useRef<FocusRingHandle>(null);
    const [anchor, setAnchor] = useState<HTMLElement>()

    const clickHandler = () => {
      setOpen(!open)
    }

    const onClosed = () => {
      setOpen(false)
    }

    const changeHandler = (value: OptionValue) => {
      console.log(value)
    }

    useEffect(() => {
      if (btnRef.current && btnRef.current.parent) {
        setAnchor(btnRef.current.parent)
      }
    }, [btnRef]);

    return (
      <div style={{position: 'relative'}}>
        <ElevatedButton ref={btnRef} onClick={clickHandler}>Open</ElevatedButton>
        <Menu
          open={open}
          items={items}
          anchorEl={anchor}
          style={{minWidth: '300px'}}
          onChange={changeHandler}
          onClosed={onClosed}
        ></Menu>
      </div>
    )
  }
}
import {Meta, StoryObj} from "@storybook/react";
import React, {useEffect, useRef, useState} from "react";
import Menu from "../components/Menu/Menu";
import {MenuItemProps} from "../components/Menu/MenuItem";
import ElevatedButton from "../components/Button/ElevatedButton";

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
    const items: MenuItemProps[] = [
      {label: 'Item One'},
      {label: 'Item two'},
      {label: 'Item three'},
      {
        label: 'Item four',
        subMenu: [
          {label: 'Item five'},
          {label: 'Item six'},
          {
            label: 'Item seven',
            subMenu: [
              {label: 'item eight'},
              {label: 'item nine'},
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

    useEffect(() => {
      if (btnRef.current) {
        setAnchor(btnRef.current)
      }
    }, [btnRef]);

    return (
      <div style={{position: 'relative'}}>
        {/*<ElevatedButton onClick={clickHandler}>Open</ElevatedButton>*/}
        <button ref={btnRef} onClick={clickHandler}>Open</button>
        <Menu open={open} items={items} anchorEl={anchor} style={{minWidth: '300px'}} {...args}></Menu>
      </div>
    )
  }
}
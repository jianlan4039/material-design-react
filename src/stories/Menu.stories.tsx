import {Meta, StoryObj} from "@storybook/react";
import React, {useEffect, useRef, useState} from "react";
import Menu from "../components/Menu/Menu";

const meta: Meta<typeof Menu> = {
  component: Menu,
  title: 'Container/Menu',
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
}

export default meta;
type Story = StoryObj<typeof Menu>;

export const Primary: Story = {
  render: (args) => {
    const {
      menuCorner = 'start_start',
      anchorCorner = 'end_start',
    } = args
    const [open, setOpen] = useState(false)
    const btnRef = useRef<HTMLButtonElement>(null);
    const [anchor, setAnchor] = useState<HTMLElement>()

    const clickHandler = () => {
      setOpen(!open)
    }

    const closeHandler = () => {
      setOpen(false)
    }

    useEffect(() => {
      btnRef.current && setAnchor(btnRef.current)
    }, [btnRef]);

    return (
      <div>
          <span style={{position: 'relative'}}>
          <button ref={btnRef} onClick={clickHandler}>Open Menu</button>
          <Menu
            anchorEl={anchor}
            menuCorner={menuCorner}
            anchorCorner={anchorCorner}
            open={open}
            menuItems={[
              {label: 'Item 1'},
              {label: 'Item 2'},
              {label: 'Item 3'}
            ]}
          />
        </span>
      </div>
    )
  }
}
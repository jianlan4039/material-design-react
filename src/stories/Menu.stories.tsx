import {Meta, StoryObj} from "@storybook/react";
import React, {useRef, useState} from "react";
import Menu from "../components/Menu/Menu";
import SubMenu from "../components/Menu/SubMenu";
import MenuItem from "../components/Menu/MenuItem";
import {Corner} from "../components/internal/alignment/geometry";

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

export const Default: Story = {
  render: (args) => {

    const [open, setOpen] = useState(false)
    const btnRef = useRef<HTMLButtonElement>(null);

    const clickHandler = () => {
      setOpen(!open)
    }

    const closeHandler = () => {
      setOpen(false)
    }

    return (
      <div>
        <span style={{position: 'relative'}}>
          <button ref={btnRef} onClick={clickHandler}>Open Menu</button>
          <Menu
            anchorEl={btnRef.current}
            menuCorner={Corner.START_START}
            anchorCorner={Corner.END_START}
            open={open}
            onClose={closeHandler}
          >
            <MenuItem>Item 1</MenuItem>
            <MenuItem>Item 2</MenuItem>
            <MenuItem>Item 3</MenuItem>
          </Menu>
        </span>
      </div>
    )
  }
}

export const WithSubMenuUsage = {
  render: () => {

    const [open, setOpen] = useState(false)
    const btnRef = useRef<HTMLButtonElement>(null);

    const clickHandler = () => {
      setOpen(!open)
    }

    const closeHandler = () => {
      setOpen(false)
    }

    return <span style={{position: 'relative'}}>
      <button ref={btnRef} onClick={clickHandler}>Open Menu</button>
      <Menu
        anchorEl={btnRef.current}
        open={open}
        onClose={closeHandler}
      >
        <MenuItem>Item 1</MenuItem>
        <MenuItem>Item 2</MenuItem>
        <SubMenu
          menuItem={<MenuItem>Item 3</MenuItem>}
        >
          <MenuItem>Item 4</MenuItem>
          <MenuItem>Item 5</MenuItem>
          <MenuItem>Item 6</MenuItem>
        </SubMenu>
      </Menu>
    </span>
  }
}
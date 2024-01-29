import {Meta, StoryObj} from "@storybook/react";
import React, {useState} from "react";
import Menu from "../components/Menu/Menu";
import MenuItem from "../components/Menu/MenuItem";

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
  render: () => {

    const [open, setOpen] = useState(false)

    const clickHandler = () => {
      setOpen(!open)
    }

    return (
      <Menu
        open={open}
        menuItems={[
          { label: 'Lorem ipsum' },
          { label: "Lorem ipsum dolor sit amet"},
          { label: "Lorem ipsum dolor sit"}
        ]}
      >
        <button onClick={clickHandler}>Open Menu</button>
      </Menu>
    )
  }
}
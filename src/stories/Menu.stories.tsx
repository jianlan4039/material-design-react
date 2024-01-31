import {Meta, StoryObj} from "@storybook/react";
import React, {useState} from "react";
import Menu from "../components/Menu/Menu";
import MenuItem from "../components/Menu/MenuItem";
import ElevatedButton from "../components/Button/ElevatedButton";

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

    const closeHandler = () => {
      setOpen(false)
    }

    return (
      <>
        <ElevatedButton>Another One</ElevatedButton>
        <Menu
          open={open}
          onClose={closeHandler}
          menuItems={[
            { label: 'Lorem ipsum' },
            { label: "Lorem ipsum dolor sit amet"},
            { label: "Lorem ipsum dolor sit"}
          ]}
        >
          <button onClick={clickHandler}>Open Menu</button>
        </Menu>
      </>
    )
  }
}
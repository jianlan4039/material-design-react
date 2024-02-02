import {Meta, StoryObj} from "@storybook/react";
import React, {useState} from "react";
import Menu from "../components/Menu/Menu";
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
  render: (args) => {

    const [open, setOpen] = useState(false)

    const clickHandler = () => {
      setOpen(!open)
    }

    const closeHandler = () => {
      setOpen(false)
    }

    return (
      <>
        <ElevatedButton onClick={clickHandler}>Open Menu</ElevatedButton>
        <Menu
          open={open}
          menuItems={[
            {label: 'Item 1'},
            {label: 'Item 2'},
            {label: 'Item 3'}
          ]}
        />
      </>
    )
  }
}
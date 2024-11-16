import {Meta, StoryObj} from "@storybook/react";
import {IconButton} from "../index";
import React from "react";

const meta: Meta = {
  title: "IconButton/IconButton",
  component: IconButton,
  args: ['autodocs']
}

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Primary: Story = {
  render: () => (
    <IconButton>
      <span className={'material-icons-round'}>home</span>
    </IconButton>
  )
}
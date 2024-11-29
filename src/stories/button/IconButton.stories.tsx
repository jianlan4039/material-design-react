import {Meta, StoryObj} from "@storybook/react";
import {IconButton} from "../../index";
import React from "react";

const meta: Meta = {
  title: "IconButton/IconButton",
  component: IconButton,
  args: ['autodocs']
}

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Primary: Story = {
  args: {
    icon: <span className={'material-icons-round'}>home</span>
  }
}
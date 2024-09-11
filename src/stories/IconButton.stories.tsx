import {Meta, StoryObj} from "@storybook/react";
import {IconButton} from "../index";
import React from "react";

const meta: Meta = {
  title: "Button/IconButton",
  component: IconButton,
  args: ['autodocs']
}

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Primary: Story = {
  args: {
    icon: <span className="material-icons-outlined">arrow_back_ios</span>
  }
}
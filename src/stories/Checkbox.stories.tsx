import {Meta, StoryObj} from "@storybook/react";
import React from "react";
import Checkbox from "../components/Checkbox/Checkbox";

const meta: Meta<typeof Checkbox> = {
  component: Checkbox,
  title: 'Form/Checkbox',
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
}

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default:Story = {
    render: (args) => {

        return (
            <Checkbox error={false} {...args}></Checkbox>
        )
    }
}
import {Meta, StoryObj} from "@storybook/react";
import React from "react";
import Switch from "../components/Switch/Switch";
import {FilledIcon} from "../icons";

const meta: Meta<typeof Switch> = {
  component: Switch,
  title: 'Form/Switch',
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
}

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  render: (args) => {
    return (
      <Switch
        icon={<FilledIcon>check</FilledIcon>}
        uncheckedIcon={<FilledIcon>close</FilledIcon>}
      ></Switch>
    )
  }
}
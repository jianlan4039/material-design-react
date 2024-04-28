import {Meta, StoryObj} from "@storybook/react";
import React from "react";
import NavigationRail from "../components/Navigation/NavigationRail";
import {FilledIcon} from "../icons";

const meta: Meta<typeof NavigationRail> = {
  component: NavigationRail,
  title: 'Navigation/NavigationRail',
  parameters: {
    //layout: 'centered'
  }
}

export default meta;
type Story = StoryObj<typeof NavigationRail>;

export const Default: Story = {
  render: (args) => {
    const items = [
      {label: 'Home', icon: <FilledIcon>home</FilledIcon>},
      {label: 'User', icon: <FilledIcon>person</FilledIcon>},
      {label: 'Settings', icon: <FilledIcon>settings</FilledIcon>},
    ]

    const icon = <FilledIcon>menu</FilledIcon>

    return (
      <NavigationRail items={items}></NavigationRail>
    )
  }
}
import {Meta, StoryObj} from "@storybook/react";
import React from "react";
import NavigationBar, {Item} from "../components/Navigation/NavigationBar";
import {FilledIcon} from "../icons";

const meta: Meta<typeof NavigationBar> = {
  component: NavigationBar,
  title: 'Container/NavigationBar',
  parameters: {
    layout: 'centered'
  },
}

export default meta;
type Story = StoryObj<typeof NavigationBar>;

export const Default: Story = {
  render: (args) => {
    const items: Item[] = [
      {label: 'Home', icon: <FilledIcon>home</FilledIcon>},
      {label: 'User', icon: <FilledIcon>person</FilledIcon>, active: true},
      {label: 'Search', icon: <FilledIcon>search</FilledIcon>},
      {label: 'Favorite', icon: <FilledIcon>favorite</FilledIcon>}
    ]
    return (
      <NavigationBar items={items} order={0}></NavigationBar>
    )
  }
}
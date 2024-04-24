import {Meta, StoryObj} from "@storybook/react";
import React from "react";
import NavigationDrawer from "../components/Navigation/NavigationDrawer";
import {FilledIcon} from "../icons";

const meta: Meta<typeof NavigationDrawer> = {
  component: NavigationDrawer,
  title: 'Navigation/NavigationDrawer',
  parameters: {
    //layout: 'centered'
  }
}

export default meta;
type Story = StoryObj<typeof NavigationDrawer>;

export const Default: Story = {
  render: (args) => {

    const items = [
      {
        label: 'Inbox',
        start: <FilledIcon>inbox</FilledIcon>
      },
      {
        label: 'Home',
        start: <FilledIcon>home</FilledIcon>
      },
      {
        label: 'User',
        start: <FilledIcon>person</FilledIcon>
      }
    ]

    return (
      <NavigationDrawer items={items}></NavigationDrawer>
    )
  }
}

export const WithHeadline: Story = {
  render: (args) => {

    const block = {
      headline: 'User',
      items: [
        {
          label: 'Inbox',
          start: <FilledIcon>inbox</FilledIcon>
        },
        {
          label: 'Home',
          start: <FilledIcon>home</FilledIcon>
        },
        {
          label: 'User',
          start: <FilledIcon>person</FilledIcon>
        }
      ]
    }

    return (
      <NavigationDrawer block={block}></NavigationDrawer>
    )
  }
}
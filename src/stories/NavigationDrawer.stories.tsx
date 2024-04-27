import {Meta, StoryObj} from "@storybook/react";
import React, {useState} from "react";
import NavigationDrawer from "../components/Navigation/NavigationDrawer";
import {FilledIcon} from "../icons";
import ElevatedButton from "../components/Button/ElevatedButton";

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
        start: <FilledIcon>inbox</FilledIcon>,
        active: true
      },
      {
        label: 'User',
        start: <FilledIcon>person</FilledIcon>,
        subEntries: [
          {label: 'favorite', start: <FilledIcon>favorite</FilledIcon>},
          {label: 'favorite', start: <FilledIcon>favorite</FilledIcon>},
          {label: 'favorite', start: <FilledIcon>favorite</FilledIcon>},
          {label: 'favorite', start: <FilledIcon>favorite</FilledIcon>},
          {label: 'favorite', start: <FilledIcon>favorite</FilledIcon>},
        ]
      },
      {
        label: 'Home',
        start: <FilledIcon>home</FilledIcon>
      },
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

export const WithHeadlineModeled: Story = {
  render: () => {

    const [isShow, setIsShow] = useState<boolean>(false)

    const block = {
      headline: 'User',
      items: [
        {
          label: 'Inbox',
          start: <FilledIcon>inbox</FilledIcon>,
          active: true
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

    const clickHandler = () => {
      setIsShow(!isShow)
    };

    const closeHandle = () => {
      setIsShow(false)
    };

    return (
      <>
        <ElevatedButton onClick={clickHandler}>Toggle</ElevatedButton>
        <NavigationDrawer block={block} modal={true} show={isShow} onClose={closeHandle}></NavigationDrawer>
      </>
    )
  }
}
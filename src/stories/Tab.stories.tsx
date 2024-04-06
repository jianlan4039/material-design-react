import {Meta, StoryObj} from "@storybook/react";
import React from "react";
import Tabs from "../components/Tab/Tabs";
import PrimaryTab from "../components/Tab/PrimaryTab";
import SecondaryTab from "../components/Tab/SecondaryTab";
import {FilledIcon} from "../icons";

const meta: Meta<typeof Tabs> = {
  component: Tabs,
  title: 'Container/Tabs',
  parameters: {
    // layout: 'centered'
  },
  tags: ['autodocs']
}

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Primary: Story = {
  render: (args) => {

    return (
      <Tabs>
        <PrimaryTab text={'Lorem.'}></PrimaryTab>
        <PrimaryTab text={'Lorem ipsum.'}></PrimaryTab>
        <PrimaryTab text={'Lorem ipsum dolor.'}></PrimaryTab>
      </Tabs>
    )
  }
}

export const PrimaryWithIcon: Story = {
  render: (args) => {

    return (
      <Tabs>
        <PrimaryTab text={'Lorem.'} icon={<FilledIcon>edit</FilledIcon>}></PrimaryTab>
        <PrimaryTab text={'Lorem ipsum.'} icon={<FilledIcon>home</FilledIcon>}></PrimaryTab>
        <PrimaryTab text={'Lorem ipsum dolor.'} icon={<FilledIcon>check</FilledIcon>}></PrimaryTab>
      </Tabs>
    )
  }
}

export const PrimaryWithIconInline: Story = {
  render: (args) => {
    return (
      <Tabs>
        <PrimaryTab text={'Lorem.'} icon={<FilledIcon>edit</FilledIcon>} inline></PrimaryTab>
        <PrimaryTab text={'Lorem ipsum.'} icon={<FilledIcon>home</FilledIcon>} inline></PrimaryTab>
        <PrimaryTab text={'Lorem ipsum dolor.'} icon={<FilledIcon>check</FilledIcon>} inline></PrimaryTab>
      </Tabs>
    )
  }
}

export const Secondary: Story = {
  render: (args) => {

    return (
      <Tabs>
        <SecondaryTab text={'Lorem.'}></SecondaryTab>
        <SecondaryTab text={'Lorem ipsum.'}></SecondaryTab>
        <SecondaryTab text={'Lorem ipsum dolor.'}></SecondaryTab>
      </Tabs>
    )
  }
}

export const SecondaryWithIcon: Story = {
  render: (args) => {

    return (
      <Tabs>
        <SecondaryTab text={'Lorem.'} icon={<FilledIcon>edit</FilledIcon>}></SecondaryTab>
        <SecondaryTab text={'Lorem ipsum.'} icon={<FilledIcon>edit</FilledIcon>}></SecondaryTab>
        <SecondaryTab text={'Lorem ipsum dolor.'} icon={<FilledIcon>edit</FilledIcon>}></SecondaryTab>
      </Tabs>
    )
  }
}

export const SecondaryWithIconInline: Story = {
  render: (args) => {

    return (
      <Tabs>
        <SecondaryTab text={'Lorem.'} icon={<FilledIcon>edit</FilledIcon>} inline></SecondaryTab>
        <SecondaryTab text={'Lorem ipsum.'} icon={<FilledIcon>edit</FilledIcon>} inline></SecondaryTab>
        <SecondaryTab text={'Lorem ipsum dolor.'} icon={<FilledIcon>edit</FilledIcon>} inline></SecondaryTab>
      </Tabs>
    )
  }
}
import {Meta, StoryObj} from "@storybook/react";
import React from "react";
import List from "../components/List/List";
import ListItem from "../components/List/ListItem";
import {FilledIcon} from "../icons";

const meta: Meta<typeof List> = {
  component: List,
  title: 'Container/List',
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
}

export default meta;
type Story = StoryObj<typeof List>;

export const Default: Story = {
  render: (args) => {

    return (
      <List {...args}>
        <ListItem
          disabled
          label={'Item 1'}
          leading={<FilledIcon>home</FilledIcon>}
          trailing={<FilledIcon>check</FilledIcon>}
          supportingText={'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis, pariatur.'}
        ></ListItem>
      </List>
    )
  }
}
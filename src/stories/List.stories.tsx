import {Meta, StoryObj} from "@storybook/react";
import React from "react";
import ListItem from "../components/List/ListItem";
import {FilledIcon} from "../icons";
import List from "../components/List/List";

const meta: Meta<typeof ListItem> = {
  component: ListItem,
  title: 'Container/ListItem',
  parameters: {
    // layout: 'centered'
  },
  tags: ['autodocs']
}

export default meta;
type Story = StoryObj<typeof ListItem>;

export const Default: Story = {
  render: ({
             label = 'Label',
             supportingText = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aliquid commodi earum eos esse perferendis provident quibusdam repudiandae sunt temporibus.',
             ...rest
           }) => {

    return (
      <List style={{maxWidth: '300px'}}>
        <ListItem
          start={<FilledIcon>home</FilledIcon>}
          end={<FilledIcon>check</FilledIcon>}
          label={label}
          supportingText={supportingText}
          interactive={true}
          {...rest}
        ></ListItem>
      </List>
    )
  }
}


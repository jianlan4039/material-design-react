import {Meta, StoryObj} from "@storybook/react";
import React from "react";
import TextButton from "../components/Button/TextButton";
import {FilledIcon} from "../icons";

const meta: Meta<typeof TextButton> = {
  component: TextButton,
  title: 'Button/TextButton',
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
}

export default meta;
type Story = StoryObj<typeof TextButton>;

export const Primary: Story = {

  render: () => {
    return <TextButton icon={<FilledIcon>add</FilledIcon>}>Text</TextButton>
  }
}
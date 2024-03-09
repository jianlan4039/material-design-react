import {Meta, StoryObj} from "@storybook/react";
import React from "react";
import {FilledIcon} from "../icons";
import FilledTextField from "../components/TextField/FilledTextField";

const meta: Meta<typeof FilledTextField> = {
  component: FilledTextField,
  title: 'Field/FilledTextField',
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
}

export default meta;
type Story = StoryObj<typeof FilledTextField>;

export const Filled: Story = {
  render: ({disabled, error = false}) => {

    return (
      <FilledTextField
        leading={<FilledIcon>home</FilledIcon>}
        trailing={<FilledIcon>edit</FilledIcon>}
        // prefix={'$'}
        // suffix={'.00'}
        label={'Label'}
        supportingText={'Supporting text'}
        disabled={disabled}
        error={error}
      ></FilledTextField>
    )
  }
}
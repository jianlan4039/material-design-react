import {Meta, StoryObj} from "@storybook/react";
import React from "react";
import {FilledIcon} from "../icons";
import OutlinedTextField from "../components/TextField/OutlinedTextField";

const meta: Meta<typeof OutlinedTextField> = {
  component: OutlinedTextField,
  title: 'Field/OutlinedField',
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
}

export default meta;
type Story = StoryObj<typeof OutlinedTextField>;

export const Default:Story = {
    render: ({error, disabled}) => {

        return (
            <OutlinedTextField
              leading={<FilledIcon>home</FilledIcon>}
              trailing={<FilledIcon>edit</FilledIcon>}
              // prefix={'$'}
              // suffix={'.00'}
              label={'Label'}
              supportingText={'Supporting text'}
              disabled={disabled}
              error={error}
            ></OutlinedTextField>
        )
    }
}
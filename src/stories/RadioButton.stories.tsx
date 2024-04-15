import {Meta, StoryObj} from "@storybook/react";
import React from "react";
import RadioButton from "../components/RadioButton/RadioButton";
import RadioGroup from "../components/RadioButton/RadioGroup";

const meta: Meta<typeof RadioButton> = {
  component: RadioButton,
  title: 'Form/RadioButton',
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
}

export default meta;
type Story = StoryObj<typeof RadioButton>;

export const Default: Story = {
  render: (args) => {
    return (
      <RadioGroup>
        <RadioButton id={'contactChoice1'} name={'contact'} value={'email'}></RadioButton>
        <RadioButton id="contactChoice2" name="contact" value="phone"></RadioButton>
        <RadioButton id="contactChoice3" name="contact" value="mail"> </RadioButton>
      </RadioGroup>
    )
  }
}
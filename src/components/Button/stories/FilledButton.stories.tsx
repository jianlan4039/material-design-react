import {Meta, StoryObj} from '@storybook/react';
import {FilledButton} from "../../../index";

export default {
  component: FilledButton,
  title: "Common Buttons/Filled Button",
  args: {
    label: "Filled Button"
  },
  parameters: {
    layout: "centered",
  },
  tags: ['autodocs'],
} as Meta

type Story = StoryObj<typeof FilledButton>;

export const Default: Story = {}

export const WithIcon: Story = {
  args: {
    icon: <span className={'material-icons'}>home</span>
  }
}
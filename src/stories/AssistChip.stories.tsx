import {Meta, StoryObj} from '@storybook/react';
import './styles'
import {AssistChip} from "../index";

const meta: Meta = {
  title: 'Chip/AssistChip',
  component: AssistChip,
  tags: ['autodocs']
}

export default meta;
type Story = StoryObj<typeof AssistChip>;

export const Primary: Story = {
  args: {
    label: 'Assist Chip',
    elevated: false,
    disabled: false,
  }
}
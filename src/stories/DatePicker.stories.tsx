import {Meta, StoryObj} from '@storybook/react';
import './styles'
import {DatePicker} from "../index";

const meta: Meta = {
  title: 'Form/DatePicker',
  component: DatePicker,
  tags: ['autotags']
}

export default meta;

type Story = StoryObj<typeof DatePicker>;

export const Primary: Story = {
  args: {
    format: 'yyyy-mm-dd'
  }
}
import {Meta, StoryObj} from '@storybook/react';
import './styles'
import {FilterChip} from "../index";

const meta: Meta = {
  title: 'Chip/Filter Chip',
  component: FilterChip,
  tags: ['autodocs']
}

export default meta;
type Story = StoryObj<typeof FilterChip>;

export const Primary: Story = {
  args: {
    label: 'Filter Chip',
    elevated: false,
    disabled: false,
    icon: <span className={"material-icons-round"}>home</span>
  }
}
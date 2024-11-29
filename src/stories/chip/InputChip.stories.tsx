import {Meta, StoryObj} from '@storybook/react';
import '../styles'
import {InputChip} from "../../index";

const meta: Meta = {
  title: 'Chip/Input Chip',
  component: InputChip,
  tags: ['autodocs']
}

export default meta;
type Story = StoryObj<typeof InputChip>;

export const Primary: Story = {
  args: {
    label: 'Filter Chip',
    disabled: false,
    icon: <span className={"material-icons-round"}>home</span>
  }
}
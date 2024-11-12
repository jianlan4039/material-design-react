import {Meta, StoryObj} from '@storybook/react';
import './styles'
import {SuggestionChip} from "../index";

const meta: Meta = {
  title: 'Chip/Suggestion Chip',
  component: SuggestionChip,
  tags: ['autodocs']
}

export default meta;
type Story = StoryObj<typeof SuggestionChip>;

export const Primary: Story = {
  args: {
    label: 'Suggestion Chip',
    elevated: false,
    disabled: false,
    icon: <span className={"material-icons-round"}>home</span>
  }
}
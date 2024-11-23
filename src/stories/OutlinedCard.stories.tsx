import {Meta, StoryObj} from '@storybook/react';
import './styles'
import {OutlinedCard} from "../index";

const meta: Meta = {
  title: 'Card/Outlined Card',
  component: OutlinedCard,
  tags: ['autodocs']
}

export default meta;
type Story = StoryObj<typeof OutlinedCard>;

export const Primary: Story = {

}
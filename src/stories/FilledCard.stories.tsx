import {Meta, StoryObj} from '@storybook/react';
import './styles'
import {FilledCard} from "../index";

const meta: Meta = {
  title: 'Card/Filled Card',
  component: FilledCard,
  tags: ['autodocs']
}

export default meta;
type Story = StoryObj<typeof FilledCard>;

export const Primary: Story = {

}
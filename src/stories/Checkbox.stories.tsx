import {Meta, StoryObj} from '@storybook/react';
import './styles';
import {Checkbox} from "../index";

const meta: Meta = {
  title: 'Form/checkbox',
  component: Checkbox,
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Primary: Story = {}
import {Meta, StoryObj} from "@storybook/react";
import {Switch} from "../index";

const meta: Meta = {
  title: 'Form/Switch',
  component: Switch,
  tags: ['autodocs']
}

export default meta;
type Story = StoryObj<typeof Switch>

export const Primary: Story = {
  render: () => (
    <Switch></Switch>
  )
}
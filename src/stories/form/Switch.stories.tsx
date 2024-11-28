import {Meta, StoryObj} from "@storybook/react";
import {Switch} from "../../index";

const meta: Meta = {
  title: 'Form/Switch',
  component: Switch,
  tags: ['autodocs']
}

export default meta;
type Story = StoryObj<typeof Switch>

export const Primary: Story = {
  render: () => (
    <Switch
      icon={<span className={'material-icons'}>check</span>}
      uncheckedIcon={<span className={'material-icons'}>home</span>}
    ></Switch>
  )
}

export const withCheckIcon: Story = {
  render: () => (
    <Switch
      icon={<span className={'material-icons'}>check</span>}
    ></Switch>
  )
}

export const withUncheckIcon: Story = {
  render: () => (
    <Switch
      uncheckedIcon={<span className={'material-icons'}>home</span>}
    ></Switch>
  )
}
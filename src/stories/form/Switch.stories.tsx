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
  render: ({disabled}) => (
    <Switch disabled={disabled}></Switch>
  )
}

export const withCheckIcon: Story = {
  render: ({disabled}) => (
    <Switch
      disabled={disabled}
      icon={<span className={'material-icons'}>check</span>}
    ></Switch>
  )
}

export const withUncheckIcon: Story = {
  render: ({disabled}) => (
    <Switch
      disabled={disabled}
      uncheckedIcon={<span className={'material-icons'}>home</span>}
    ></Switch>
  )
}
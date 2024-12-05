import {Meta, StoryObj} from "@storybook/react";
import NavigationAction from "../../components/Navigation/NavigationAction";

const meta: Meta = {
  title: "Navigation/Action",
  component: NavigationAction,
  parameters: {
    layout: "centered"
  }
}

export default meta;
type Story = StoryObj<typeof NavigationAction>

export const Primary: Story = {
  args: {
    icon: <span className={'material-icons'}>home</span>,
    label: "Home",
  }
}
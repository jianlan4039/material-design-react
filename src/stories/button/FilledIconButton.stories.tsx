import {Meta, StoryObj} from "@storybook/react";
import {FilledIconButton} from "../../index";

const meta: Meta = {
  title: 'IconButton/Filled Icon Button',
  component: FilledIconButton,
  tags: ['autodocs']
}

export default meta;
type Story = StoryObj<typeof FilledIconButton>;

export const Primary: Story = {
  args: {
    icon: <span className={"material-icons"}>home</span>,
    toggled: false
  }
}
import {Meta, StoryObj} from "@storybook/react";
import {Badge, FilledIconButton, IconButton} from "../index";

const meta: Meta = {
  title: "Badge",
  component: Badge,
  tags: ['autodocs']
}

export default meta;

type Story = StoryObj<typeof Badge>;

export const Primary: Story = {
  render: () => {
    return (
      <Badge count={5}>
        <span className={'material-icons'}>home</span>
      </Badge>
    )
  }
}
import {Meta, StoryObj} from "@storybook/react";
import {Badge, FilledIconButton, IconButton} from "../index";

const meta: Meta = {
  title: "Badge",
  component: Badge,
  tags: ['autodocs']
}

export default meta;

type Story = StoryObj<typeof Badge>;

export const Small: Story = {
  render: () => {
    return (
      <Badge count={5}>
        <span className={'material-icons'}>home</span>
      </Badge>
    )
  }
}

export const Large: Story = {
  render: ({count = 10, size = "large"}) => {
    return (
      <Badge count={count} size={size}>
        <span className="material-icons">home</span>
      </Badge>
    )
  }
}

export const withIconButton: Story = {
  render: ({count = 10, size = "large"}) => {
    return (
      <Badge count={count} size={size}>
        <IconButton>
          <span className={'material-icons'}>home</span>
        </IconButton>
      </Badge>
    )
  }
}
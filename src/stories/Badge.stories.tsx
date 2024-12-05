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
  render: ({size = "small", count = 2, ...rest}) => {
    return (
      <Badge size={size} count={count} {...rest}>
        <span className={'material-icons'}>home</span>
      </Badge>
    )
  }
}

export const Large: Story = {
  render: ({count = 10, size = "large", ...rest}) => {
    return (
      <Badge count={count} size={size} {...rest}>
        <span className="material-icons">home</span>
      </Badge>
    )
  }
}

export const withIconButton: Story = {
  render: ({count = 10, size = "large", ...rest}) => {
    return (
      <IconButton>
        <Badge count={count} size={size} {...rest}>
          <span className={'material-icons'}>home</span>
        </Badge>
      </IconButton>

    )
  }
}
import {Meta, StoryObj} from "@storybook/react";
import {OutlinedIconButton} from "../index";

const meta:Meta = {
  title: "IconButton/OutlinedIconButton",
  component: OutlinedIconButton,
  tags: ['autodocs']
}

export default meta;
type Story = StoryObj<typeof OutlinedIconButton>;

export const Primary: Story = {
  render: () => (
    <OutlinedIconButton>
      <span className={"material-icons-round"}>home</span>
    </OutlinedIconButton>
  )
}
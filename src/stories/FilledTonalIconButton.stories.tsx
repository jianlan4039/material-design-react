import {Meta, StoryObj} from "@storybook/react";
import {FilledTonalIconButton} from "../index";

const meta: Meta = {
  title: "IconButton/Filled Tonal Icon Button",
  component: FilledTonalIconButton,
  tags: ['autodocs']
}

export default meta;
type Story = StoryObj<typeof FilledTonalIconButton>;

export const Primary: Story = {
  render: () => {

    return (
      <FilledTonalIconButton>
        <span className={"material-icons-round"}>home</span>
      </FilledTonalIconButton>
    )
  }
}
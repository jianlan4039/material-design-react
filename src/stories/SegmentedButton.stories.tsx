import {Meta, StoryObj} from "@storybook/react";
import './styles';
import {SegmentedButton, SegmentedButtonContainer} from "../index";

const meta: Meta = {
  title: "Button/Segmented Button",
  component: SegmentedButtonContainer
}

export default meta;
type Story = StoryObj<typeof SegmentedButtonContainer>;

export const Primary: Story = {
  args: {
    children: (<>
      <SegmentedButton>Apple</SegmentedButton>
      <SegmentedButton>Peach</SegmentedButton>
      <SegmentedButton>Orange</SegmentedButton>
      <SegmentedButton>Watermelon</SegmentedButton>
    </>)
  }
}
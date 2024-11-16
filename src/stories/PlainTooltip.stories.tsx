import {Meta, StoryObj} from "@storybook/react";
import {ElevatedButton, PlainTooltips} from "../index";
import PlainTooltip from "../components/Tooltip/PlainTooltip";

const meta: Meta = {
  title: "Utilities/PlainTooltip",
  component: PlainTooltips,
  tags: ['autodocs']
}

export default meta;
type Story = StoryObj<typeof PlainTooltips>

export const Primary = {
  render: () => {

    return (
      <PlainTooltips text={"Lorem ipsum dolor sit amet."}>
        <ElevatedButton>Help</ElevatedButton>
      </PlainTooltips>
    )
  }
}
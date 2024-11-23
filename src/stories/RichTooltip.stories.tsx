import {Meta, StoryObj} from "@storybook/react";
import {ElevatedButton, RichTooltips} from "../index";

const meta: Meta = {
  title: "Utilities/RichTooltip",
  component: RichTooltips,
  tags: ['autodocs']
}

export default meta;
type Story = StoryObj<typeof RichTooltips>

export const Primary = {
  render: () => {

    return (
      <RichTooltips supportingText={"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita, temporibus."}>
        <ElevatedButton>Help</ElevatedButton>
      </RichTooltips>
    )
  }
}
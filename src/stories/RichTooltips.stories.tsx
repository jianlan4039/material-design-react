import {Meta, StoryObj} from "@storybook/react";
import React from "react";
import RichTooltip from "../components/Tooltip/RichTooltip";
import ElevatedButton from "../components/Button/ElevatedButton";
import TextButton from "../components/Button/TextButton";

const meta: Meta<typeof RichTooltip> = {
  component: RichTooltip,
  title: 'Container/RichTooltip',
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
}

export default meta;
type Story = StoryObj<typeof RichTooltip>;

export const Default: Story = {
  render: (args) => {
    return (
      <RichTooltip
        subhead={'Lorem ipsum.'}
        supportingText={'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis dicta dolore est fuga ipsam laboriosam maxime necessitatibus repudiandae temporibus veritatis!'}
        action={<>
          <TextButton>Action</TextButton>
        </>}
      >
        <ElevatedButton>Rich Tooltips</ElevatedButton>
      </RichTooltip>
    )
  }
}
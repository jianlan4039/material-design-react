import {Meta, StoryObj} from "@storybook/react";
import React, {useEffect, useRef, useState} from "react";
import PlainTooltip from "../components/Tooltip/PlainTooltip";
import ElevatedButton from "../components/Button/ElevatedButton";

const meta: Meta<typeof PlainTooltip> = {
  component: PlainTooltip,
  title: 'Container/PlainTooltip',
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
}

export default meta;
type Story = StoryObj<typeof PlainTooltip>;

export const Default: Story = {
  render: (args) => {

    return (
      <PlainTooltip text={'Lorem ipsum dolor sit amet.'}>
        <ElevatedButton>Tips</ElevatedButton>
      </PlainTooltip>
    )
  }
}
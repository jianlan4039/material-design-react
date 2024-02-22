import {Meta, StoryObj} from "@storybook/react";
import React from "react";
import SegmentedButton from "../components/SegmentedButton/SegmentedButton";
import SegmentedButtonContainer from "../components/SegmentedButton/SegmentedButtonContainer";
import {FilledIcon} from "../icons";

const meta: Meta<typeof SegmentedButton> = {
  component: SegmentedButton,
  title: 'Button/SegmentedButton',
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
}

export default meta;
type Story = StoryObj<typeof SegmentedButton>;

export const Default: Story = {

  render: (args) => {
    return <SegmentedButtonContainer multiple={true} selectedOptions={['selected']}>
      <SegmentedButton ndId={'enabled'}>Enabled</SegmentedButton>
      <SegmentedButton ndId={'selected'} icon={<FilledIcon>check</FilledIcon>}>Selected</SegmentedButton>
      <SegmentedButton ndId={'disabled'}>Disabled</SegmentedButton>
    </SegmentedButtonContainer>
  }
}
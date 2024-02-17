import {Meta, StoryObj} from "@storybook/react";
import React from "react";
import BrandedFAB from "../components/FAB/BrandedFAB";
import {FilledIcon} from "../icons";

const meta: Meta<typeof BrandedFAB> = {
  component: BrandedFAB,
  title: 'FAB/BrandedFAB',
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
}

export default meta;
type Story = StoryObj<typeof BrandedFAB>;

export const Default: Story = {
  render: ({large, label = 'Branded'}) => {
    return <BrandedFAB
      label={label}
      large={large}
      icon={<FilledIcon>add</FilledIcon>}
    ></BrandedFAB>
  }
}
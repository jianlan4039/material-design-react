import {Meta, StoryObj} from '@storybook/react';
import {ElevatedButton} from "../../../index";
import {CSSProperties} from "react";

const meta: Meta = {
  title: "Common Buttons/Elevated Button",
  component: ElevatedButton,
  args: {
    label: "Elevated Button",
  },
  parameters: {
    layout: "centered",
  },
  tags: ['autodocs']
}

export default meta;

type Story = StoryObj<typeof ElevatedButton>;

export const Default: Story = {}

export const WithIcon: Story = {
  args: {
    icon: <span className={'material-icons'}>home</span>
  }
}

export const CustomWithTokens: Story = {
  render: (args) => {
    return (
      <div
        style={{
          '--md-cust-elevated-button-container-shape': '10px',
        } as CSSProperties}
      >
        <ElevatedButton {...args}></ElevatedButton>
      </div>
    )
  }
}
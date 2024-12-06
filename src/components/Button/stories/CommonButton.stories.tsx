import {Meta, StoryObj} from "@storybook/react";
import CommonButton from "../CommonButton";
import {ElevatedButton, FilledButton, FilledTonalButton, OutlinedButton, TextButton} from "../index";

export default {
  title: "Common Buttons/Button",
  parameters: {
    layout: "centered"
  },
  tags: ['autodocs']
} as Meta

type Story = StoryObj<typeof CommonButton>

export const Default: Story = {
  render: (args) => {
    return <>
      <ElevatedButton label={"Elevated"}></ElevatedButton>
      <FilledButton label={'Filled'}></FilledButton>
      <FilledTonalButton label={'Tonal'}></FilledTonalButton>
      <OutlinedButton label={'Outlined'}></OutlinedButton>
      <TextButton label={'Text'}></TextButton>
    </>
  },
  decorators: [
    (Story) => (
      <div style={{display: 'flex', gap: '16px'}}>
        <Story></Story>
      </div>
    )
  ]
}

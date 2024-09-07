import {Meta, StoryObj} from "@storybook/react";
import {FilledTextField} from "../index";

const meta: Meta = {
  title: "Form/FilledTextField",
  component: FilledTextField,
  tags: ['autodocs']
}

export default meta;
type Story = StoryObj<typeof FilledTextField>;

export const Primary: Story = {
  render: () => {
    return (
      <>
        <FilledTextField label={"Username"} supportingText={"supporting text"} showSupportingText={true}></FilledTextField>
        <FilledTextField label={"Password"}></FilledTextField>
        <FilledTextField label={"Age"}></FilledTextField>
      </>
    )
  }
}
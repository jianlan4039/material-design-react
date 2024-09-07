import {Meta, StoryObj} from "@storybook/react";
import {OutlinedTextField} from "../index";
import "./styles"

const meta: Meta = {
  title: 'Form/OutlinedTextField',
  component: OutlinedTextField,
  tags: ["autodocs"]
}

export default meta;

type Story = StoryObj<typeof OutlinedTextField>
export const Primary: Story = {
  render:() => {

    return (
      <>
        <OutlinedTextField label={"Username"} showSupportingText supportingText={'abc'}></OutlinedTextField>
        <OutlinedTextField label={"Password"}></OutlinedTextField>
        <OutlinedTextField label={"Age"}></OutlinedTextField>
      </>
    )
  }
}


import {Meta, StoryObj} from "@storybook/react";
import InputWrapper from "../internal/InputWrapper";
import {FocusEvent} from "react";

const meta: Meta = {
  component: InputWrapper,
  title: "Test/InputWrapper",
  parameters: {
    layout: "centered",
  },
  tags: ['autodocs']
}

export default meta;
type Story = StoryObj<typeof InputWrapper>

export const Default: Story = {
  render: () => {

    const focusHandler = (e: FocusEvent) => {
      console.log(e.target.matches(":focus-visible"))
    }

    return (
      <input type="text" onFocus={focusHandler} />
    )
  }
}
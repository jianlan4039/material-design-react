import {Meta, StoryObj} from "@storybook/react";
import './styles';
import {RadioButton, RadioGroup} from "../index";

const meta: Meta = {
  title: "Form/RadioButton",
  component: RadioButton,
}

export default meta;
type Story = StoryObj<typeof RadioButton>;

export const Primary: Story = {
  render: () => {
    return (
      <RadioGroup>
        <RadioButton value={'a'}></RadioButton>
        <RadioButton value={'b'}></RadioButton>
        <RadioButton value={'c'}></RadioButton>
        <RadioButton value={'d'}></RadioButton>
        <RadioButton value={'e'}></RadioButton>
      </RadioGroup>
    )
  }
}
import {Meta, StoryObj} from "@storybook/react";
import '../../../stories/styles';
import {FAB} from "../../../index";

const meta: Meta = {
  title: "Button/FAB",
  component: FAB,
  tags: ['autodocs']
}
export default meta;
type Story = StoryObj<typeof FAB>;

export const Primary: Story = {
  args: {
    children: <span className={'material-icons'}>home</span>,
    variant: 'normal',
    size: 'large',
  }
}
import {Meta, StoryObj} from "@storybook/react";
import './styles'
import {Dialog, TextButton} from "../index";

const meta: Meta = {
  title: "Dialog",
  component: Dialog,
}

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Primary: Story = {
  args: {
    show: false,
    headline: 'Lorem ipsum dolor sit amet.',
    children: (
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi at consequuntur enim libero nam nihil quo
        ratione totam vel. Perspiciatis.
      </p>
    ),
    actions: <>
      <TextButton>Cancel</TextButton>
      <TextButton>OK</TextButton>
    </>,
    headerDivider: true,
    footerDivider: true
  }
}
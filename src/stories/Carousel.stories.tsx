import type {Meta, StoryObj} from "@storybook/react";
import Carousel from "../components/Carousel/Carousel";

const meta: Meta = {
  component: Carousel,
  title: "Carousel",
}

export default meta;

type Story = StoryObj<typeof Carousel>;

export const Primary: Story = {
  args: {
    layout: 'uncontained'
  }
}
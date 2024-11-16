import {Meta, StoryObj} from "@storybook/react";
import {Snackbar} from "../index";

const meta: Meta = {
  title: "Utilities/Snackbar",
  component: Snackbar,
  tags: ['autodocs']
}

export default meta;
type Story = StoryObj<typeof Snackbar>

export const Primary:Story = {
  args: {
    show: false,
    supportingText: "This is a tip!",
    label: "Action",
    closeable: true,
    icon: <span className={"material-icons-round"}>close</span>
  }
}
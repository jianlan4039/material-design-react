import {Meta, StoryObj} from "@storybook/react";
import './styles';
import {BrandedFAB} from "../index";

const meta: Meta = {
  title: 'Button/Extended FAB',
  component: BrandedFAB
}

export default meta;
type Story = StoryObj<typeof BrandedFAB>;

export const Primary: Story = {
  args: {
    label: 'Primary',
    icon: <span className={'material-icons'}>home</span>,
    lowered: true
  }
}
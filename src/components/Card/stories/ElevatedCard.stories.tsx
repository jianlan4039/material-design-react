import {Meta, StoryObj} from '@storybook/react';
import {ElevatedCard} from "../../../index";

const meta: Meta = {
  title: 'Card/Elevated Card',
  component: ElevatedCard,
  tags: ['autodocs']
}

export default meta;
type Story = StoryObj<typeof ElevatedCard>;

export const Primary: Story = {
  render: () => (
    <ElevatedCard>

    </ElevatedCard>
  )
}
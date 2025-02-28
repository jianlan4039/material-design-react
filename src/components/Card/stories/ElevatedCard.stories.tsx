import {Meta, StoryObj} from '@storybook/react';
import {ElevatedCard} from "../../../index";
import {ElevatedButton} from "../../Button";

const meta: Meta = {
  title: 'Card/Elevated Card',
  component: ElevatedCard,
  tags: ['autodocs']
}

export default meta;
type Story = StoryObj<typeof ElevatedCard>;

export const Primary: Story = {

  render: () => {

    function mouseDownHandler() {
      console.log('down')
    }

    return (
      <ElevatedCard onMouseDown={mouseDownHandler} style={{height: "200px"}}>
        <ElevatedButton >Confirm</ElevatedButton>
      </ElevatedCard>
    )
  }
}
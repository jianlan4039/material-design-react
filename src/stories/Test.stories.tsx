import {Meta, StoryObj} from "@storybook/react";
import React, {useEffect, useRef} from "react";
import TestComponent from "../components/Test/TestComponent";

const meta: Meta<typeof TestComponent> = {
  component: TestComponent,
  title: 'Test/TestComponent',
  parameters: {
    //layout: 'centered'
  }
}

export default meta;
type Story = StoryObj<typeof TestComponent>;

export const Default: Story = {
  render: (args) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (ref.current) {
        console.log(ref.current.getBoundingClientRect())
      }
    }, [ref]);

    return (
      <TestComponent ref={ref} {...args}>
        A Test Component
      </TestComponent>
    )
  }
}
import {Meta, StoryObj} from "@storybook/react";
import React, {ReactNode, useRef, useState} from "react";
import SlideViewer from "../components/SlideViewer/SlideViewer";
import ElevatedButton from "../components/Button/ElevatedButton";

const meta: Meta<typeof SlideViewer> = {
  component: SlideViewer,
  title: 'Container/SlideViewer',
  parameters: {
    //layout: 'centered'
  }
}

export default meta;
type Story = StoryObj<typeof SlideViewer>;

export const Default: Story = {
  render: () => {

    const [alternativeView, setAlternativeView] = useState<ReactNode>()
    const content = useRef<number>(1);

    const clickHandler = () => {
      content.current += 1
      setAlternativeView(
        <div>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea, tempora!
          {content.current}
        </div>
      )
    };


    return (
      <div>
        <SlideViewer alternativeView={alternativeView} direction={'left'}>
          <div>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos, officiis?
          </div>
        </SlideViewer>
        <ElevatedButton onClick={clickHandler}>Next</ElevatedButton>
      </div>
    )
  }
}
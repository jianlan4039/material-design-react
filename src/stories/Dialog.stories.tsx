import {Meta, StoryObj} from "@storybook/react";
import React from "react";
import Dialog from "../components/Dialog/Dialog";
import {FilledIcon} from "../icons";
import TextButton from "../components/Button/TextButton";

const meta: Meta<typeof Dialog> = {
  component: Dialog,
  title: 'Container/Dialog',
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
}

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  render: (args) => {

    return (
      <Dialog
        icon={<FilledIcon>home</FilledIcon>}
        headline={'Headline'}
        supportText={'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad deleniti ducimus earum maiores placeat, quos ratione similique soluta tenetur totam.'}
        footer={
          <>
            <TextButton>Cancel</TextButton>
            <TextButton>Confirm</TextButton>
          </>
        }
        {...args}
      >
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci amet blanditiis deserunt eveniet fugiat
        magnam molestiae neque nesciunt nostrum odit placeat porro provident quasi quibusdam quidem repudiandae, rerum
        sint tempora. A ab adipisci aspernatur consectetur ex incidunt neque odit quos? Ad aliquid consequatur
        cupiditate deleniti dolorem ducimus, esse fugit hic id ipsum iusto labore laudantium modi, molestias mollitia
        necessitatibus neque nihil nobis nostrum obcaecati perferendis porro quaerat quam quibusdam quisquam repudiandae
        rerum sint sit suscipit tempore totam ullam, ut voluptatum! Alias at commodi consequatur dolores et eveniet,
        excepturi facere incidunt, iste, laboriosam magni nisi obcaecati omnis praesentium quam repudiandae suscipit!
      </Dialog>
    )
  }
}
import {Meta, StoryObj} from "@storybook/react";
import React, {useRef, useState} from "react";
import Dialog from "../components/Dialog/Dialog";
import {FilledIcon} from "../icons";
import TextButton from "../components/Button/TextButton";
import ElevatedButton from "../components/Button/ElevatedButton";
import FilledButton from "../components/Button/FilledButton";

const meta: Meta<typeof Dialog> = {
  component: Dialog,
  title: 'Container/Dialog',
  parameters: {
    // layout: 'centered'
  },
  tags: ['autodocs']
}

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  render: ({icon, headline, supportingText, actions, ...rest}) => {

    const [isShow, setIsShow] = useState(false)
    const clickHandler = () => {
      setIsShow(!isShow)
    }

    const closeHandler = () => {
      setIsShow(false)
    }

    return (
      <>
        <FilledButton onClick={clickHandler}>Show Dialog</FilledButton>
        <Dialog
          icon={<FilledIcon>home</FilledIcon>}
          headline={'Headline'}
          supportingText={'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad deleniti ducimus earum maiores placeat, quos ratione similique soluta tenetur totam.'}
          actions={
            <>
              <TextButton>Cancel</TextButton>
              <TextButton>Confirm</TextButton>
            </>
          }
          show={isShow}
          onClose={closeHandler}
        >
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci amet blanditiis deserunt eveniet fugiat
          magnam molestiae neque nesciunt nostrum odit placeat porro provident quasi quibusdam quidem repudiandae, rerum
          sint tempora. A ab adipisci aspernatur consectetur ex incidunt neque odit quos? Ad aliquid consequatur
          cupiditate deleniti dolorem ducimus, esse fugit hic id ipsum iusto labore laudantium modi, molestias mollitia
          necessitatibus neque nihil nobis nostrum obcaecati perferendis porro quaerat quam quibusdam quisquam
          repudiandae
          rerum sint sit suscipit tempore totam ullam, ut voluptatum! Alias at commodi consequatur dolores et eveniet,
          excepturi facere incidunt, iste, laboriosam magni nisi obcaecati omnis praesentium quam repudiandae suscipit!
        </Dialog>
      </>
    )
  }
}

export const Form: Story = {
  render: ({icon, headline, supportingText, actions, ...rest}) => {


    const clickHandler = () => {
    }

    return (
      <>
        <Dialog
          icon={<FilledIcon>home</FilledIcon>}
          headline={'Headline'}
          supportingText={'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad deleniti ducimus earum maiores placeat, quos ratione similique soluta tenetur totam.'}
          actions={
            <>
              <TextButton>Cancel</TextButton>
              <TextButton onClick={clickHandler} type={'submit'} form={'form-id'}>Confirm</TextButton>
            </>
          }
          {...rest}
        >
          <form method={'dialog'} id={'form-id'}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci atque corporis cupiditate distinctio,
            enim et ex fugit id illum necessitatibus nihil, officiis quas quibusdam quis quod quos rem saepe, similique
            temporibus velit veritatis vitae voluptate. Aut dicta facere ipsam nostrum possimus, provident rem saepe.
            Adipisci aspernatur libero quae voluptates voluptatum!
          </form>
        </Dialog>
      </>
    )
  }
}
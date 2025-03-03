import {Meta, StoryObj} from "@storybook/react";
import '../../../stories/styles'
import {Dialog, ElevatedButton, TextButton} from "../../../index";
import {useState} from "react";

const meta: Meta = {
  title: "Container/Dialog",
  component: Dialog,
  tags: ['autodocs'],
  args: {
    show: false
  }
}

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Primary: Story = {

  render: () => {

    const [show, setShow] = useState(false)

    const openHandler = () => {
      setShow(true)
    }

    const closeHandler = () => {
      setShow(false)
    }

    return (<>
      <ElevatedButton onClick={openHandler}>Open Dialog</ElevatedButton>
      <Dialog
        headline={'Lorem ipsum dolor sit amet.'}
        actions={<>
          <TextButton>Cancel</TextButton>
          <TextButton>OK</TextButton>
        </>}
        icon={<span className={'material-icons'}>home</span>}
        headerDivider={true}
        footerDivider={true}
        supportingText={'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'}
        show={show}
        closed={closeHandler}
      >
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime, omnis.
        </p>
      </Dialog>
    </>)
  }
}

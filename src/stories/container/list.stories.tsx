import {Meta, StoryObj} from "@storybook/react";
import {ListItem, List} from "../../index";

const meta: Meta = {
  title: "Container/List",
  component: List,
  tags: ['autodocs']
}

export default meta;

type Story = StoryObj<typeof List>;

export const Primary: Story = {
  render: () => {

    return (
      <List>
        <ListItem
          icon={<span className={'material-icons-round'}>home</span>}
          headline={'Item 1'}
          supportingText={"Lorem ipsum dolor sit amet."}
          trailingIcon={<span className="material-icons-outlined">chevron_right</span>}
        ></ListItem>
        <ListItem headline={'Item 2'} supportingText={"Lorem ipsum dolor sit amet."} disabled={true}></ListItem>
        <ListItem headline={'Item 3'} supportingText={"Lorem ipsum dolor sit amet."}></ListItem>
        <ListItem headline={'Item 4'} supportingText={"Lorem ipsum dolor sit amet."}></ListItem>
      </List>
    )
  }
}
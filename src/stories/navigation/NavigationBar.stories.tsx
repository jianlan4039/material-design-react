import {Meta, StoryObj} from "@storybook/react";
import NavigationBar from "../../components/Navigation/NavigationBar";
import NavigationAction from "../../components/Navigation/NavigationAction";

const meta: Meta = {
  title: "Navigation/Navigation Bar",
  component: NavigationBar,
}

export default meta
type Story = StoryObj<typeof NavigationBar>;

export const Primary: Story = {
  args: {
    children: <>
      <NavigationAction
        id={'home'}
        icon={<span className={'material-icons'}>home</span>}
        label={"Home"}
      ></NavigationAction>
      <NavigationAction
        id={'edit'}
        icon={<span className={"material-icons"}>edit</span>}
        label={"Edit"}
      ></NavigationAction>
      <NavigationAction
        id={'settings'}
        icon={<span className={"material-icons"}>settings</span>}
        label={"Settings"}
      ></NavigationAction>
      <NavigationAction
        id={'favorite'}
        icon={<span className={"material-icons"}>favorite</span>}
        label={"Favorite"}
      ></NavigationAction>
      <NavigationAction
        id={'help'}
        icon={<span className={"material-icons"}>help</span>}
        label={"Help"}
      ></NavigationAction>
    </>
  }
}
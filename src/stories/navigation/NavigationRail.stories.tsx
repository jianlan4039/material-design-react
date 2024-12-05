import {Meta, StoryObj} from "@storybook/react";
import NavigationRail from "../../components/Navigation/NavigationRail";
import NavigationAction from "../../components/Navigation/NavigationAction";

const meta: Meta = {
  title: "Navigation/Navigation Rail",
  component: NavigationRail,
}

export default meta;
type Story = StoryObj<typeof NavigationRail>;

const actions = [
  {
    id: 'home',
    icon: <span className={'material-icons'}>home</span>,
    label: "Home",
  },
  {
    id: 'settings',
    icon: <span className={'material-icons'}>settings</span>,
    label: "Settings",
  },
  {
    id: 'person',
    icon: <span className={'material-icons'}>person</span>,
    label: "Person",
  },
  {
    id: 'favorites',
    icon: <span className={'material-icons'}>favorite</span>,
    label: "Favorites",
  }
]

export const Primary: Story = {
  args: {
    items: actions
  }
}
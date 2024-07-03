import {Meta, StoryObj} from "@storybook/react";
import {NavigationDrawer} from "../index";
import './styles';

const meta: Meta = {
  title: "Navigation/Navigation Drawer",
  component: NavigationDrawer,
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof NavigationDrawer>;

export const Primary: Story = {
  args: {
    modal: true,
    show: false,
    items: [
      {
        icon: <span className={'material-icons'}>home</span>,
        label: 'Home',
        id: 'home'
      },
      {
        icon: <span className={'material-icons'}>search</span>,
        label: 'Search',
        id: 'search'
      },
      {
        icon: <span className={'material-icons'}>settings</span>,
        label: 'Settings',
        id: 'settings'
      },
      {
        icon: <span className={'material-icons'}>help</span>,
        label: 'Help',
        id: 'help'
      }
    ]
  }
}
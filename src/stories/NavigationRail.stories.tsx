import {Meta, StoryObj} from "@storybook/react";
import {NavigationRail} from "../index";
import './styles'
import NavigationAction from "../components/Navigation/internal/NavigationAction";

const meta: Meta = {
  title: "Navigation/Navigation Rail",
  component: NavigationRail,
  tags: ['autodocs']
}

export default meta;

type Story = StoryObj<typeof NavigationRail>;

export const Primary: Story = {
  args: {
    active: 'search',
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

export const Secondary: Story = {
  render: () => {

    return (
      <NavigationRail>
        <NavigationAction icon={<span className={'material-icons'}>home</span>} label={'Home'}></NavigationAction>
        <NavigationAction icon={<span className={'material-icons'}>search</span>} label={'Search'}></NavigationAction>
        <NavigationAction icon={<span className={'material-icons'}>settings</span>} label={'Settings'}></NavigationAction>
        <NavigationAction icon={<span className={'material-icons'}>help</span>} label={'Help'}></NavigationAction>
      </NavigationRail>
    )
  }
}
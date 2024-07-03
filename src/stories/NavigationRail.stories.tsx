import {Meta, StoryObj} from "@storybook/react";
import {NavigationRail} from "../index";
import './styles'
import Department from "../components/Navigation/internal/Department";

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
        <Department icon={<span className={'material-icons'}>home</span>} label={'Home'}></Department>
        <Department icon={<span className={'material-icons'}>search</span>} label={'Search'}></Department>
        <Department icon={<span className={'material-icons'}>settings</span>} label={'Settings'}></Department>
        <Department icon={<span className={'material-icons'}>help</span>} label={'Help'}></Department>
      </NavigationRail>
    )
  }
}
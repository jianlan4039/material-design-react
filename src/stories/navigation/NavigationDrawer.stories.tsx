import {Meta, StoryObj} from "@storybook/react";
import {NavigationDrawer} from "../../components/Navigation/NavigationDrawer";
import {List, ListItem} from "../../index";

const meta: Meta = {
  title: 'Navigation/Navigation Drawer',
  component: NavigationDrawer,
}

export default meta;
type Story = StoryObj<typeof NavigationDrawer>

const items = [
  {
    headline: 'Badges'
  },
  {
    headline: 'Buttons',
  },
  {
    headline: 'Cards',
  },
  {
    headline: 'Carousels',
  }
]

const children = items.map((it, i) => (
  <ListItem headline={it.headline}></ListItem>
))

export const Primary: Story = {
  args: {
    children: (
      <List>
        {children}
      </List>
    )
  }
}
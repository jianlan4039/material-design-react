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
    modal: false,
    show: false,
    onChange: (target) => { console.log(target); },
    items: [
      {
        headline: 'Button',
        id: 'button',
        value: 'button',
        subEntries: [
          {
            headline: 'Common Button',
            id: 'common-button',
            value: 'common-button'
          },
          {
            headline: 'Icon Button',
            id: 'icon-button',
            value: 'icon-button'
          },
          {
            headline: 'FAB',
            id: 'fab',
            value: 'fab'
          },
          {
            headline: 'Extended FAB',
            id: 'extended-fab',
            value: 'extended-fab'
          },
          {
            headline: 'Segmented Button',
            id: 'segmented-button',
            value: 'segmented-button'
          },
        ]
      },
      {
        headline: 'Card',
        id: 'card',
        value: 'card'
      },
      {
        headline: 'Checkbox',
        id: 'checkbox',
        value: 'checkbox'
      },
      {
        headline: 'Chips',
        id: 'chips',
        value: 'chips'
      }
    ]
  }
}
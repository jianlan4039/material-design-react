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
        label: 'Button',
        id: 'button',
        subEntries: [
          {
            label: 'Common Button',
            id: 'common-button'
          },
          {
            label: 'Icon Button',
            id: 'icon-button'
          },
          {
            label: 'FAB',
            id: 'fab'
          },
          {
            label: 'Extended FAB',
            id: 'extended-fab'
          },
          {
            label: 'Segmented Button',
            id: 'segmented-button'
          },
        ]
      },
      {
        label: 'Card',
        id: 'card'
      },
      {
        label: 'Checkbox',
        id: 'checkbox'
      },
      {
        label: 'Chips',
        id: 'chips'
      },
      // {
      //   label: 'Date Picker',
      //   id: 'date-picker'
      // },
      // {
      //   label: 'Dialogs',
      //   id: 'dialogs'
      // },
      // {
      //   label: 'Divider',
      //   id: 'divider'
      // },
      // {
      //   label: 'Lists',
      //   id: 'lists'
      // },
      // {
      //   label: 'Menus',
      //   id: 'menus'
      // },
      // {
      //   label: 'Navigation',
      //   id: 'navigation',
      //   subEntries: [
      //     {
      //       label: 'Navigation Rail',
      //       id: 'navigation-rail',
      //     },
      //     {
      //       label: 'Navigation Drawer',
      //       id: 'navigation-drawer',
      //     },
      //     {
      //       label: 'Navigation Bar',
      //       id: 'navigation-bar',
      //     }
      //   ]
      // },
      // {
      //   label: 'Progress Indicators',
      //   id: 'progress-indicators'
      // },
      // {
      //   label: 'Radio Button',
      //   id: 'radio-button',
      // },
      // {
      //   label: 'Sliders',
      //   id: 'sliders'
      // },
      // {
      //   label: 'Snackbar',
      //   id: 'snackbar'
      // },
      // {
      //   label: 'Switch',
      //   id: 'switch'
      // },
      // {
      //   label: 'Tabs',
      //   id: 'tabs'
      // },
      // {
      //   label: 'Text Field',
      //   id: 'text-field'
      // },
      // {
      //   label: 'Tool Tips',
      //   id: 'tooltip'
      // }
    ]
  }
}
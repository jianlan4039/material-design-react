import {Meta, StoryObj} from "@storybook/react";
import {Tabs, PrimaryTab, SecondaryTab} from "../index";
import './styles'

const meta: Meta = {
  title: "Tabs",
  component: Tabs,
  tags: ['autodocs']
}

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Primary: Story = {
  args: {
    children: <>
      <PrimaryTab text={'Home'} icon={<span className={'material-icons'}>home</span>}></PrimaryTab>
      <PrimaryTab text={'Settings'} icon={<span className={'material-icons'}>settings</span>}></PrimaryTab>
      <PrimaryTab text={'Help'} icon={<span className={'material-icons'}>help</span>}></PrimaryTab>
    </>
  }
}

export const Secondary: Story = {
  args: {
    children: <>
      <SecondaryTab text={'Home'} icon={<span className={'material-icons'}>home</span>}></SecondaryTab>
      <SecondaryTab text={'Settings'} icon={<span className={'material-icons'}>settings</span>}></SecondaryTab>
      <SecondaryTab text={'Help'} icon={<span className={'material-icons'}>help</span>}></SecondaryTab>
    </>
  }
}
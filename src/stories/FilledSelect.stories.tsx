import {Meta, StoryObj} from "@storybook/react";
import React from "react";
import FilledSelect from "../components/Select/FilledSelect";
import {OptionValue} from "../components/Menu/internal/menuTypes";

const meta: Meta<typeof FilledSelect> = {
  component: FilledSelect,
  title: 'Form/FilledSelect',
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
}

export default meta;
type Story = StoryObj<typeof FilledSelect>;

export const Default: Story = {
  render: (args) => {

    const options = [
      {label: 'Item One', value: 'item_one'},
      {label: 'Item Two', value: 'item_two'},
      {
        label: 'Item Three', value: 'item_three', subMenu: [
          {label: 'Item Four', value: 'item_four'}
        ]
      },
    ]

    const valueChangeHandler = (value: OptionValue) => {
      console.log(value)
    }


    return (
      <FilledSelect label={'Label'} items={options} onChange={valueChangeHandler}></FilledSelect>
    )
  }
}
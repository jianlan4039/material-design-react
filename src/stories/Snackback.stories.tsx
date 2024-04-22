import {Meta, StoryObj} from "@storybook/react";
import React from "react";
import Snackbar from "../components/Snackbar/Snackbar";
import {FilledIcon} from "../icons";

const meta: Meta<typeof Snackbar> = {
  component: Snackbar,
  title: 'Container/Snackbar',
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
}

export default meta;
type Story = StoryObj<typeof Snackbar>;

export const Default: Story = {
  render: ({supportingText = 'Lorem ipsum dolor sit amet.', ...rest}) => {
    return (
      <Snackbar supportingText={supportingText} {...rest}></Snackbar>
    )
  }
}

export const WithAction: Story = {
  render: (
    {
      supportingText = 'Lorem ipsum dolor sit amet.',
      label = 'Action',
      ...rest
    }
  ) => {
    return (
      <Snackbar supportingText={supportingText} label={label} {...rest}></Snackbar>
    )
  }
}

export const WithActionWrapped: Story = {
  render: (
    {
      supportingText = 'Lorem ipsum dolor sit amet.',
      label = 'Lorem ipsum dolor sit amet.',
      ...rest
    }
  ) => {
    return (
      <Snackbar supportingText={supportingText} label={label} {...rest}></Snackbar>
    )
  }
}

export const WithActionWrappedAndTwoLineHeight: Story = {
  render: (
    {
      supportingText = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur dignissimos earum ex excepturi maxime nisi quibusdam temporibus, veritatis? Iusto, rem?',
      label = 'Lorem ipsum dolor sit amet.',
      ...rest
    }
  ) => {
    return (
      <Snackbar supportingText={supportingText} label={label} {...rest}></Snackbar>
    )
  }
}

export const WithActionAndIcon: Story = {
  render: (
    {
      supportingText = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum, ullam.',
      label = 'Lorem ipsum dolor sit amet, consectetur',
      icon = <FilledIcon>close</FilledIcon>,
      ...rest
    }
  ) => {
    return (
      <Snackbar supportingText={supportingText} label={label} icon={icon} {...rest}></Snackbar>
    )
  }
}
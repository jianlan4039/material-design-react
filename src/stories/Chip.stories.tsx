import {Meta, StoryObj} from "@storybook/react";
import React from "react";
import Button from "../components/Chip/internal/Button";
import AssistChip from "../components/Chip/AssistChip";
import {FilledIcon} from "../icons";
import FilterChip from "../components/Chip/FilterChip";
import InputChip from "../components/Chip/InputChip";
import SuggestionChip from "../components/Chip/SuggestionChip";

const meta: Meta<typeof Button> = {
  component: Button,
  title: 'Form/Chip',
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
}

export default meta;
type Story = StoryObj<typeof Button>;

export const Assist: Story = {
  render: (args) => {
    return (
      <AssistChip
        icon={<FilledIcon>check</FilledIcon>}
        {...args}
      >
        Assist
      </AssistChip>
    )
  }
}

export const Filter: Story = {
  render: (args) => {
    return (
      <FilterChip {...args}>
        Filter
      </FilterChip>
    )
  }
}

export const Input: Story = {
  render: (args) => {
    return (
      <InputChip {...args}>
        Input
      </InputChip>
    )
  }
}

export const Suggestion: Story = {
  render: (args) => {
    return (
      <SuggestionChip {...args}>
        Suggestion
      </SuggestionChip>
    )
  }
}
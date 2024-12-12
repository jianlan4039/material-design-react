import {Meta, StoryObj} from "@storybook/react";
import Card from "../internal/Card";
import ElevatedCard from "../ElevatedCard";
import FilledCard from "../FilledCard";
import {OutlinedCard} from "../../../index";
import {FilledButton} from "../../Button";

export default {
  title: 'Card/All Cards',
  tags: ['autodocs']
} as Meta;

type Story = StoryObj<typeof Card>

export const Overview = {
  render: () => {

    return (
      <div style={{display: 'flex', gap: "20px"}}>
        <ElevatedCard
          style={{width: "200px", height: "200px", display: "flex", justifyContent: "center", alignItems: "center"}}
        >
          Elevated Card
        </ElevatedCard>

        <FilledCard
          style={{width: "200px", height: "200px", display: "flex", justifyContent: "center", alignItems: "center"}}>
          Filled Card
        </FilledCard>

        <OutlinedCard
          style={{width: "200px", height: "200px", display: "flex", justifyContent: "center", alignItems: "center"}}>
          Outlined Card
        </OutlinedCard>
      </div>
    )
  }
}
import {Meta, StoryObj} from "@storybook/react";
import './styles'
import {Menu} from "../index";
import ElevatedButton, {ElevatedButtonHandle} from "../components/Button/ElevatedButton";
import {useEffect, useRef, useState} from "react";
import {OptionValue} from "../components/Menu/internal/menuTypes";

const meta: Meta = {
  title: 'Menu',
  component: Menu,
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof Menu>;

const months = Array.from(
  {length: 12},
  (_, i) => {
    return {
      label: new Intl.DateTimeFormat('en-US', {month: 'long'}).format(new Date(2020, i)),
      id: i.toString()
    }
  }
)

export const Primary: Story = {
  render: () => {
    const btn = useRef<ElevatedButtonHandle>(null)
    const [menuAnchor, setMenuAnchor] = useState<HTMLButtonElement>()
    const [open, setOpen] = useState(false)

    useEffect(() => {
      if (btn.current?.button) {
        setMenuAnchor(btn.current.button)
      }
    }, [btn]);

    const openMenu = () => {
      setOpen(!open)
    }

    const changeHandler = (values: string[]) => {
      console.log(values)
    };

    return <>
      <div style={{position: 'relative'}}>
        <ElevatedButton ref={btn} onClick={openMenu}>Open Menu</ElevatedButton>
        <Menu
          items={months}
          anchorEl={menuAnchor}
          open={open}
          onClosed={openMenu}
          onSelected={changeHandler}
        ></Menu>
      </div>
    </>
  }
}

export const SubMenu: Story = {
  render: () => {
    const btn = useRef<ElevatedButtonHandle>(null)
    const [menuAnchor, setMenuAnchor] = useState<HTMLButtonElement>()
    const [open, setOpen] = useState(false)
    const items = [
      {
        label: '2023',
        value: '2023',
        subMenu: months
      },
      {
        label: '2024',
        value: '2024',

      },
      {
        label: '2025',
        value: '2025',
      }
    ]

    useEffect(() => {
      if (btn.current?.button) {
        setMenuAnchor(btn.current.button)
      }
    }, [btn]);

    const openMenu = () => {
      setOpen(!open)
    }

    return <>
      <div style={{position: 'relative'}}>
        <ElevatedButton ref={btn} onClick={openMenu}>Open Menu</ElevatedButton>
        <Menu items={items} anchorEl={menuAnchor} open={open} onClosed={openMenu}></Menu>
      </div>
    </>
  }
}
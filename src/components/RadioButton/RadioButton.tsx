import React, {useState, useEffect, forwardRef, HTMLProps, useContext, useRef, useImperativeHandle} from 'react';
import './RadioButton.scss'
import {MultiSelectContextProvider} from "../internal/context/MultiSelectContextProvider";
import c from 'classnames'
import StatefulBox from "../StatefulBox/StatefulBox";

interface RadioButtonProps extends HTMLProps<HTMLInputElement> {
  disabled?: boolean
}

interface RadioButtonHandle {
  input?: HTMLInputElement | null
}

const RadioButton = forwardRef<RadioButtonHandle, RadioButtonProps>((props, ref) => {
  const {
    selected,
    onChange,
    id,
    name,
    value,
    onMouseOver,
    onMouseOut,
    onMouseDown,
    onMouseUp,
    disabled,
    children,
    onBlur,
    onFocus,
    ...rest
  } = props

  const [isSelected, setIsSelected] = useState<boolean>(selected || false);
  const {list: selectedList, setList} = useContext(MultiSelectContextProvider)

  const radioRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    input: radioRef.current
  }))

  const selectedIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
      <path
        d="M480-280q83 0 141.5-58.5T680-480q0-83-58.5-141.5T480-680q-83 0-141.5 58.5T280-480q0 83 58.5 141.5T480-280Zm0 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>
    </svg>
  );

  const unselectedIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
      <path
        d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>
    </svg>
  );

  const clickHandler = () => {
    if (disabled) {
      return
    }
    setList?.([value])
  }

  useEffect(() => {
    setIsSelected(Boolean(selectedList?.includes(value)))
  }, [selectedList]);

  useEffect(() => {
    setIsSelected(Boolean(selected))
  }, [selected]);

  return (
    <StatefulBox
      className={c("radio-button", {
        'selected': isSelected,
        'disabled': disabled
      })}
      onClick={clickHandler}
      disabled={disabled}
    >
      <input
        ref={radioRef}
        type="radio"
        onChange={onChange}
        name={name}
        value={value}
        id={id}
        aria-disabled={disabled}
        {...rest}
      />
      {isSelected ? selectedIcon : unselectedIcon}
    </StatefulBox>
  );
})

export default RadioButton;



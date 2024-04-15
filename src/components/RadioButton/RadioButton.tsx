import React, {useState, useEffect, ChangeEvent, forwardRef, HTMLProps, useRef, useContext} from 'react';
import './RadioButton.scss'
import StateLayer from "../StateLayer";
import {StateElement} from "../internal/common/StateElement";
import {SelectionContext} from "../internal/context/SelectionContext";
import c from 'classnames'

interface RadioButtonProps extends StateElement, HTMLProps<HTMLInputElement> {
  disabled?: boolean
}

const RadioButton = StateLayer<HTMLInputElement, RadioButtonProps>(forwardRef<HTMLInputElement, RadioButtonProps>((props, ref) => {
  const {
    selected,
    onChange,
    id,
    name,
    value,
    stateLayer,
    onMouseOver,
    onMouseOut,
    onMouseDown,
    onMouseUp,
    disabled,
  } = props

  const [isSelected, setIsSelected] = useState<boolean>(selected || false);
  const inputRef = useRef<HTMLInputElement>(null);
  const {list: selectedList, setList} = useContext(SelectionContext)

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
    <div
      className={c("radio-button", {
        'radio-button--selected': isSelected,
        'radio-button--disabled': disabled
      })}
      onClick={clickHandler}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    >
      {!disabled && <div className={'radio-button__state'}>{stateLayer}</div>}
      <input
        ref={inputRef}
        type="radio"
        onChange={onChange}
        name={name}
        value={value}
        id={id}
        disabled={disabled}
      />
      {isSelected ? selectedIcon : unselectedIcon}
    </div>
  );
}))

export default RadioButton;



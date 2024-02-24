import React, {forwardRef, HTMLAttributes} from 'react'
import cln from "classnames";

export interface CheckboxContentProps extends HTMLAttributes<HTMLInputElement> {
  check?: boolean
  indeterminate?: boolean
  disabled?: boolean
  error?: boolean
}

/**
 * 0 for uncheck, 1 for checked, 2 for indeterminate
 */
export function setState(chk: boolean, indeterm: boolean) {
  let checkState = 0
  if (indeterm) {
    checkState = 2
  } else if (chk) {
    checkState = 1
  } else {
    checkState = 0
  }
  return checkState
}

const CheckboxContent = forwardRef((props: CheckboxContentProps, ref) => {
  const {
    check = false,
    indeterminate = false,
    disabled = false,
    error= false,
    ...rest
  } = props

  const checkState = setState(check, indeterminate)

  return (
    <span
      className={cln('nd-checkbox-content', {
        'nd-uncheck': checkState === 0,
        'nd-check': checkState === 1,
        'nd-indeterminate': checkState === 2
      })}
    >
      {
        checkState === 0 &&
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
          <path
            d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Z"/>
        </svg>
      }
      {
        checkState === 1 &&
        <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 -960 960 960" width="18">
          <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/>
        </svg>
      }
      {
        checkState === 2 &&
        <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 -960 960 960" width="18">
          <path d="M240-440v-80h480v80H240Z"/>
        </svg>
      }
      <input disabled={disabled} type="checkbox" {...rest}/>
    </span>
  )
})

export default CheckboxContent
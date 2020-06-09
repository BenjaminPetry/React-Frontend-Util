import React, { useEffect, useRef } from "react";
import "./Textfield.css";
import SaveState from "./SaveState.js";

export const NUMERIC_EXPRESSION = /[^0-9 -.]/g;

export default function Textfield({
  value = "",
  placeholder = "",
  label = "",
  type = "text",
  name = "",
  focus = false,

  className = "",
  savingState = null,
  explanation = "",
  valid = true,
  warning = "",
  buttonicon = "",
  buttoniconTitle = null,
  buttoniconOnClick = null, // click on the button icon - default: onSubmit method is being used
  onChange = event => {}, // use event.target.value for the field's value
  onSubmit = value => {},
  submitOnFocusLost = false,
  onFocusAllSelect = false,
  onFocusChange = hasFocus => {},
  disabled = false,
  ...rest
}) {
  const inputRef = useRef(null);
  const realType = type.toLowerCase() === "number" ? "number" : type;
  useEffect(() => {
    if (focus && inputRef !== null && inputRef.current !== null) {
      inputRef.current.focus();
    }
    return function cleanup() {};
  }, [focus]);

  return (
    <div
      className={
        className +
        " input" +
        (!valid
          ? " invalid"
          : warning
          ? " warning"
          : disabled
          ? " disabled"
          : "")
      }
    >
      {label ? (
        <div className="inputLabel">
          <label>{label}</label>
        </div>
      ) : null}
      <div className="inputContainer">
        <input
          ref={inputRef}
          name={name}
          disabled={disabled}
          type={realType}
          value={value}
          lang={"en-150"}
          onChange={event => {
            // if (type === "number") {
            //   console.log(event.target.value);
            //   const numericValue = event.target.value.replace(".", ",");
            //   //.replace(NUMERIC_EXPRESSION, "");
            //   event.target.value = numericValue + "";
            // }
            onChange(event);
          }}
          placeholder={placeholder}
          onFocus={event => {
            onFocusChange(true);
            if (
              onFocusAllSelect &&
              inputRef !== null &&
              inputRef.current !== null
            ) {
              inputRef.current.select();
            }
          }}
          onBlur={event => {
            onFocusChange(false);
            if (submitOnFocusLost) {
              onSubmit(value);
            }
          }}
          autoFocus={focus}
          onKeyUp={event => {
            if (event.key === "Enter") {
              event.stopPropagation();
              onSubmit(value);
            }
          }}
          {...rest}
        />
        {buttonicon ? (
          <button
            className="iconbutton"
            onClick={event =>
              buttoniconOnClick !== null
                ? buttoniconOnClick(event)
                : onSubmit(value)
            }
            title={buttoniconTitle}
          >
            <i className="fas">{buttonicon}</i>
          </button>
        ) : null}
        {savingState == null ? (
          ""
        ) : (
          <SaveState
            state={savingState}
            className={buttonicon ? "withButton" : ""}
          />
        )}
      </div>
      {explanation ? <div className="explanation">{explanation}</div> : null}
    </div>
  );
}

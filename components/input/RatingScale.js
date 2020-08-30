/**
 * Copyright 2020 by Benjamin Petry (www.bpetry.de).
 * This software is provided on an "AS IS" BASIS,
 * without warranties or conditions of any kind, either express or implied.
 */
import React from "react";
import "./RatingScale.css";
import SaveState from "./SaveState.js";

export default function RatingScale({
  value = 1,
  scale = [1, 2, 3, 4, 5],
  label = "",
  labelMin = "",
  labelMax = "",
  savingState = null,
  disabled = false,
  onChange = (oldvalue, newvalue) => {},
}) {
  return (
    <div className="RatingScaleContainer">
      {label ? (
        <div>
          <label>{label}</label>
        </div>
      ) : null}
      {labelMin}
      {scale.map((element, index) => {
        const i = index;
        const tmpValue =
          typeof element == "string" && typeof value == "number"
            ? scale[value]
            : value;
        return (
          <button
            key={element}
            disabled={disabled}
            onClick={() => onChange(tmpValue, element)}
            className={
              (i === 0 ? "start" : i === scale.length - 1 ? "end" : "") +
              (element === tmpValue ? " selected" : "")
            }
          >
            {element}
          </button>
        );
      })}
      {labelMax}
      {savingState == null ? "" : <SaveState state={savingState} />}
    </div>
  );
}

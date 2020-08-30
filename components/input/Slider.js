/**
 * Copyright 2020 by Benjamin Petry (www.bpetry.de).
 * This software is provided on an "AS IS" BASIS,
 * without warranties or conditions of any kind, either express or implied.
 */
import React from "react";
import "./Slider.css";

export function Slider({
  id = "",
  value = 50,
  min = 0,
  max = 100,
  step = 1,
  width = "200px",
  labelFormat = (value) => {
    return "";
  },
  onChange = (oldvalue, newvalue) => {},
}) {
  return (
    <div className="SliderContainer" style={{ width: width }}>
      <label>
        <input
          type="range"
          id={id}
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(event) => {
            onChange(value, event.target.value);
          }}
        />
        {labelFormat(value)}
      </label>
    </div>
  );
}

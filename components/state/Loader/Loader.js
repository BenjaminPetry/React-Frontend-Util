/**
 * Copyright 2020 by Benjamin Petry (www.bpetry.de).
 * This software is provided on an "AS IS" BASIS,
 * without warranties or conditions of any kind, either express or implied.
 */

import React from "react";
import "./Loader.scss";

export const LOADER_SIZES = {
  LOADER_75: "75",
  LOADER_100: "100",
  LOADER_200: "200",
  LOADER_250: "250"
}

export const LOADER_STYLE = {
  LOADER_DARK: "dark",
  LOADER_LIGHT: "light",
}

export default function Loader({
  isVisible,
  size = LOADER_SIZES.LOADER_100,
  style = LOADER_STYLE.LOADER_LIGHT,
  className = "",
  alt="Loading...",
  ...rest
}) {
  return (
    <div className={'loader loader--' + (isVisible ? 'visible' : 'hidden') + ' loader--' + size + ' loader--' + style+" "+className} {...rest}>
      {alt}
    </div>
  );
}

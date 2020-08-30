/**
 * Copyright 2020 by Benjamin Petry (www.bpetry.de).
 * This software is provided on an "AS IS" BASIS,
 * without warranties or conditions of any kind, either express or implied.
 */
import React from "react";
import "./SaveState.css";

export const SaveStateEnum = {
  FAILED: 0,
  SUCCEED: 1,
  NOT_SAVED_YET: 2,
  SAVING: 3,
};

export default function SaveState({ state, className = "" }) {
  var iconClass = "";
  switch (state) {
    case SaveStateEnum.FAILED: // failed
      iconClass = "savingFailed";
      break;
    case SaveStateEnum.SUCCEED: // success
      iconClass = "savingSuccess";
      break;
    case SaveStateEnum.NOT_SAVED_YET: // notsaved
      iconClass = "notSaved";
      break;
    case SaveStateEnum.SAVING: // saving
      iconClass = "saving";
      break;
    default:
  }
  return (
    <i
      className={
        "saveState fas  " + iconClass + " " + className
        /* fas fa-" +
        (state === 1 // success
          ? "check-circle"
          : state === 0 // failed
          ? "times-circle"
          : "spinner")*/
      }
    />
  );
}

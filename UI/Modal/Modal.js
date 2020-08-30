import React from "react";
/**
 * Copyright 2020 by Benjamin Petry (www.bpetry.de).
 * This software is provided on an "AS IS" BASIS,
 * without warranties or conditions of any kind, either express or implied.
 */
import Backdrop from "../Backdrop/Backdrop";
import "./Modal.scss";

function Modal({ show, onClose, children }) {
  return (
    <Backdrop show={show} onClose={onClose}>
      <div className={"modal modal--" + (show ? "visible" : "hidden")}>
        {children}
      </div>
    </Backdrop>
  );
}

export default Modal;

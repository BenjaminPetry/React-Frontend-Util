/**
 * Copyright 2020 by Benjamin Petry (www.bpetry.de).
 * This software is provided on an "AS IS" BASIS,
 * without warranties or conditions of any kind, either express or implied.
 */
import { useCallback, useState } from "react";

function useMenuController() {
  const [show, setShow] = useState(false);
  const [position, setPosition] = useState([0, 0]);

  const clickHandler = useCallback((event) => {
    setPosition([event.clientX, event.clientY]);
    setShow((prevState) => {
      return !prevState;
    });
  }, []);

  const itemClickWrapper = useCallback((fun) => {
    return (event) => {
      fun(event);
      setShow(false);
    };
  }, []);

  return [show, position, setShow, clickHandler, itemClickWrapper];
}

export default useMenuController;

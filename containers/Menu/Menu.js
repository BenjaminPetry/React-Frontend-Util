/**
 * Copyright 2020 by Benjamin Petry (www.bpetry.de).
 * This software is provided on an "AS IS" BASIS,
 * without warranties or conditions of any kind, either express or implied.
 */
import React, { useRef } from "react";

import "./Menu.scss";

const MENU_PADDING = 20; // px

function Menu({
  show = false,
  position = [0, 0],
  onClose = (clickEvent) => {},
  children,
}) {
  const ref = useRef();

  const calculatePosition = (position, currentElement) => {
    const clientX = position[0];
    const clientY = position[1];
    const w =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
    const h =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight;

    const menuW = currentElement ? currentElement.offsetWidth || 0 : 0;
    const menuH = currentElement ? currentElement.offsetHeight || 0 : 0;
    const posX =
      clientX + menuW < w
        ? clientX
        : w - menuW >= MENU_PADDING
        ? w - menuW - MENU_PADDING
        : (w - menuW) / 2;
    const posY =
      clientY + menuH < h
        ? clientY
        : h - menuH >= MENU_PADDING
        ? h - menuH
        : (h - menuH) / 2;
    return [posX, posY];
  };

  const realPos = calculatePosition(position, ref.current);

  return (
    <div
      className={
        "menu__container menu__container--" + (show ? "visible " : "hidden ")
      }
      onClick={(event) => {
        if (event.currentTarget === event.target) {
          onClose();
        }
      }}
    >
      <div
        className="menu"
        ref={ref}
        style={{ left: realPos[0], top: realPos[1] }}
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
        }}
      >
        <nav>
          <ul>{children}</ul>
        </nav>
      </div>
    </div>
  );
}

export default Menu;

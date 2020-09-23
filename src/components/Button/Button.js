import React, { useState } from "react";

import styles from "./Button.module.scss";

const Button = (props) => {
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);

  const classes = [styles.Button];

  const buttonClickListener = (e) => {
    props.clickHandler();
  };

  const touchStartHandler = (e) => {
    if (!isMouseOver) {
      setIsMouseOver(true);
    }
    e.preventDefault();
  };

  const touchEndHandler = (e) => {
    setIsMouseOver(false);
    setIsMouseDown(false);
  };

  const mouseDownHandler = (e) => {
    setIsMouseDown(true);
  };

  const mouseUpHandler = (e) => {
    setIsMouseOver(false);
    setIsMouseDown(false);
  };

  if (isMouseOver) {
    classes.push(styles.MouseOver);
  }
  if (isMouseDown) {
    classes.push(styles.MouseDown);
  }

  return (
    <div
      className={classes.join(" ")}
      onClick={(e) => buttonClickListener(e)}
      onMouseEnter={(e) => touchStartHandler(e)}
      onMouseLeave={(e) => {
        touchEndHandler(e);
      }}
      onTouchStart={(e) => touchStartHandler(e)}
      onTouchEnd={(e) => touchEndHandler(e)}
      onMouseDown={(e) => mouseDownHandler(e)}
      onMouseUp={(e) => mouseUpHandler(e)}
    >
      <span className={styles.ButtonText}>{props.children}</span>
    </div>
  );
};

export default Button;

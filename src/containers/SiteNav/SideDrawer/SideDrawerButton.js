import React, { useState } from "react";

import styles from "./SideDrawerButton.module.scss";

import { isMobile } from "react-device-detect";

import { ReactComponent as Chevron } from "../../../assets/images/svg/chevron.svg";

const SideDrawerButton = (props) => {
  const subMenuOpen =
    props.subMenuIndex && props.subMenuOpen === props.subMenuIndex;

  const [isMouseOver, setIsMouseOver] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);

  const classes = [styles.Btn];
  if (props.subMenuBtn) classes.push(styles.SideDrawerSubMenuButton);
  else classes.push(styles.SideDrawerButton);
  if (props.show) classes.push(styles.Show);
  if (subMenuOpen) classes.push(styles.OpenMenu);

  const buttonClickListener = (e) => {
    props.clickHandler(e, props.subMenuIndex);
    if (props.subMenuIndex === 0) {
      setIsMouseOver(true);
    }
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
    if (isMobile) {
      classes.push(styles.MouseOverMobile);
    }
  }
  if (isMouseDown) {
    classes.push(styles.MouseDown);
    if (isMobile) {
      classes.push(styles.MouseOverMobile);
    }
  }

  const chevronClasses = [styles.Arrow];

  if (!props.subMenuBtn && subMenuOpen) {
    chevronClasses.push(styles.Rotated);
  }

  return (
    <div
      className={classes.join(" ")}
      onMouseEnter={(e) => touchStartHandler(e)}
      onMouseLeave={(e) => {
        touchEndHandler(e);
      }}
      onTouchStart={(e) => touchStartHandler(e)}
      onTouchEnd={(e) => touchEndHandler(e)}
      onMouseDown={(e) => mouseDownHandler(e)}
      onMouseUp={(e) => mouseUpHandler(e)}
      onClick={(e) => buttonClickListener(e)}
    >
      <span className={styles.SideDrawerButtonText}>
        {!props.subMenuBtn && props.subMenuIndex > 0 && (
          <Chevron className={chevronClasses.join(" ")} />
        )}
        {props.children}
      </span>
    </div>
  );
};

export default SideDrawerButton;

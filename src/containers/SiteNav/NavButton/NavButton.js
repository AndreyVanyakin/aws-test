import React, { useState } from "react";
import styles from "./NavButton.module.scss";

import { ReactComponent as DonateIcon } from "../../../assets/images/svg/icon-donate.svg";
import { ReactComponent as LoginIcon } from "../../../assets/images/svg/icon-login.svg";

const NavButton = (props) => {
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);

  const classes = [styles.UIButton];
  let iconImage = null;
  if (props.sideDrawerOpen) {
    classes.push(styles.ExitMode);
  }
  if (props.collapse) {
    classes.push(styles.Collapse);
  }

  switch (props.type) {
    case "menu":
      classes.push(styles.MenuBtn);
      iconImage = <div className={styles.MenuIconImage} alt="menu icon" />;
      break;

    case "donate":
      classes.push(styles.DonateBtn);
      iconImage = (
        <DonateIcon
          className={styles.IconImage}
          // style={{  }}
          alt="donate icon"
        />
      );
      break;

    case "user":
      classes.push(styles.UserBtn);
      iconImage = <LoginIcon className={styles.IconImage} alt="login icon" />;
      break;

    default:
      break;
  }

  const touchStartHandler = (e) => {
    if (!isMouseOver) {
      setIsMouseOver(true);
    }
    e.preventDefault();
  };

  const touchEndHandler = (e) => {
    setIsMouseOver(false);
    setIsMouseDown(false);
    // e.preventDefault();
  };

  const mouseDownHandler = (e) => {
    setIsMouseDown(true);
    // e.preventDefault();
  };

  const mouseUpHandler = (e) => {
    setIsMouseOver(false);
    setIsMouseDown(false);
    // e.preventDefault();
  };

  if (isMouseOver) {
    classes.push(styles.MouseOver);
  }
  if (isMouseDown) {
    classes.push(styles.MouseDown);
  }

  return (
    <div className={classes.join(" ")}>
      <div
        className={`${styles.ButtonBG}`}
        onClick={(e) => props.buttonClickListener(e)}
        onMouseEnter={(e) => touchStartHandler(e)}
        onMouseLeave={(e) => {
          touchEndHandler(e);
        }}
        onTouchStart={(e) => touchStartHandler(e)}
        onTouchEnd={(e) => touchEndHandler(e)}
        onMouseDown={(e) => mouseDownHandler(e)}
        onMouseUp={(e) => mouseUpHandler(e)}
      >
        <div className={styles.ButtonIcon}>{iconImage}</div>
        {!props.collapse && (
          <span className={styles.BtnText}>{props.children}</span>
        )}
      </div>
    </div>
  );
};

export default NavButton;

import React, { useState, useEffect } from "react";
import styles from "./MainSectionBtn.module.scss";

import { ReactComponent as Nom } from "../../assets/images/svg/nom.svg";

import BtnStars1 from "../../assets/images/svg/main-btn-stars-1.svg";
import BtnStars2 from "../../assets/images/svg/main-btn-stars-2.svg";
import BtnStars3 from "../../assets/images/svg/main-btn-stars-3.svg";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { isMobile } from "react-device-detect";

const MainSectionBtn = (props) => {
  gsap.registerPlugin(ScrollTrigger);
  const btnStars = React.createRef();
  const btn = React.createRef();

  const [isActive, setActive] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);

  const classes = [
    styles.MainSectionBtn1,
    styles.MainSectionBtn2,
    styles.MainSectionBtn3,
    styles.BtnText1,
    styles.BtnText2,
    styles.BtnText3,
  ];

  const classesActive = [
    styles.MainSectionBtn1Active,
    styles.MainSectionBtn2Active,
    styles.MainSectionBtn3Active,
  ];

  useEffect(() => {
    gsap.to(btnStars.current, {
      scrollTrigger: {
        trigger: btn.current,
        scrub: true,
        start: "top bottom",
        end: "bottom top",
      },
      y: "+=60%",
    });
  }, [btn.current, btnStars.current]);

  const onEnterHandler = (e) => {
    if (!isActive) {
      props.onEnter();
      setActive(true);
    }
  };

  const onLeaveHandler = (e) => {
    if (isActive) {
      props.onLeave();
      setActive(false);
    }
    if (isMouseDown) {
      setIsMouseDown(false);
    }
  };

  const onMouseDownHandler = (e) => {
    if (!isMouseDown) {
      setIsMouseDown(true);
    }
  };

  const onMouseUpHandler = (e) => {
    if (isMouseDown) {
      setIsMouseDown(false);
    }
  };

  const onMouseDownHandlerMobile = (e) => {
    if (!isMouseDown) {
      props.onEnter();
    }
    setIsMouseDown(true);
    setActive(true);
  };

  const onMouseUpHandlerMobile = (e) => {
    if (isMouseDown) {
      props.onLeave();
    }
    setIsMouseDown(false);
    setActive(false);
  };

  const textClasses = () => {
    const textClasses = [styles.BtnInnerText];
    if (isActive) textClasses.push(styles.BtnInnerTextActive);
    if (isMouseDown) textClasses.push(styles.BtnInnerTextMouseDown);
    return textClasses;
  };

  return (
    <div
      className={
        !isActive
          ? `${styles.MainSectionBtn} ${classes[props.index - 1]}`
          : `${styles.MainSectionBtn}  ${classesActive[props.index - 1]}`
      }
      ref={btn}
    >
      <div
        className={styles.BtnBGContainer}
        onClick={props.onClick ? props.onClick : () => {}}
        //DESKTOP
        onMouseEnter={!isMobile ? onEnterHandler : () => {}}
        onMouseLeave={!isMobile ? onLeaveHandler : () => {}}
        onMouseDown={!isMobile ? onMouseDownHandler : () => {}}
        onMouseUp={!isMobile ? onMouseUpHandler : () => {}}
        //MOBILE
        onTouchStart={isMobile ? onMouseDownHandlerMobile : () => {}}
        onTouchEnd={isMobile ? onMouseUpHandlerMobile : () => {}}
      >
        <img
          className={styles.BtnBG}
          src={props.bgSrc}
          alt="button background"
        />
        <div className={`${styles.BtnText} ${classes[props.index + 2]}`}>
          <div className={textClasses().join(" ")}>{props.children}</div>
        </div>
        <img
          src={
            props.index == 3
              ? BtnStars1
              : props.index == 2
              ? BtnStars3
              : BtnStars2
          }
          className={
            !isActive
              ? styles.BtnStars
              : `${styles.BtnStars} ${styles.BtnStarsActive}`
          }
          alt="button stars"
          ref={btnStars}
        />
        {props.index === 3 && (
          <Nom
            className={
              !isActive ? styles.Nom : `${styles.Nom} ${styles.NomActive}`
            }
            alt="Nom Chompsky"
          />
        )}
      </div>
    </div>
  );
};

export default MainSectionBtn;

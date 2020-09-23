import React, { useEffect } from "react";
import styles from "./Logo.module.scss";

import { ReactComponent as Meteor } from "../../assets/images/svg/logo-meteor.svg";
import { ReactComponent as LogoUMask } from "../../assets/images/svg/logo-u-mask.svg";
import { ReactComponent as LogoStar } from "../../assets/images/svg/logo-star.svg";

import { ReactComponent as LogoFull } from "../../assets/images/svg/logo-full.svg";
import { ReactComponent as LogoShort } from "../../assets/images/svg/logo-short.svg";

import { useViewport } from "../../hoc/ViewportProvider";

import { Link } from "react-router-dom";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Logo = (props) => {
  gsap.registerPlugin(ScrollTrigger);
  const logo = React.createRef();
  const meteor = React.createRef();
  const logoStar = React.createRef();

  const { width } = useViewport();
  const breakpoint = 800; //switch to U&M logo on small screens

  useEffect(() => {
    //Meteor animation
    gsap.from(meteor.current, {
      scrollTrigger: {
        trigger: logo.current,
        toggleActions: "play reset play none",
      },
      x: -500,
      y: -270,
      duration: 0.3,
      delay: 0.4,
      ease: "Expo.easeOut",
    });
  }, [meteor.current, logo.current]);

  useEffect(() => {
    //Logo star animation
    gsap.from(logoStar.current, {
      scrollTrigger: {
        trigger: logo.current,
        toggleActions: "play reset play none",
      },
      scale: 0,
      rotate: -400,
      // x: "-20%",
      // y: "20%",
      duration: 1,
      delay: 0.85,
      ease: "expo.out",
    });
  }, [logoStar.current, logo.current]);

  const logoClasses = [];

  if (width > breakpoint) {
    if (props.landingPageLogo) {
      logoClasses.push(styles.LogoLongLanding);
    } else {
      logoClasses.push(styles.LogoLong);
    }
  } else {
    if (props.landingPageLogo) {
      logoClasses.push(styles.LogoShortLanding);
    } else {
      logoClasses.push(styles.LogoShort);
    }
  }

  if (props.isLink) {
    logoClasses.push(styles.LogoLink);
  }

  const content = (
    <div className={logoClasses.join(" ")} ref={logo} alt="logo">
      {width > breakpoint ? <LogoFull /> : <LogoShort />}
      <div style={width < breakpoint ? { display: "none" } : null}>
        <LogoStar className={styles.LogoStar} ref={logoStar} />
        <Meteor className={styles.Meteor} ref={meteor} />
        <LogoUMask className={styles.LogoUMask} />
      </div>
    </div>
  );

  return (
    <div className={styles.Logo}>
      <div className={styles.LogoSpacerTop} />
      {props.isLink ? (
        <Link to={`${process.env.PUBLIC_URL}/`}>{content}</Link>
      ) : (
        content
      )}
    </div>
  );
};

export default Logo;

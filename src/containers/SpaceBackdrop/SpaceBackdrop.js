import React, { useState, useEffect } from "react";

import styles from "./SpaceBackdrop.module.scss";
import { ReactComponent as StarBG } from "../../assets/images/svg/star-bg.svg";

import { gsap } from "gsap";

const SpaceBackdrop = () => {
  const [moonBehindEarth, setMoonBehindEarth] = useState(false);

  const moon = React.createRef();
  let moonOrbit = gsap.timeline({ repeat: -1 });

  useEffect(() => {
    const orbitTime = 6;

    moonOrbit
      .to(moon.current, {
        x: "260%",
        duration: orbitTime / 2,
        ease: "sine.inOut",
      })
      .add(function () {
        sendMoonToBack();
      })
      .to(moon.current, {
        x: "-380%",
        duration: orbitTime / 2,
        ease: "sine.inOut",
      })
      .add(function () {
        sendMoonToFront();
      })
      .to(moon.current, {
        y: "-150%",
        duration: orbitTime / 4,
        scale: 1.2,
        opacity: 1,
        ease: "sine.out",
        delay: -orbitTime,
      })
      .to(moon.current, {
        y: "-250%",
        duration: orbitTime / 2,
        scale: 0.8,
        opacity: 0.5,
        ease: "sine.inOut",
        delay: (-3 * orbitTime) / 4,
      })
      .to(moon.current, {
        y: "-200%",
        duration: orbitTime / 4,
        scale: 1,
        opacity: 0.75,
        ease: "sine.in",
        delay: -orbitTime / 4,
      });
    return () => {
      moonOrbit.pause();
    };
  }, []); //

  //   useEffect(() => {
  //     moonOrbit.play();
  //     setMoonOrbiting(true);
  //   }, []);

  const sendMoonToBack = () => {
    setMoonBehindEarth(true);
  };

  const sendMoonToFront = () => {
    setMoonBehindEarth(false);
  };

  return (
    <div className={styles.SpaceBackdrop}>
      <StarBG className={styles.StarBG} />
      <div className={styles.EarthMoonGroup}>
        <div className={styles.EarthMoonSpacer} />
        <div className={styles.Earth} />
        <div
          className={
            moonBehindEarth
              ? styles.MoonContainerBack
              : styles.MoonContainerFront
          }
        >
          <div className={styles.Moon} ref={moon} />
        </div>
      </div>

      {/* <div className={styles.EarthAndMoon} ref={earthMoon}>
        <div
          className={styles.EarthAndMoonTrigger}
          ref={(div) => (earthMoonTrigger = div)}
        ></div>
        <img className={styles.Earth} src={earthSrc} alt="Earth" />
        <div
          className={
            moonBehindEarth ? styles.MoonContainerBack : styles.MoonContainer
          }
        >
          <img className={styles.Moon} src={moonSrc} alt="Moon" ref={moon} />
        </div>
      </div>
      <div className={styles.StarsGroup1}>
        <Star1 style={{ fill: starColor3 }} className={styles.Star1} />
        <Star1 style={{ fill: starColor3 }} className={styles.Star2} />
        <Star1 style={{ fill: starColor3 }} className={styles.Star3} />
        <Star1 style={{ fill: starColor3 }} className={styles.Star4} />
        <Star2 style={{ fill: starColor2 }} className={styles.Star5} />
        <Star2 style={{ fill: starColor2 }} className={styles.Star6} />
        <Star2
          style={{ stroke: starColor2, strokeWidth: "2px", fill: "none" }}
          className={styles.Star7}
        />
        <div className={`${styles.MiniStar} ${styles.MiniStar1}`}></div>
        <div className={`${styles.MiniStar} ${styles.MiniStar2}`}></div>
        <div className={`${styles.MiniStar} ${styles.MiniStar3}`}></div>
        <div className={`${styles.MiniStar} ${styles.MiniStar4}`}></div>
        <div className={`${styles.MiniStar} ${styles.MiniStar5}`}></div>
        <div className={`${styles.MiniStar} ${styles.MiniStar6}`}></div>
        <div className={`${styles.MiniStar} ${styles.MiniStar7}`}></div>
        <div className={`${styles.MiniStar} ${styles.MiniStar8}`}></div>
        <div className={`${styles.MiniStar} ${styles.MiniStar9}`}></div>
        <div className={`${styles.MiniStar} ${styles.MiniStar10}`}></div>
        <div className={`${styles.MiniStar} ${styles.MiniStar11}`}></div>
        <div className={`${styles.MiniStar} ${styles.MiniStar12}`}></div>
      </div> */}
    </div>
  );
};

export default SpaceBackdrop;

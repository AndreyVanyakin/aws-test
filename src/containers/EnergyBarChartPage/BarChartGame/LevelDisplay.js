import React from "react";
import styles from "./LevelDisplay.module.scss";

const LevelDisplay = (props) => {
  const prevBtnClasses = [styles.PrevLevelButton];
  const nextBtnClasses = [styles.NextLevelButton];

  if (props.levelNum === 1) {
    prevBtnClasses.push(styles.Disabled);
  } else if (props.levelNum === 10) {
    nextBtnClasses.push(styles.Disabled);
  }

  return (
    <div className={styles.LevelDisplayContainer}>
      <div className={styles.LevelDisplay}>
        <div className={styles.LevelInfo}>L{props.levelNum}</div>
        <div className={styles.LevelButtons}>
          <div
            className={prevBtnClasses.join(" ")}
            onClick={props.prevLevelClicked}
          />
          <div
            className={nextBtnClasses.join(" ")}
            onClick={props.nextLevelClicked}
          />
        </div>
      </div>
    </div>
  );
};

export default LevelDisplay;

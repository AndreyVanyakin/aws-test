import React from "react";
import styles from "./WorkButton.module.scss";

const WorkButton = (props) => {
  return (
    <div className={styles.WorkButton} onClick={props.clickHandler}>
      {props.workShowing ? (
        <React.Fragment>
          <p>Remove</p>
          <p>work</p>
          <p>bar</p>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <p>Add</p>
          <p>work</p>
          <p>bar</p>
        </React.Fragment>
      )}
    </div>
  );
};

export default WorkButton;

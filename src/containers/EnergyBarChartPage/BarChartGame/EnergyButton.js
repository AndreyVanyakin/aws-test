import React, { useRef, useEffect, useCallback } from "react";
import styles from "./EnergyButton.module.scss";

const EnergyButton = (props) => {
  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          props.setIsOpen(false);
        }
      }

      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  const buttonClasses = [styles.EnergyButton];

  const addMessageClasses = [styles.AddMessage];

  const subButtonsClasses = [styles.SubButtons];
  const subButtonTextClasses = [styles.SubButtonText];

  const KEButtonClasses = [styles.SubButton, styles.KEButton];
  const GPEButtonClasses = [styles.SubButton, styles.GPEButton];
  const EPEButtonClasses = [styles.SubButton, styles.EPEButton];
  const IEButtonClasses = [styles.SubButton, styles.IEButton];

  if (props.isOpen) {
    buttonClasses.push(styles.EnergyButtonOpen);
    addMessageClasses.push(styles.AddMessageOpen);
    subButtonsClasses.push(styles.SubButtonsOpen);
    subButtonTextClasses.push(styles.SubButtonTextOpen);

    KEButtonClasses.push(styles.SubButtonOpen);
    GPEButtonClasses.push(styles.SubButtonOpen);
    EPEButtonClasses.push(styles.SubButtonOpen);
    IEButtonClasses.push(styles.SubButtonOpen);
    KEButtonClasses.push(styles.KEButtonOpen);
    GPEButtonClasses.push(styles.GPEButtonOpen);
    EPEButtonClasses.push(styles.EPEButtonOpen);
    IEButtonClasses.push(styles.IEButtonOpen);
  } else {
    KEButtonClasses.push(styles.SubButtonClosed);
    GPEButtonClasses.push(styles.SubButtonClosed);
    EPEButtonClasses.push(styles.SubButtonClosed);
    IEButtonClasses.push(styles.SubButtonClosed);
  }

  const addEnergyBar = useCallback(
    (type) => {
      if (props.isOpen) props.addBar(type);
    },
    [props]
  );

  return (
    <div
      ref={wrapperRef}
      className={buttonClasses.join(" ")}
      onClick={props.onClickHandler}
    >
      <div className={addMessageClasses.join(" ")}>
        <p>Add</p>
        <p>energy</p>
        <p>bar</p>
      </div>
      <div className={subButtonsClasses.join(" ")}>
        {props.hasBar("KE") || (
          <div
            className={KEButtonClasses.join(" ")}
            onClick={() => {
              addEnergyBar("KE");
            }}
          >
            <div className={subButtonTextClasses.join(" ")}>
              <p>Kinetic</p>
              <p>Energy</p>
            </div>
          </div>
        )}
        {props.hasBar("GPE") || (
          <div
            className={GPEButtonClasses.join(" ")}
            onClick={() => {
              addEnergyBar("GPE");
            }}
          >
            <div className={subButtonTextClasses.join(" ")}>
              <p>Gravitational</p>
              <p>Potential</p>
              <p>Energy</p>
            </div>
          </div>
        )}
        {props.hasBar("EPE") || (
          <div
            className={EPEButtonClasses.join(" ")}
            onClick={() => {
              addEnergyBar("EPE");
            }}
          >
            <div className={subButtonTextClasses.join(" ")}>
              <p>Elastic</p>
              <p>Potential</p>
              <p>Energy</p>
            </div>
          </div>
        )}
        {props.index === 2 && !props.hasBar("IE") && (
          <div
            className={IEButtonClasses.join(" ")}
            onClick={() => {
              addEnergyBar("IE");
            }}
          >
            <div className={subButtonTextClasses.join(" ")}>
              <p>Internal</p>
              <p>Energy</p>
              <p>Change</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnergyButton;

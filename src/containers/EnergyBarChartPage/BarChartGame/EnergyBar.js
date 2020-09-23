import React, {
  useState,
  useCallback,
  useMemo,
  useEffect,
  useRef,
} from "react";

import styles from "./EnergyBar.module.scss";

const primaryRed = "#f3775b";
const primaryYellow = "#f7e25e";
const primaryBlue = "#41bdd7";
const primaryGreen = "#8ec099";

const EnergyBar = (props) => {
  const boxRef = useRef(null);

  const [state, setState] = useState({
    isDragging: false,
    mouseDeltaY: 0,
  });

  const handleMouseDown = useCallback(({ clientY }) => {
    setState((state) => ({
      ...state,
      isDragging: true,
      mouseDeltaY: clientY - boxRef.current.getBoundingClientRect().top,
    }));
  }, []);

  const handleMouseMove = useCallback(({ clientY }) => {
    setState((state) => ({
      ...state,
      mouseDeltaY: clientY - boxRef.current.getBoundingClientRect().top,
    }));
  }, []);

  const handleMouseUp = useCallback(() => {
    setState((state) => ({
      ...state,
      isDragging: false,
    }));
  }, []);

  useEffect(() => {
    if (state.isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }
  }, [state.isDragging, handleMouseMove, handleMouseUp]);

  const stylesDragBox = useMemo(
    () => ({
      width: props.widthOuter,
      height: "100%",
      cursor: state.isDragging ? "-webkit-grabbing" : "-webkit-grab",
      position: "relative",
    }),
    [state.isDragging, state.mouseDeltaY]
  );

  const bgColor = useMemo(() => {
    if (props.keBar) {
      return primaryGreen;
    } else if (props.gpeBar) {
      return primaryBlue;
    } else if (props.epeBar) {
      return primaryYellow;
    } else if (props.workBar) {
      return "#9168ca";
    } else return primaryRed;
  }, [props]);

  const stylesEnergyBarFade = useMemo(
    () => ({
      width: props.widthInner,
      height: props.showing
        ? `${Math.min(
            Math.abs(state.mouseDeltaY - props.height * (1 - props.baselineY)),
            props.height * props.maxBarHeightRatio
          )}px`
        : "0px",
      margin: "auto",
      opacity: props.showing ? 1 : 0,
      transition: "opacity 0.2s ease",
      position: "absolute",
      bottom: `${props.baselineY * 100}%`,
      left: "50%",
      transformOrigin: "bottom",
      transform: `translate(-50%, ${0}px) scaleY(${
        state.mouseDeltaY > props.height * (1 - props.baselineY)
          ? props.keBar
            ? 0
            : -1
          : 1
      })`,
      transition: "bottom 0.25s ease",
      backgroundColor: `${bgColor}`,
      //   zIndex: state.isDragging ? 2 : 1,
      //   position: state.isDragging ? "absolute" : "relative",
    }),
    [state.isDragging, state.mouseDeltaY, props]
  );

  const heading = useMemo(() => {
    if (props.keBar) {
      return "KE";
    } else if (props.gpeBar) {
      return "GPE";
    } else if (props.epeBar) {
      return "EPE";
    } else if (props.workBar) {
      return "W";
    } else
      return (
        <p>
          ΔE<sub>int</sub>
        </p>
      );
  }, [props]);

  return (
    <div
      style={stylesDragBox}
      className={styles.DragBox}
      onMouseDown={handleMouseDown}
      ref={boxRef}
    >
      <div className={styles.BarHeading}>{heading}</div>
      <div style={stylesEnergyBarFade}></div>
    </div>
  );
};

export default EnergyBar;

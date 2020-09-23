import React from "react";
import styles from "./EnergyBarChart.module.scss";

import EnergyBar from "./EnergyBar";
import WorkButton from "./WorkButton";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowAltLeft } from "@fortawesome/free-solid-svg-icons";
import { faLongArrowAltRight } from "@fortawesome/free-solid-svg-icons";

const baselineY = 0.15;
const baselineYWithNeg = 0.45;
const barWidthOuter = "11rem";
const barWidthInner = "70%";

const maxBarHeightRatio = 0.65;
const maxBarHeightRatioWithNeg = 0.4;

const EnergyBarChart = (props) => {
  const barChartClasses = [styles.EnergyBarChart];

  const bgLeftClasses = [styles.BarChartBGLeft];
  const bgRightClasses = [styles.BarChartBGRight];

  const workSectionClasses = [styles.WorkSection];

  if (props.instant1Highlighted) {
    bgLeftClasses.push(styles.BarChartBGHighlighted);
  }
  if (props.instant2Highlighted) {
    bgRightClasses.push(styles.BarChartBGHighlighted);
  }

  if (props.workShowing) {
    workSectionClasses.push(styles.WorkSectionShowing);
  }

  if (props.barChartDoubleHeight) {
    barChartClasses.push(styles.DoubleHeight);
  }

  return (
    <div className={barChartClasses.join(" ")}>
      <div className={bgLeftClasses.join(" ")}>
        <div className={styles.TopHeading}>Initial</div>
        {!props.hasAnyBarsLeft ? (
          <React.Fragment>
            <div className={styles.StarterMessage}>
              {props.energyButton1Open
                ? "Choose a form of energy"
                : "Add an energy bar"}
            </div>
            {!props.energyButton1Open && (
              <FontAwesomeIcon
                className={styles.FaIconLeft}
                icon={faLongArrowAltLeft}
              />
            )}
          </React.Fragment>
        ) : (
          <div className={styles.EnergyBars}>
            {props.hasBarLeft("KE") && (
              <div className={styles.EnergyBarContainer}>
                <EnergyBar
                  keBar
                  showing={true}
                  widthOuter={barWidthOuter}
                  widthInner={barWidthInner}
                  height={props.barChartDoubleHeight ? 460 : 300}
                  maxBarHeightRatio={
                    props.barChartDoubleHeight
                      ? maxBarHeightRatioWithNeg
                      : maxBarHeightRatio
                  }
                  baselineY={
                    props.barChartDoubleHeight ? baselineYWithNeg : baselineY
                  }
                ></EnergyBar>
                <div
                  className={`${styles.DeleteBtn} ${styles.KEDeleteBtn}`}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    props.removeBarLeft("KE");
                  }}
                >
                  <hr className={styles.Minus}></hr>
                </div>
              </div>
            )}
            {props.hasBarLeft("GPE") && (
              <div className={styles.EnergyBarContainer}>
                <EnergyBar
                  gpeBar
                  showing={true}
                  widthOuter={barWidthOuter}
                  widthInner={barWidthInner}
                  height={props.barChartDoubleHeight ? 460 : 300}
                  maxBarHeightRatio={
                    props.barChartDoubleHeight
                      ? maxBarHeightRatioWithNeg
                      : maxBarHeightRatio
                  }
                  baselineY={
                    props.barChartDoubleHeight ? baselineYWithNeg : baselineY
                  }
                ></EnergyBar>
                <div
                  className={`${styles.DeleteBtn} ${styles.GPEDeleteBtn}`}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    props.removeBarLeft("GPE");
                  }}
                >
                  <hr className={styles.Minus}></hr>
                </div>
              </div>
            )}
            {props.hasBarLeft("EPE") && (
              <div className={styles.EnergyBarContainer}>
                <EnergyBar
                  epeBar
                  showing={true}
                  widthOuter={barWidthOuter}
                  widthInner={barWidthInner}
                  height={props.barChartDoubleHeight ? 460 : 300}
                  maxBarHeightRatio={
                    props.barChartDoubleHeight
                      ? maxBarHeightRatioWithNeg
                      : maxBarHeightRatio
                  }
                  baselineY={
                    props.barChartDoubleHeight ? baselineYWithNeg : baselineY
                  }
                ></EnergyBar>
                <div
                  className={`${styles.DeleteBtn} ${styles.EPEDeleteBtn}`}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    props.removeBarLeft("EPE");
                  }}
                >
                  <hr className={styles.Minus}></hr>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <div
        className={workSectionClasses.join(" ")}
        style={{
          width: props.workShowing ? barWidthOuter : "1rem",
        }}
      >
        {props.workShowing && (
          <EnergyBar
            workBar
            showing={props.workShowing}
            widthOuter={"100%"}
            widthInner={barWidthInner}
            height={props.barChartDoubleHeight ? 460 : 0}
            maxBarHeightRatio={
              props.barChartDoubleHeight
                ? maxBarHeightRatioWithNeg
                : maxBarHeightRatio
            }
            baselineY={baselineYWithNeg}
          ></EnergyBar>
        )}
        <WorkButton
          clickHandler={props.workBtnHandler}
          workShowing={props.workShowing}
        />
      </div>
      <div className={bgRightClasses.join(" ")}>
        <div className={styles.TopHeading}>Final</div>
        {!props.hasAnyBarsRight ? (
          <React.Fragment>
            <div className={styles.StarterMessage}>
              {props.energyButton2Open
                ? "Choose a form of energy"
                : "Add an energy bar"}
            </div>
            {!props.energyButton2Open && (
              <FontAwesomeIcon
                className={styles.FaIconRight}
                icon={faLongArrowAltRight}
              />
            )}
          </React.Fragment>
        ) : (
          <div className={styles.EnergyBars}>
            {props.hasBarRight("KE") && (
              <div className={styles.EnergyBarContainer}>
                <EnergyBar
                  keBar
                  showing={true}
                  widthOuter={barWidthOuter}
                  widthInner={barWidthInner}
                  height={props.barChartDoubleHeight ? 460 : 300}
                  maxBarHeightRatio={
                    props.barChartDoubleHeight
                      ? maxBarHeightRatioWithNeg
                      : maxBarHeightRatio
                  }
                  baselineY={
                    props.barChartDoubleHeight ? baselineYWithNeg : baselineY
                  }
                ></EnergyBar>
                <div
                  className={`${styles.DeleteBtn} ${styles.KEDeleteBtn}`}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    props.removeBarRight("KE");
                  }}
                >
                  <hr className={styles.Minus}></hr>
                </div>
              </div>
            )}
            {props.hasBarRight("GPE") && (
              <div className={styles.EnergyBarContainer}>
                <EnergyBar
                  gpeBar
                  showing={true}
                  widthOuter={barWidthOuter}
                  widthInner={barWidthInner}
                  height={props.barChartDoubleHeight ? 460 : 300}
                  maxBarHeightRatio={
                    props.barChartDoubleHeight
                      ? maxBarHeightRatioWithNeg
                      : maxBarHeightRatio
                  }
                  baselineY={
                    props.barChartDoubleHeight ? baselineYWithNeg : baselineY
                  }
                ></EnergyBar>
                <div
                  className={`${styles.DeleteBtn} ${styles.GPEDeleteBtn}`}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    props.removeBarRight("GPE");
                  }}
                >
                  <hr className={styles.Minus}></hr>
                </div>
              </div>
            )}
            {props.hasBarRight("EPE") && (
              <div className={styles.EnergyBarContainer}>
                <EnergyBar
                  epeBar
                  showing={true}
                  widthOuter={barWidthOuter}
                  widthInner={barWidthInner}
                  height={props.barChartDoubleHeight ? 460 : 300}
                  maxBarHeightRatio={
                    props.barChartDoubleHeight
                      ? maxBarHeightRatioWithNeg
                      : maxBarHeightRatio
                  }
                  baselineY={
                    props.barChartDoubleHeight ? baselineYWithNeg : baselineY
                  }
                ></EnergyBar>
                <div
                  className={`${styles.DeleteBtn} ${styles.EPEDeleteBtn}`}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    props.removeBarRight("EPE");
                  }}
                >
                  <hr className={styles.Minus}></hr>
                </div>
              </div>
            )}
            {props.hasBarRight("IE") && (
              <div className={styles.EnergyBarContainer}>
                <EnergyBar
                  ieBar
                  showing={true}
                  widthOuter={barWidthOuter}
                  widthInner={barWidthInner}
                  height={props.barChartDoubleHeight ? 460 : 300}
                  maxBarHeightRatio={
                    props.barChartDoubleHeight
                      ? maxBarHeightRatioWithNeg
                      : maxBarHeightRatio
                  }
                  baselineY={
                    props.barChartDoubleHeight ? baselineYWithNeg : baselineY
                  }
                ></EnergyBar>
                <div
                  className={`${styles.DeleteBtn} ${styles.IEDeleteBtn}`}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    props.removeBarRight("IE");
                  }}
                >
                  <hr className={styles.Minus}></hr>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EnergyBarChart;

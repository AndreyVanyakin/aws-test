import React, { useState, useEffect, useCallback, useMemo } from "react";
import styles from "./BarChartGame.module.scss";

import LevelDisplay from "./LevelDisplay";
import VideoUI from "./VideoUI";
import EnergyButton from "./EnergyButton";
import EnergyBarChart from "./EnergyBarChart";

const BarChartGame = () => {
  const [levelNum, setLevelNum] = useState(1);
  const [barsLeft, setBarsLeft] = useState([]);
  const [barsRight, setBarsRight] = useState([]);
  const [instant1Highlighted, setInstant1Highlighted] = useState(false);
  const [instant2Highlighted, setInstant2Highlighted] = useState(false);
  const [energyButton1Open, setEnergyButton1Open] = useState(false);
  const [energyButton2Open, setEnergyButton2Open] = useState(false);
  const [workShowing, setWorkShowing] = useState(false);
  const [barChartDoubleHeight, setBarChartDoubleHeight] = useState(false);

  const digit1Classes = [styles.Digit];
  const digit2Classes = [styles.Digit];

  if (instant1Highlighted) digit1Classes.push(styles.DigitHighlighted);
  else if (instant2Highlighted) digit2Classes.push(styles.DigitHighlighted);

  const highlightInstant = (instant, highlight) => {
    if (instant === 1) {
      setInstant1Highlighted(highlight);
    } else if (instant === 2) {
      setInstant2Highlighted(highlight);
    }
  };

  const onEnergyBtnClickHandler = (index) => {
    if (index === 1) {
      setEnergyButton1Open(true);
    } else if (index === 2) {
      setEnergyButton2Open(true);
    }
  };

  const workBtnHandler = () => {
    setWorkShowing((ws) => !ws);
  };

  useEffect(() => {
    if (barsLeft.length >= 3) {
      setEnergyButton1Open(false);
    }
  }, [barsLeft]);

  useEffect(() => {
    if (barsRight.length >= 4) {
      setEnergyButton2Open(false);
    }
  }, [barsRight]);

  useEffect(() => {
    console.log("HERE");
    if (barsRight.includes("IE") || workShowing) {
      setBarChartDoubleHeight(true);
    } else setBarChartDoubleHeight(false);
  }, [barsRight, workShowing]);

  const addBarLeft = useCallback(
    (type) => {
      setBarsLeft((p) => {
        if (p.includes(type)) {
          return p;
        } else {
          p.push(type);
          return [...p];
        }
      });
    },
    [barsLeft]
  );

  const removeBarLeft = useCallback(
    (type) => {
      setBarsLeft((p) => {
        const index = p.indexOf(type);
        if (index < 0) return [...p];
        p.splice(index, 1);
        return [...p];
      });
    },
    [barsLeft]
  );

  const addBarRight = useCallback(
    (type) => {
      setBarsRight((p) => {
        if (p.includes(type)) {
          return p;
        } else {
          p.push(type);
          return [...p];
        }
      });
    },
    [barsRight]
  );

  const removeBarRight = useCallback(
    (type) => {
      setBarsRight((p) => {
        const index = p.indexOf(type);
        if (index < 0) return [...p];
        p.splice(index, 1);
        return [...p];
      });
    },
    [barsRight]
  );

  const hasAnyBarsLeft = useMemo(() => {
    return barsLeft.length > 0;
  }, [barsLeft]);

  const hasAnyBarsRight = useMemo(() => {
    return barsRight.length > 0;
  }, [barsRight]);

  const hasBarLeft = useCallback(
    (type) => {
      return barsLeft.includes(type);
    },
    [barsLeft]
  );

  const hasBarRight = useCallback(
    (type) => {
      return barsRight.includes(type);
    },
    [barsRight]
  );

  return (
    <div className={styles.BarChartGame}>
      <LevelDisplay
        levelNum={levelNum}
        prevLevelClicked={() => {
          setLevelNum((p) => p - 1);
        }}
        nextLevelClicked={() => {
          setLevelNum((p) => p + 1);
        }}
      />
      <div className={styles.SystemInfoContainer}>
        <div className={styles.SystemInfo}>
          <span className={styles.LevelNum}>{levelNum}.</span> The system is{" "}
          <span className={styles.System}>
            {"the pole vaulter and the Earth."}
          </span>
        </div>
      </div>
      <div className={styles.UITop}>
        <div className={styles.UITopLeft}>
          <div className={styles.InfoMessage}>
            Watch the video for the{" "}
            <span className={digit1Classes.join(" ")}>initial</span> &{" "}
            <span className={digit2Classes.join(" ")}>final</span> instants in
            time.
          </div>
          <button className={`${styles.TopButton} ${styles.HelpButton}`}>
            Help
          </button>
        </div>
        <VideoUI
          instant1Highlighted={instant1Highlighted}
          instant2Highlighted={instant2Highlighted}
          highlightInstant={(instant, highlighted) =>
            highlightInstant(instant, highlighted)
          }
        />
        <div className={styles.UITopRight}>
          <div className={styles.InfoMessage}>
            Complete the energy bar chart below.<br></br>
            <br></br>Click ‘Check’ when ready to see if it’s correct!
          </div>
          <button className={`${styles.TopButton} ${styles.CheckButton}`}>
            Check
          </button>
        </div>
      </div>
      <div className={styles.UIBottom}>
        <div className={styles.UIBottomRow1}>
          {barsLeft.length < 3 && (
            <EnergyButton
              index={1}
              isOpen={energyButton1Open}
              setIsOpen={setEnergyButton1Open}
              onClickHandler={() => onEnergyBtnClickHandler(1)}
              hasBar={hasBarLeft}
              addBar={addBarLeft}
            />
          )}
          <EnergyBarChart
            instant1Highlighted={instant1Highlighted}
            instant2Highlighted={instant2Highlighted}
            energyButton1Open={energyButton1Open}
            energyButton2Open={energyButton2Open}
            workShowing={workShowing}
            barChartDoubleHeight={barChartDoubleHeight}
            hasBarLeft={hasBarLeft}
            hasAnyBarsLeft={hasAnyBarsLeft}
            addBarLeft={addBarLeft}
            removeBarLeft={removeBarLeft}
            hasBarRight={hasBarRight}
            hasAnyBarsRight={hasAnyBarsRight}
            addBarRight={addBarRight}
            removeBarRight={removeBarRight}
            workBtnHandler={workBtnHandler}
          />
          {barsRight.length < 4 && (
            <EnergyButton
              index={2}
              isOpen={energyButton2Open}
              setIsOpen={setEnergyButton2Open}
              onClickHandler={() => onEnergyBtnClickHandler(2)}
              hasBar={hasBarRight}
              addBar={addBarRight}
            />
          )}
        </div>
        <div className={styles.UIBottomRow2}></div>
      </div>
    </div>
  );
};

export default BarChartGame;

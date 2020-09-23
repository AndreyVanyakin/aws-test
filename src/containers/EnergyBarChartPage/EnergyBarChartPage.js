import React from "react";
import styles from "./EnergyBarChartPage.module.scss";

import Logo from "../../components/Logo/Logo";
import BarChartGame from "./BarChartGame/BarChartGame";

const EnergyBarChartPage = () => {
  return (
    <div className={styles.EnergyBarChartPage}>
      <Logo />
      <div className={styles.Heading}>Energy Video Challenge</div>
      <hr className={styles.Divider}></hr>
      <div className={styles.BarChartGame}>
        <BarChartGame />
      </div>
    </div>
  );
};

export default EnergyBarChartPage;

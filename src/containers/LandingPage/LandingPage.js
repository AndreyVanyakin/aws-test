import React, { useEffect } from "react";
import styles from "./LandingPage.module.scss";

import Logo from "../../components/Logo/Logo";
import SpaceBackdrop from "../SpaceBackdrop/SpaceBackdrop";
import MainSection from "./MainSection/MainSection";

const LandingPage = (props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.LandingPage}>
      <SpaceBackdrop />
      <Logo landingPageLogo />
      <div className={styles.TaglineSpacer} />
      <h2 className={styles.Tagline}>Interactive physics resources</h2>
      <MainSection
        className={styles.MainSection}
        openDonationModal={props.openDonationModal}
      />
    </div>
  );
};

export default LandingPage;

import React from "react";
import styles from "./DonationModal.module.scss";

import CheckoutForm from "./CheckoutForm";

import NavButton from "../SiteNav/NavButton/NavButton";

const DonationModal = (props) => {
  const classes = [styles.DonationModal];

  if (props.show) {
    classes.push(styles.Show);
  }

  return (
    <React.Fragment>
      <div className={classes.join(" ")}>
        <div className={styles.CheckoutPanelContainer}>
          <CheckoutForm showing={props.show} />
          <p className={styles.RespectPrivacy}>
            We respect your privacy and will never store or share your payment
            information.
          </p>
        </div>
        <div className={styles.NavButtonContainer}>
          <NavButton
            type="menu"
            collapse={true}
            buttonClickListener={(e) => props.closeDonationModal()}
            sideDrawerOpen={true}
          ></NavButton>
        </div>
      </div>
      <div className={styles.Backdrop} />
    </React.Fragment>
  );
};

export default DonationModal;

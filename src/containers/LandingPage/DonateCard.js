import React from "react";
import styles from "./DonateCard.module.scss";

import Button from "../../components/Button/Button";

import { ReactComponent as SideGraphic } from "../../assets/images/svg/donate-card-graphic.svg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDonate } from "@fortawesome/free-solid-svg-icons";

const DonateCard = (props) => {
  return (
    <div className={styles.DonateCard}>
      <SideGraphic className={styles.SideGraphic} />
      <div className={styles.SupportUs}>Support Us</div>
      <p className={styles.DonateText}>{props.children}</p>
      <div className={styles.DonateButton}>
        <Button
          clickHandler={() => {
            props.openDonationModal();
          }}
        >
          <FontAwesomeIcon className={styles.FaIcon} icon={faDonate} />
          &nbsp;&nbsp;Donate
        </Button>
      </div>
    </div>
  );
};

export default DonateCard;

import React, { useState, useEffect, useMemo } from "react";
import styles from "./Footer.module.scss";

import { Link, Route } from "react-router-dom";

import { ReactComponent as BGPanel } from "../../assets/images/svg/footer-bg.svg";
import { ReactComponent as FooterAmp } from "../../assets/images/svg/footer-amp.svg";
import { ReactComponent as FooterRocket } from "../../assets/images/svg/footer-rocket.svg";
import { ReactComponent as FooterAmpMask } from "../../assets/images/svg/footer-amp-mask.svg";
import { ReactComponent as FooterMeteors } from "../../assets/images/svg/footer-meteors.svg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";
import { faTwitterSquare } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  const [showRocket, setShowRocket] = useState(false);

  const footerRef = React.createRef();

  const footerObserver = useMemo(
    () =>
      new IntersectionObserver(onFooterIntersection, {
        rootMargin: "0px 0px",
        threshold: 0.5,
      })
  );

  useEffect(() => {
    if (window && "IntersectionObserver" in window) {
      if (footerRef && footerRef.current) {
        footerObserver.observe(footerRef.current);
      }
    } else {
      setShowRocket(true);
    }
    return () => {
      footerObserver.disconnect();
    };
  });

  function onFooterIntersection(entries) {
    if (!entries || entries.length <= 0) {
      return;
    }

    if (entries[0].isIntersecting) {
      setShowRocket(true);
    } else if (showRocket) {
      setShowRocket(false);
    }
  }

  return (
    <React.Fragment>
      <div className={styles.FooterPaddingTop} />
      <div className={styles.Footer}>
        <div className={styles.FooterBG} ref={footerRef}>
          <FooterAmp className={styles.Ampersand} />
          <BGPanel className={styles.BGPanel} />
          <FooterRocket
            className={`${styles.Rocket} ${
              showRocket ? styles.RocketShowing : styles.RocketHidden
            }`}
          />
          <FooterAmpMask className={styles.FooterAmpMask} />

          <div className={styles.FooterContent}>
            <h2 className={styles.ConnectHeading}>Connect with us</h2>
            <div className={styles.SocialIcons}>
              <a
                href="mailto: matt@theuniverseandmore.com"
                target="_blank"
                rel="noopener noreferrer"
                alt="Email Matt at Universe and More"
                className={styles.SocialLink}
              >
                <FontAwesomeIcon
                  icon={faPaperPlane}
                  className={styles.SocialIcon}
                />
              </a>
              <a
                href="https://twitter.com/UniverseAndMore"
                target="_blank"
                rel="noopener noreferrer"
                alt="Universe and More Twitter page"
                className={styles.SocialLink}
              >
                <FontAwesomeIcon
                  className={styles.SocialIcon}
                  icon={faTwitterSquare}
                />
              </a>
              <a
                href="https://www.facebook.com/universeandmore"
                target="_blank"
                rel="noopener noreferrer"
                alt="Universe and More Facebook page"
                className={styles.SocialLink}
              >
                <FontAwesomeIcon
                  className={styles.SocialIcon}
                  icon={faFacebookSquare}
                />
              </a>
            </div>
            <div className={styles.FooterLinks}>
              <Route path={`${process.env.PUBLIC_URL}/:id`}>
                <Link to={`${process.env.PUBLIC_URL}/`}>
                  <p className={styles.FooterLink}>Home</p>
                </Link>{" "}
                |
              </Route>
              <Route
                path={[
                  `${process.env.PUBLIC_URL}/`,
                  `${process.env.PUBLIC_URL}/about`,
                ]}
                exact
              >
                <Link to={`${process.env.PUBLIC_URL}/video-vault`}>
                  <p className={styles.FooterLink}>Video Vault</p>
                </Link>
              </Route>
              <Route path={[`${process.env.PUBLIC_URL}/`]} exact>
                |
              </Route>
              <Route
                path={[
                  `${process.env.PUBLIC_URL}/`,
                  `${process.env.PUBLIC_URL}/video-vault`,
                ]}
                exact
              >
                <Link to={`${process.env.PUBLIC_URL}/about`}>
                  <p className={styles.FooterLink}>About Us</p>
                </Link>
              </Route>
            </div>
          </div>
        </div>
        <div className={styles.Copyright}>
          <p>
            Website by Matthew Blackman &copy; {new Date().getFullYear()}
            <span className={styles.Copyright2}>
              Universe & More is a 501c3 nonprofit company -
              <a
                className={styles.Terms}
                href="https://www.termsfeed.com/live/cd05b5f9-40f2-476d-bc6b-02dde767fed9"
                target="_blank"
              >
                Terms & Conditions
              </a>
            </span>
          </p>
        </div>
        <FooterMeteors className={styles.Meteors} />
      </div>
    </React.Fragment>
  );
};

export default Footer;

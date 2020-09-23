import React, { useState, useRef, useEffect } from "react";

import SideDrawerButton from "./SideDrawerButton";

import { Route, Link } from "react-router-dom";

import styles from "./SideDrawer.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLightbulb } from "@fortawesome/free-solid-svg-icons";
import { faChartLine } from "@fortawesome/free-solid-svg-icons";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { faWaveSquare } from "@fortawesome/free-solid-svg-icons";
import { faMobileAlt } from "@fortawesome/free-solid-svg-icons";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";
import { faTwitterSquare } from "@fortawesome/free-brands-svg-icons";
import { faDonate } from "@fortawesome/free-solid-svg-icons";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

const SideDrawer = (props) => {
  const [subMenuShowing, setSubMenuShowing] = useState(0);
  const classes = [styles.SideDrawer];
  const topMaskClasses = [styles.TopMask];

  const sideDrawerRef = useRef(null);

  if (props.show) {
    classes.push(styles.Show);
    topMaskClasses.push(styles.TopMaskShow);
  }

  useEffect(() => {
    if (props.show) {
      sideDrawerRef.current.scrollTop = 0;
    } else {
      setSubMenuShowing(0);
    }
    return () => {};
  }, [props.show]);

  const toggleSubMenuHandler = (e, subMenuIndex) => {
    setSubMenuShowing((prevValue) => {
      return subMenuIndex === prevValue ? 0 : subMenuIndex;
    });
  };

  return (
    <React.Fragment>
      <div className={topMaskClasses.join(" ")} />
      <div className={classes.join(" ")} ref={sideDrawerRef}>
        <div className={styles.ContentContainer}>
          <Route path={`${process.env.PUBLIC_URL}/:id`}>
            <Link to={`${process.env.PUBLIC_URL}/`}>
              <SideDrawerButton
                subMenuIndex={0}
                clickHandler={() => {
                  props.setShouldShowSideDrawer(false);
                }}
              >
                Home
              </SideDrawerButton>
            </Link>
          </Route>
          <SideDrawerButton
            subMenuIndex={1}
            clickHandler={toggleSubMenuHandler}
            subMenuOpen={subMenuShowing}
          >
            Games & Apps
          </SideDrawerButton>
          {subMenuShowing === 1 && (
            <div className={styles.SubMenu}>
              <a
                href="https://www.universeandmore.com/motion-mapper"
                alt="Motion Mapper"
                target="_blank"
                className={styles.SideDrawerButton}
              >
                <SideDrawerButton
                  subMenuIndex={0}
                  subMenuBtn
                  clickHandler={() => {}}
                >
                  <FontAwesomeIcon
                    className={styles.FaIcon}
                    icon={faChartLine}
                  />
                  Motion Mapper
                </SideDrawerButton>
              </a>
              <a
                href="https://www.universeandmore.com/crack-the-circuit"
                alt="Crack the Circuit"
                target="_blank"
                className={styles.SideDrawerButton}
              >
                <SideDrawerButton
                  subMenuIndex={0}
                  subMenuBtn
                  clickHandler={() => {}}
                >
                  <FontAwesomeIcon
                    className={styles.FaIcon}
                    icon={faLightbulb}
                  />{" "}
                  Crack the Circuit
                </SideDrawerButton>
              </a>
              <a
                href="https://www.universeandmore.com/visual-accelerometer"
                alt="Visual Accelerometer"
                target="_blank"
                className={styles.SideDrawerButton}
              >
                <SideDrawerButton
                  subMenuIndex={0}
                  subMenuBtn
                  clickHandler={() => {}}
                >
                  <FontAwesomeIcon
                    className={styles.FaIcon}
                    icon={faMobileAlt}
                  />
                  Visual Accelerometer
                </SideDrawerButton>
              </a>
              <a
                href="https://www.universeandmore.com/polarity-shift"
                alt="Polarity Shift"
                target="_blank"
                className={styles.SideDrawerButton}
              >
                <SideDrawerButton
                  subMenuIndex={0}
                  subMenuBtn
                  clickHandler={() => {}}
                >
                  <FontAwesomeIcon
                    className={styles.FaIcon}
                    icon={faPlusCircle}
                  />
                  Polarity Shift
                </SideDrawerButton>
              </a>
              <a
                href="https://www.universeandmore.com/wavemaker"
                alt="Wavemaker"
                target="_blank"
                className={styles.SideDrawerButton}
              >
                <SideDrawerButton
                  subMenuIndex={0}
                  subMenuBtn
                  clickHandler={() => {}}
                >
                  <FontAwesomeIcon
                    className={styles.FaIcon}
                    icon={faWaveSquare}
                  />
                  Wavemaker
                </SideDrawerButton>
              </a>
              {/* <SideDrawerButton subMenuBtn clickHandler={() => {}}>
                <FontAwesomeIcon className={styles.FaIcon} icon={faWater} />
                Wavemaker
              </SideDrawerButton> */}
            </div>
          )}

          <Route
            path={[
              `${process.env.PUBLIC_URL}/`,
              `${process.env.PUBLIC_URL}/about`,
            ]}
            exact
          >
            <Link to={`${process.env.PUBLIC_URL}/video-vault`}>
              <SideDrawerButton
                subMenuIndex={0}
                clickHandler={() => {
                  props.setShouldShowSideDrawer(false);
                }}
              >
                Video Vault
              </SideDrawerButton>
            </Link>
          </Route>
          <Route
            path={[
              `${process.env.PUBLIC_URL}/`,
              `${process.env.PUBLIC_URL}/video-vault`,
            ]}
            exact
          >
            <Link to={`${process.env.PUBLIC_URL}/about`}>
              <SideDrawerButton
                subMenuIndex={0}
                clickHandler={() => {
                  props.setShouldShowSideDrawer(false);
                }}
              >
                About Us
              </SideDrawerButton>
            </Link>
          </Route>
        </div>
        <div className={styles.Separator}>
          <FontAwesomeIcon className={styles.FaIcon} icon={faCircle} />
          <FontAwesomeIcon className={styles.FaIcon} icon={faCircle} />
          <FontAwesomeIcon className={styles.FaIcon} icon={faCircle} />
        </div>
        <div className={styles.ContentContainer}>
          <div className={styles.ContactUs}>
            <a
              href="mailto: matt@theuniverseandmore.com"
              target="_blank"
              alt="Email Matt at Universe and More"
              className={styles.ContactLink}
            >
              <SideDrawerButton
                className={styles.ContactUs}
                clickHandler={() => {}}
                subMenuIndex={0}
              >
                <FontAwesomeIcon
                  icon={faPaperPlane}
                  className={styles.FaIcon}
                />
                Contact Us
              </SideDrawerButton>
            </a>
          </div>
          <div className={styles.SocialIcons}>
            <a
              href="https://twitter.com/UniverseAndMore"
              target="_blank"
              alt="Universe and More Twitter page"
              className={styles.SocialLink}
            >
              <FontAwesomeIcon
                className={styles.SocialIcon}
                icon={faTwitterSquare}
              />
            </a>
            <a
              href="https://www.facebook.com/theuniverseandmore"
              target="_blank"
              alt="Universe and More Facebook page"
              className={styles.SocialLink}
            >
              <FontAwesomeIcon
                className={styles.SocialIcon}
                icon={faFacebookSquare}
              />
            </a>
          </div>
          <div
            className={styles.DonationFooter}
            onClick={() => {
              props.openDonationModal();
            }}
          >
            <FontAwesomeIcon className={styles.FaIcon} icon={faDonate} />
            Donate
          </div>
        </div>
      </div>
      <div
        className={styles.CloseButton}
        onClick={props.show ? props.closeMenu : () => {}}
      />
    </React.Fragment>
  );
};

export default SideDrawer;

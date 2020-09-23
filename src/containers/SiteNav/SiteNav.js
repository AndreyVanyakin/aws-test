import React, { useState } from "react";
import styles from "./SiteNav.module.scss";

import useDocumentScrollThrottled from "../../utilities/useDocumentScrollThrottled";
import { useViewport } from "../../hoc/ViewportProvider";

import NavButton from "./NavButton/NavButton";
import SideDrawer from "./SideDrawer/SideDrawer";

import { ReactComponent as AmpersandLogo } from "../../assets/images/svg/logo-amp.svg";

function SiteNav(props) {
  //Header
  const [shouldHideHeader, setShouldHideHeader] = useState(false);
  const [shouldShowShadow, setShouldShowShadow] = useState(false);

  //Side drawer
  const [shouldShowSideDrawer, setShouldShowSideDrawer] = useState(false);

  const MINIMUM_SCROLL = 5;
  // const TIMEOUT_DELAY = 200;

  useDocumentScrollThrottled((callbackData) => {
    const { previousScrollTop, currentScrollTop } = callbackData;
    const isScrolledDown = previousScrollTop < currentScrollTop;
    const isMinimumScrolled = currentScrollTop > MINIMUM_SCROLL;

    setShouldShowShadow(currentScrollTop > 330);

    // setTimeout(() => {
    setShouldHideHeader(() => {
      return isScrolledDown && isMinimumScrolled;
    });
    // }, TIMEOUT_DELAY);
  });

  const shadowStyle = shouldShowShadow ? styles.Shadow : "";
  const hiddenStyle =
    shouldHideHeader && !shouldShowSideDrawer ? styles.Hidden : "";

  const { width } = useViewport();
  //const breakpoint = 700; collapse buttons on small screens
  const collapseButtons = width < 770;

  const toggleMenu = (e) => {
    setShouldShowSideDrawer((p) => !p);
    e.preventDefault();
  };

  return (
    <header className={styles.SiteNav}>
      <div className={`${styles.HeaderBar} ${hiddenStyle} ${shadowStyle}`}>
        <NavButton
          type="menu"
          collapse={collapseButtons}
          buttonClickListener={(e) => toggleMenu(e)}
          sideDrawerOpen={shouldShowSideDrawer}
        >
          {shouldShowSideDrawer ? "Close" : "Menu"}
        </NavButton>
        <NavButton
          type="donate"
          collapse={collapseButtons}
          buttonClickListener={() => {
            props.openDonationModal();
          }}
        >
          Donate
        </NavButton>
        <NavButton
          type="user"
          collapse={collapseButtons}
          buttonClickListener={() => {}}
        >
          Login
        </NavButton>
        {shouldShowShadow && (
          <a href="#top">
            <AmpersandLogo
              className={styles.AmpersandLogo}
              onClick={() => setShouldShowSideDrawer(false)}
            />
          </a>
        )}
      </div>
      <SideDrawer
        show={shouldShowSideDrawer}
        setShouldShowSideDrawer={setShouldShowSideDrawer}
        closeMenu={() => {
          setShouldShowSideDrawer(false);
        }}
        openDonationModal={props.openDonationModal}
      />
    </header>
  );
}

export default SiteNav;

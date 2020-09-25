import React, { useState, lazy, Suspense } from "react";
import styles from "./App.module.scss";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import ViewportProvider from "./hoc/ViewportProvider";

import SiteNav from "./containers/SiteNav/SiteNav";
import DonationModal from "../src/containers/DonationModal/DonationModal";
import Footer from "../src/containers/Footer/Footer";

import LandingPage from "./containers/LandingPage/LandingPage";
// import VideoVaultPage from "./containers/VideoVaultPage/VideoVaultPage";
// import AboutPage from "./containers/AboutPage/AboutPage";
// import EinsteinDollarPage from "./containers/EinsteinDollarPage/EinsteinDollarPage";
// import EnergyBarChartPage from "./containers/EnergyBarChartPage/EnergyBarChartPage";

import ReactGA from "react-ga";

const promise = loadStripe(
  // "pk_test_51HFhlnGjG1Vp4O7hL3qNYrEJOqCirHTHCVDu6fDrErXpgBRqXfgr02Ajiejp0kjmHB25egXC8k1bhIZjD6BBoaMj00BGXXwMk3"
  "pk_live_51HFhlnGjG1Vp4O7hNwNOcwqBZocEMbGDM6jBR4rvbSjHRXJRJ0kkMvNsfUnj6olGC3AXyQs2HYSG8PEucEPrj7q100t7VomP3t"
);

const ELEMENTS_OPTIONS = {
  fonts: [
    {
      cssSrc: "https://fonts.googleapis.com/css?family=Roboto",
    },
  ],
};

const trackingId = "UA-176787646-1"; // Replace with your Google Analytics tracking ID
ReactGA.initialize(trackingId);
ReactGA.pageview(window.location.pathname + window.location.search);

const VideoVaultPage = lazy(() =>
  import("./containers/VideoVaultPage/VideoVaultPage")
);
const AboutPage = lazy(() => import("./containers/AboutPage/AboutPage"));

function App() {
  const [donationModalShowing, setDonationModalShowing] = useState(false);

  return (
    <ViewportProvider>
      <BrowserRouter>
        <Suspense
          fallback={<div className={styles.LoadingText}>Loading...</div>}
        >
          <Elements stripe={promise} options={ELEMENTS_OPTIONS}>
            <div className={styles.App}>
              <SiteNav
                openDonationModal={() => {
                  setDonationModalShowing(true);
                }}
                closeDonationModal={() => {
                  setDonationModalShowing(false);
                }}
              />
              {/* <EinsteinDollarPage /> */}
              <Switch>
                <Route path="/" exact>
                  <LandingPage
                    openDonationModal={() => {
                      setDonationModalShowing(true);
                    }}
                    closeDonationModal={() => {
                      setDonationModalShowing(false);
                    }}
                  />
                </Route>
                <Route path="/video-vault" exact component={VideoVaultPage} />
                <Route
                  path="/about"
                  exact
                  component={() => (
                    <AboutPage
                      openDonationModal={() => {
                        setDonationModalShowing(true);
                      }}
                    />
                  )}
                />
                {/* <Route path="/energy" exact>
                  <EnergyBarChartPage />
                </Route> */}
                <Redirect to="/" />
              </Switch>
              <Footer />
              <DonationModal
                show={donationModalShowing}
                closeDonationModal={() => {
                  setDonationModalShowing(false);
                }}
              />
            </div>
          </Elements>
        </Suspense>
      </BrowserRouter>
    </ViewportProvider>
  );
}

export default App;

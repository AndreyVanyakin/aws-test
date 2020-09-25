import React, { useState, useEffect, useCallback, useRef } from "react";
import styles from "./MainSection.module.scss";

import { Link } from "react-router-dom";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import MainSectionBtn from "../../../components/MainSectionBtn/MainSectionBtn";
import GameFeature from "../GameFeature";
import DonateCard from "../DonateCard";
import NewsletterSignup from "../../NewsletterSignup/NewsletterSignup";

import ButtonSrc1 from "../../../assets/images/svg/main-btn-1.svg";
import ButtonSrc2 from "../../../assets/images/svg/main-btn-2.svg";
import ButtonSrc3 from "../../../assets/images/svg/main-btn-3.svg";

import VideoBlob1 from "../../../assets/images/svg/videoBlob1.svg";
import VideoBlob2 from "../../../assets/images/svg/videoBlob2.svg";
import VideoBlob3 from "../../../assets/images/svg/videoBlob3.svg";

// import MotionMapperVideo from "../../../assets/videos/MotionMapperPreview.mp4";
// import VisualAccelerometerVideo from "../../../assets/videos/VisualAccelerometerPreview.mp4";
// import CrackTheCircuitVideo from "../../../assets/videos/CrackTheCircuitPreview.mp4";

import MotionMapperImage from "../../../assets/images/MotionMapperPreviewHalf.jpg";
import VisualAccelerometerImage from "../../../assets/images/VisualAccelerometerPreviewHalf.jpg";
import CrackTheCircuitImage from "../../../assets/images/CrackTheCircuitPreviewHalf.jpg";

import RocketSrc from "../../../assets/images/svg/rocket.svg";
import RocketLitSrc from "../../../assets/images/svg/rocket-lit.svg";

import { ReactComponent as RocketTrail } from "../../../assets/images/svg/rocket-trail.svg";
import { ReactComponent as BtnMeteor1 } from "../../../assets/images/svg/btn-meteor-1.svg";
import { ReactComponent as BtnMeteor2 } from "../../../assets/images/svg/btn-meteor-2.svg";

const MainSection = (props) => {
  gsap.registerPlugin(ScrollTrigger);
  const rocketSpacer = React.createRef();
  const rocket = React.createRef();
  const rocketTrail = React.createRef();
  const buttonContainer = React.createRef();
  const meteor1 = React.createRef();
  const meteor2 = React.createRef();

  const [isRocketLit, setIsRocketLit] = useState(false);

  let btnMeteorAnimIn1, btnMeteorAnimOut1;
  let btnMeteorAnimIn2, btnMeteorAnimOut2;

  const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);
  const gamesRef = useRef(null);
  const executeScroll = () => {
    scrollToRef(gamesRef);
  };

  useEffect(() => {
    //Rocket animation
    gsap.to(rocket.current, {
      scrollTrigger: {
        trigger: rocketSpacer.current,
        scrub: 0.1,
        start: "top-=100 top",
        end: "bottom+=100 top",
      },
      marginTop: -200,
      scaleX: 1.3,
      scaleY: 1.4,
    });
  }, [rocket.current, rocketSpacer.current]);

  useEffect(() => {
    //Button meteor animation
    btnMeteorAnimIn1 = gsap.fromTo(
      meteor1.current,
      {
        // scale: 0,
        opacity: 1,
        x: 2400,
        y: -1400,
      },
      {
        // scale: 1,
        opacity: 1,
        duration: 0.3,
        ease: "expo.out",
        x: 0,
        y: 0,
      }
    );

    btnMeteorAnimOut1 = gsap.to(meteor1.current, {
      // scale: 0,
      opacity: 1,
      x: -2400,
      y: 1400,
      duration: 0.7,
      ease: "out",
    });

    btnMeteorAnimIn1.pause();
    btnMeteorAnimOut1.pause();
  }, [meteor1.current, btnMeteorAnimIn1, btnMeteorAnimOut1]);

  useEffect(() => {
    //Button meteor animation
    btnMeteorAnimIn2 = gsap.fromTo(
      meteor2.current,
      {
        // scale: 0,
        opacity: 1,
        x: -2400,
        y: -3800,
      },
      {
        // scale: 1,
        opacity: 1,
        duration: 0.3,
        ease: "expo.out",
        x: 0,
        y: 0,
      }
    );

    btnMeteorAnimOut2 = gsap.to(meteor2.current, {
      // scale: 0,
      opacity: 1,
      x: 2400,
      y: 3800,
      duration: 0.7,
      ease: "out",
    });

    btnMeteorAnimIn2.pause();
    btnMeteorAnimOut2.pause();
  }, [meteor2.current, btnMeteorAnimIn2, btnMeteorAnimOut2]);

  const mouseEnterListener1 = useCallback(() => {
    btnMeteorAnimOut1 && btnMeteorAnimOut1.pause();
    btnMeteorAnimIn1 && btnMeteorAnimIn1.restart();
  }, [btnMeteorAnimOut1, btnMeteorAnimIn1]);

  const mouseLeaveListener1 = useCallback(() => {
    btnMeteorAnimIn1 && btnMeteorAnimIn1.pause();
    btnMeteorAnimOut1 && btnMeteorAnimOut1.restart();
  }, [btnMeteorAnimOut1, btnMeteorAnimIn1]);

  const mouseEnterListener2 = useCallback(() => {
    btnMeteorAnimOut2 && btnMeteorAnimOut2.pause();
    btnMeteorAnimIn2 && btnMeteorAnimIn2.restart();
  }, [btnMeteorAnimOut2, btnMeteorAnimIn2]);

  const mouseLeaveListener2 = useCallback(() => {
    btnMeteorAnimIn2 && btnMeteorAnimIn2.pause();
    btnMeteorAnimOut2 && btnMeteorAnimOut2.restart();
  }, [btnMeteorAnimOut2, btnMeteorAnimIn2]);

  const touchStartHandlerRocket = (e) => {
    if (!isRocketLit) {
      setIsRocketLit(true);
    }
    e.preventDefault();
  };

  const touchEndHandlerRocket = (e) => {
    if (isRocketLit) {
      setIsRocketLit(false);
    }
    e.preventDefault();
  };

  return (
    <div className={styles.MainSection}>
      <div className={styles.RocketSpacer} ref={rocketSpacer} />

      <img
        className={styles.Rocket}
        ref={rocket}
        src={isRocketLit ? RocketLitSrc : RocketSrc}
        alt="rocket"
        onMouseEnter={touchStartHandlerRocket}
        onMouseLeave={touchEndHandlerRocket}
        onTouchStart={touchStartHandlerRocket}
        onTouchEnd={touchEndHandlerRocket}
      />

      <RocketTrail className={styles.RocketTrail} ref={rocketTrail} />
      <div className={styles.MainBG}>
        <div className={styles.ButtonContainer} ref={buttonContainer}>
          <div className={styles.Button}>
            <div className={styles.MainSectionBtn}>
              <Link to={`${process.env.PUBLIC_URL}/video-vault`}>
                <MainSectionBtn
                  bgSrc={ButtonSrc2}
                  index={2}
                  onEnter={mouseEnterListener2}
                  onLeave={mouseLeaveListener2}
                >
                  Video
                  <br />
                  Vault
                </MainSectionBtn>
              </Link>
            </div>
            <BtnMeteor2 className={styles.BtnMeteor2} ref={meteor2} />
          </div>
          <div
            className={`${styles.Button} ${styles.GamesAppsBtn}`}
            style={{ alignSelf: "start" }}
          >
            <MainSectionBtn
              bgSrc={ButtonSrc1}
              index={1}
              onEnter={mouseEnterListener1}
              onLeave={mouseLeaveListener1}
              onClick={executeScroll}
            >
              Games
              <br />& Apps
            </MainSectionBtn>
            <BtnMeteor1 className={styles.BtnMeteor1} ref={meteor1} />
          </div>
          <div className={styles.Button}>
            <div className={styles.MainSectionBtn}>
              <Link to={`${process.env.PUBLIC_URL}/about`}>
                <MainSectionBtn
                  bgSrc={ButtonSrc3}
                  index={3}
                  onEnter={() => {}}
                  onLeave={() => {}}
                >
                  About
                  <br />
                  Us
                </MainSectionBtn>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div ref={gamesRef} className={styles.GamesScrollRef} id="games&apps" />
      <div className={styles.BottomSection}>
        <GameFeature
          gameTitle={"Motion Mapper"}
          topFeature
          // videoSrc={MotionMapperVideo}
          imageSrc={MotionMapperImage}
          blobSrc={VideoBlob1}
          featureIndex={1}
          linkAddress={"motion-mapper"}
        >
          Take control of lil' Pip and get ready to match the graph! Sharpen
          your understanding of position, velocity and acceleration by creating
          motion graphs in real time. Can you ace all the levels?
        </GameFeature>
        <GameFeature
          gameTitle={"Crack the Circuit"}
          // videoSrc={CrackTheCircuitVideo}
          imageSrc={CrackTheCircuitImage}
          blobSrc={VideoBlob2}
          reverseOrder
          featureIndex={2}
          linkAddress={"crack-the-circuit"}
        >
          A puzzle game that will spark your curiosity! Use batteries, bulbs and
          switches to solve the mystery circuit. Learn about series and parallel
          connections, short circuits and more!
        </GameFeature>
        <GameFeature
          bottomFeature
          gameTitle={"Visual Accelerometer"}
          // videoSrc={VisualAccelerometerVideo}
          imageSrc={VisualAccelerometerImage}
          blobSrc={VideoBlob3}
          featureIndex={3}
          linkAddress={"visual-accelerometer"}
        >
          Design your own physics experiments! Visually represent Newton's laws
          as realtime vectors show you how much force you're exerting on your
          device. Slow motion playback, built-in graphing and exportable data
          make it easy to get right to the physics!
        </GameFeature>
        <DonateCard openDonationModal={props.openDonationModal}>
          <span className={styles.UM}>Universe & More</span> games are created
          by Matthew Blackman - a public school AP Physics teacher. Your support
          helps keep these resources available and free to students & teachers
          across the universe. Please consider making a small donation to
          sustain the development of new materials!
        </DonateCard>
        <NewsletterSignup />
      </div>
    </div>
  );
};

export default MainSection;

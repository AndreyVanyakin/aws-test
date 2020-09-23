import React, { useState, useMemo, useEffect } from "react";

import styles from "./AboutPage.module.scss";

import Logo from "../../components/Logo/Logo";
import DonateCard from "../LandingPage/DonateCard";
import NewsletterSignup from "../NewsletterSignup/NewsletterSignup";

import { ReactComponent as TopBorder } from "../../assets/images/svg/aboutBorderTop.svg";
import { ReactComponent as BlackHoleBlob } from "../../assets/images/svg/blackHoleBlue.svg";
import headshot from "../../assets/images/headshot.jpg";

const AboutPage = (props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.AboutPage}>
      <div className={styles.StarBG} />
      <Logo isLink />
      <div className={styles.Heading}>About Us</div>
      <TopBorder className={styles.TopBorder} />
      <div className={styles.MainSection}>
        <div className={styles.BioSection}>
          <BlackHoleBlob className={styles.BlackHoleBlob} />
          <div className={styles.Headshot}>
            <img src={headshot} className={styles.HeadshotImage} />
          </div>
          <div className={styles.BioText}>
            <p className={styles.BioParagraph}>
              Universe & More is an educational nonprofit with a mission to make
              physics accessible and fun for all students. We develop
              interactive resources that are built from the ground up with
              physics pedagogy in mind. Our games are designed and tested to
              provide an immersive and engaging experience for students, helping
              them develop an intuition for physics concepts.
            </p>
            <p className={styles.BioParagraph}>
              Matthew Blackman created Universe & More in 2010 as a way to
              translate and share his favorite physics lessons with other
              teachers and their students. He has over a decade of experience
              teaching High School AP Physics in NJ public schools, is a
              graduate instructor and alumnus of the Rutgers University Graduate
              School of Education, and was named the National PhysTEC Teacher of
              the Year in 2019. Because of Matthew's combined skills as an
              educator, game designer and web developer, Universe & More
              resources are designed holistically with learning objectives as an
              integral part of the gameplay.
            </p>
            <p className={styles.BioParagraph}>
              Universe & More is dedicated to making quality physics resources
              that enhance, but do not replace, classroom instruction. We know
              that versatility and ease-of-use are key for teachers, which is
              why our apps are built to work on any device and integrate
              seamlessly with virtual instruction. Ensuring open access to these
              resources is vital and important to our work.
            </p>
            <p>
              We appreciate all of your support and hope you have as much fun
              playing these games as we had making them!
            </p>
          </div>
        </div>
        <DonateCard openDonationModal={props.openDonationModal}>
          Your support helps keep these resources available and free to students
          & teachers across the universe. Please consider making a small
          donation to sustain the development of new materials!
        </DonateCard>
        <NewsletterSignup />
      </div>
    </div>
  );
};

export default AboutPage;

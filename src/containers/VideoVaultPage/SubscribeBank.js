import React, { useState } from "react";
import styles from "./SubscribeBank.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

import YouTubeSubscribe from "./youtubeSubscribe";

const SubscribeBank = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const creatorIds = [
    "UCHnyfMqiRRG1u-2MsSQLbXA", //Veritasium
    "UC7DdEm33SyaTDtWYGO2CwdA", //PhysicsGirl
    "UCsXVk37bltHxD1rDPwtNM8Q", //Kurz
    "UC6107grRI4m0o2-emgoDnAA", //Smarter
    "UCUHW94eEFW7hkUMVaZz4eDg", //Minute
    // "UC7_gcs09iThXybpVgjHZ_7g", //SpaceTime
    "UC6nSFpj9HTCZ5t-N3Rm3-HA", //Vsauce
    "UCUK0HBIBWgM2c4vsPhkYY4w", //SlowMo
    //"UCe_vXdMrHHseZ_esYUskSBw", //CrazyRussian
    //"UCZYTClx2T1of7BRZ86-8fow", //SciShow
    // "UCeQEKFH31vvD-InkTGSvCrA", //Bruss
    //"UCvBqzzvUBLCs8Y7Axb-jZew", //60 Symbols
    // "UCLA_DiR1FfKNvjuUpBHmylQ", //NASA
    //"UCEik-U3T6u6JA0XiHLbNbOw", //Bozeman
    "UCJ0yBou72Lz9fqeMXh9mkog", //Eugene
    "UCYqACVYl0c0BhlVN6X2HIMg", //Flipping
    "UCNk3CeLpCA0qIZsuzGl09cw", //Bruce
    "UCujISSgt4k4A1AwkoXcqXvA", //Animations
    "UCsooa4yRKGN_zEE8iknghZA", //TED-Ed
  ];

  const bank = creatorIds.map((id) => {
    return (
      <section className={styles.YouTubeSubscribeContainer} key={id}>
        <YouTubeSubscribe
          // channelName={channelName}
          key={id}
          channelid={id}
          theme={"dark"}
          layout={"full"}
          count={"default"}
        />
      </section>
    );
  });

  return (
    <div className={styles.SubscribeBankContainer}>
      <div
        className={styles.SubscribeBank}
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}
      >
        <div className={styles.Message}>
          If you find a video useful, please support the content creators!
        </div>
        {isOpen && bank}
        <FontAwesomeIcon
          className={isOpen ? styles.ChevronOpen : styles.Chevron}
          icon={faChevronDown}
        />
      </div>
    </div>
  );
};

export default SubscribeBank;

import React from "react";
import styles from "./GameFeature.module.scss";

import Button from "../../components/Button/Button";

const GameFeature = (props) => {
  const classes = [styles.GameFeature];
  if (props.topFeature) classes.push(styles.GameFeatureTop);
  else if (props.bottomFeature) classes.push(styles.GameFeatureBottom);

  const videoBlobClasses = [styles.VideoBlob];
  if (props.featureIndex === 1) videoBlobClasses.push(styles.VideoBlob1);
  else if (props.featureIndex === 2) videoBlobClasses.push(styles.VideoBlob2);
  else if (props.featureIndex === 3) videoBlobClasses.push(styles.VideoBlob3);

  if (props.reverseOrder) {
    classes.push(styles.GameFeatureReversed);
  }

  // const isSafari = () => {
  //   const ua = navigator.userAgent.toLowerCase();
  //   return ua.indexOf("safari") > -1 && ua.indexOf("chrome") < 0;
  // };

  // const videoParentRef = useRef();
  // const [shouldUseImage, setShouldUseImage] = useState(false);
  // useEffect(() => {
  //   // check if user agent is safari and we have the ref to the container <div />
  //   if (isSafari() && videoParentRef.current) {
  //     // obtain reference to the video element
  //     const player = videoParentRef.current.children[0];

  //     // if the reference to video player has been obtained
  //     if (player) {
  //       // set the video attributes using javascript as per the
  //       // webkit Policy
  //       player.controls = false;
  //       player.playsinline = true;
  //       player.muted = true;
  //       player.setAttribute("muted", ""); // leave no stones unturned :)
  //       player.autoplay = true;

  //       // Let's wait for an event loop tick and be async.
  //       setTimeout(() => {
  //         // player.play() might return a promise but it's not guaranteed crossbrowser.
  //         const promise = player.play();
  //         // let's play safe to ensure that if we do have a promise
  //         if (promise.then) {
  //           promise
  //             .then(() => {})
  //             .catch(() => {
  //               // if promise fails, hide the video and fallback to <img> tag
  //               videoParentRef.current.style.display = "none";
  //               setShouldUseImage(true);
  //             });
  //         }
  //       }, 0);
  //     }
  //   }
  // }, []);

  return (
    <div className={classes.join(" ")}>
      <div className={styles.GameInfo}>
        <h1 className={styles.Heading}>{props.gameTitle}</h1>
        <p className={styles.Description}>{props.children}</p>

        <a
          href={props.linkAddress}
          alt="Motion Mapper"
          target="_blank"
          className={styles.PlayButtonLink}
        >
          <Button playBtn className={styles.PlayButton} clickHandler={() => {}}>
            Play now!
          </Button>
        </a>
      </div>
      <div className={styles.Spacer} />
      <div className={styles.VideoContainer}>
        <img src={props.blobSrc} className={videoBlobClasses.join(" ")} />
        <img
          src={props.imageSrc}
          className={styles.FeatureImage}
          alt="Game image"
        />
        {/* <Suspense fallback={<div>Loading video...</div>}>
          {" "}
          {shouldUseImage ? (
            <img src={props.videoSrc} alt="Muted Video" />
          ) : (
            <div
              ref={videoParentRef}
              dangerouslySetInnerHTML={{
                __html: `
          <video
            loop
            muted
            autoplay
            playsinline
            preload="metadata"
            style="width:100%;border-radius:1.4rem;"
          >
          <source src="${props.videoSrc}" type="video/mp4" />
          </video>`,
              }}
            />
          )}
        </Suspense> */}
      </div>
    </div>
  );
};

export default GameFeature;

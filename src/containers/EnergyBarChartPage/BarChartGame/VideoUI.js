import React, { useState, useRef } from "react";
import styles from "./VideoUI.module.scss";

import VideoSlider from "./VideoSlider";

import ReactPlayer from "react-player/lazy";
import videoURL from "../energy-videos/pole-vault.mp4";

const VideoUI = (props) => {
  const [playing, setPlaying] = useState(false);
  const [seeking, setSeeking] = useState(false);
  const [playClickedAtLeastOnce, setPlayClickedAtLeastOnce] = useState(false);
  const [played, setPlayed] = useState(0);
  const [instant1Percent, setInstant1Percent] = useState(20);
  const [instant2Percent, setInstant2Percent] = useState(50);

  const player = useRef(null);

  const handleSeekMouseDown = (e) => {
    setPlaying(false);
    setSeeking(true);
    if (!playClickedAtLeastOnce) setPlayClickedAtLeastOnce(true);
  };

  const handleSeekChange = (val) => {
    setPlayed(parseFloat(val / 100));
    player.current.seekTo(val / 100);
  };

  const handleSeekMouseUp = (e) => {
    setSeeking(false);
    player.current.seekTo(e / 100, "fraction");
  };

  const handleProgress = (e) => {
    if (!seeking) {
      setPlayed(e.played);
    }
  };

  const seekToInstant = (instantPercent) => {
    setPlaying(false);
    handleSeekChange(instantPercent);
  };

  const playPauseBtnClasses = [];

  /////// Instant number labels

  const instantLabelThreshold = 3; //% margin to highlight instant label

  const instant1LabelClasses = [styles.Instant1Label];
  const instant2LabelClasses = [styles.Instant2Label];

  const instant1DisplayClasses = [styles.InstantDisplay];
  const instant2DisplayClasses = [styles.InstantDisplay];

  if (!playing) playPauseBtnClasses.push(styles.PlayButtonContainer);
  else playPauseBtnClasses.push(styles.PlayButtonContainerPaused);

  if (playClickedAtLeastOnce)
    playPauseBtnClasses.push(styles.PlayButtonContainerDisappear);

  if (seeking) playPauseBtnClasses.push(styles.PlayButtonContainerInvisible);

  if (
    100 * played > instant1Percent - instantLabelThreshold &&
    100 * played < instant1Percent + instantLabelThreshold
  ) {
    instant1LabelClasses.push(styles.Instant1LabelHighlighted);
    if (!props.instant1Highlighted) {
      props.highlightInstant(1, true);
      // console.log("here");
    }
  } else {
    if (props.instant1Highlighted) {
      props.highlightInstant(1, false);
      // console.log("wgrerv");
    }
  }

  if (
    100 * played > instant2Percent - instantLabelThreshold &&
    100 * played < instant2Percent + instantLabelThreshold
  ) {
    instant2LabelClasses.push(styles.Instant2LabelHighlighted);
    if (!props.instant2Highlighted) {
      props.highlightInstant(2, true);
    }
  } else if (props.instant2Highlighted) {
    props.highlightInstant(2, false);
  }

  if (props.instant1Highlighted) {
    instant1DisplayClasses.push(styles.InstantDisplayShowing);
  } else instant1DisplayClasses.push(styles.InstantDisplayHiding);
  if (props.instant2Highlighted) {
    instant2DisplayClasses.push(styles.InstantDisplayShowing);
  } else instant2DisplayClasses.push(styles.InstantDisplayHiding);

  return (
    <div className={styles.VideoUI}>
      <div
        className={styles.VideoContainer}
        onClick={() => {
          setPlaying((p) => {
            if (!playClickedAtLeastOnce) setPlayClickedAtLeastOnce(true);
            return !p;
          });
        }}
      >
        <div className={instant1DisplayClasses.join(" ")}>Initial</div>
        <div className={instant2DisplayClasses.join(" ")}>Final</div>
        <div className={playPauseBtnClasses.join(" ")}>
          <span
            className={`${styles.PlayButton} ${styles.PlayButtonBefore}`}
          ></span>
          <span
            className={`${styles.PlayButton} ${styles.PlayButtonAfter}`}
          ></span>
        </div>
        <ReactPlayer
          ref={player}
          className={styles.Video}
          playing={playing}
          playbackRate={1}
          controls={false}
          loop={true}
          volume={1}
          muted={false}
          pip={false}
          url={videoURL}
          progressInterval={20}
          onProgress={handleProgress}
        />
      </div>
      <div className={styles.SliderContainer}>
        <VideoSlider
          value={played * 100}
          onMouseDown={handleSeekMouseDown}
          onChange={handleSeekChange}
          onMouseUp={handleSeekMouseUp}
        />
      </div>
      <div className={styles.InstantLabels}>
        <div
          className={instant1LabelClasses.join(" ")}
          onClick={() => {
            seekToInstant(instant1Percent);
            props.highlightInstant(1, true);
            props.highlightInstant(2, false);
          }}
          style={{ left: `${instant1Percent}%` }}
        >
          i
        </div>
        <div
          className={instant2LabelClasses.join(" ")}
          style={{ left: `${instant2Percent}%` }}
          onClick={() => {
            seekToInstant(instant2Percent);
            props.highlightInstant(1, false);
            props.highlightInstant(2, true);
          }}
        >
          f
        </div>
      </div>
    </div>
  );
};

export default VideoUI;

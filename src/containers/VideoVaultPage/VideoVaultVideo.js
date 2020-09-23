import React, { createRef, useState, useEffect, useMemo } from "react";

import styles from "./VideoVaultVideo.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const VideoVaultVideo = (props) => {
  const [showElement, setShowElement] = useState(true);
  const [showVideo, setShowVideo] = useState(false);
  const container = createRef();

  const videoObserver = useMemo(
    () =>
      new IntersectionObserver(onVideoIntersection, {
        rootMargin: "300px 0px",
        threshold: 0,
      })
  );

  useEffect(() => {
    if (window && "IntersectionObserver" in window) {
      if (container && container.current) {
        videoObserver.observe(container.current);
      }
    } else {
      if (props.listIndex < 30) {
        //only show the first 30 videos if Intersection Observer not supported (IE)
        setShowElement(true);
        setShowVideo(true);
      } else {
        setShowVideo(false);
        setShowElement(false);
      }
    }
    return () => {
      videoObserver.disconnect();
    };
  }, [container, props.listIndex, videoObserver]);

  function onVideoIntersection(entries) {
    if (!entries || entries.length <= 0) {
      return;
    }

    if (entries[0].isIntersecting) {
      setShowVideo(true);
    } else if (showVideo) {
      setShowVideo(false);
    }
  }

  const categories = props.categories.map((category, i) => {
    return (
      <div
        className={
          props.selectedCategories.length > 0 &&
          props.selectedCategories.includes(category)
            ? `${styles.Category} ${styles.CategorySelected}`
            : styles.Category
        }
        key={i}
      >
        {category}
      </div>
    );
  });

  const topics = props.topics.map((topic, i) => {
    return (
      <div
        className={
          props.selectedTopics.length > 0 &&
          props.selectedTopics.includes(topic)
            ? `${styles.Topic} ${styles.TopicSelected}`
            : styles.Topic
        }
        key={i}
      >
        {topic}
      </div>
    );
  });

  return (
    <React.Fragment>
      {showElement && (
        <div className={styles.VideoWrapper}>
          <div>
            <div
              className={
                props.starred
                  ? `${styles.VideoHeading} ${styles.VideoHeadingStarred}`
                  : styles.VideoHeading
              }
            >
              {props.heading}
              {props.creator && (
                <div className={styles.CreatorName}>{props.creator}</div>
              )}
            </div>
            {props.starred && (
              <div className={styles.Star}>
                <FontAwesomeIcon icon={faStar} />
              </div>
            )}
          </div>
          <div className={styles.Video} ref={container}>
            {showVideo && (
              <iframe
                className={styles.VideoIframe}
                allowFullScreen
                mozallowfullscreen="mozallowfullscreen"
                msallowfullscreen="msallowfullscreen"
                oallowfullscreen="oallowfullscreen"
                webkitallowfullscreen="webkitallowfullscreen"
                src={`https://www.youtube.com/embed/${props.id}`}
                title={props.id}
                frameBorder="0"
              />
            )}
          </div>
          <div className={styles.VideoTags}>
            <div className={styles.Categories}>{categories}</div>
            <div className={styles.Topics}>{topics}</div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default VideoVaultVideo;

import React, { useState, useMemo, useEffect } from "react";

import videoData from "./videoData.json";
import styles from "./VideoVaultPage.module.scss";

import Logo from "../../components/Logo/Logo";
import FilterBar from "./FilterBar";
import VideoVaultVideo from "./VideoVaultVideo";

import SubscribeBank from "./SubscribeBank";

const VideoVaultPage = () => {
  const [selectedCategoryFilters, setSelectedCategoryFilters] = useState([]);
  const [selectedTopicFilters, setSelectedTopicFilters] = useState([]);
  const [selectedCreatorFilters, setSelectedCreatorFilters] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredVideos = useMemo(
    () =>
      videoData.videos
        .filter((videoInfo) => {
          let hasMatch = false;

          //if there are no categories or topics selected, show all videos
          if (
            selectedCategoryFilters.length === 0 &&
            selectedTopicFilters.length === 0 &&
            selectedCreatorFilters.length === 0
          ) {
            hasMatch = true;
          }
          //if no content creator is selected
          else if (selectedCreatorFilters.length === 0) {
            //if there are only topic filters selected, filter based on topic
            if (selectedCategoryFilters.length === 0) {
              videoInfo.topics.forEach((top) => {
                if (selectedTopicFilters.includes(top)) {
                  hasMatch = true;
                  return;
                }
              });
            }
            //if there are category  filters selected, filter based on category, then topic
            else {
              videoInfo.categories.forEach((cat) => {
                if (selectedCategoryFilters.includes(cat)) {
                  hasMatch = true;
                  return;
                }
              });
            }
          } else {
            //if the content creator is selected
            if (
              videoInfo.creator &&
              selectedCreatorFilters.includes(videoInfo.creator)
            ) {
              if (
                selectedCategoryFilters.length === 0 &&
                selectedTopicFilters.length === 0
              ) {
                hasMatch = true;
                return true;
              }
              //if there are only topic filters selected, filter based on topic
              else if (selectedCategoryFilters.length === 0) {
                videoInfo.topics.forEach((top) => {
                  if (selectedTopicFilters.includes(top)) {
                    hasMatch = true;
                    return true;
                  }
                });
              }
              //if there are category  filters selected, filter based on category, then topic
              else {
                videoInfo.categories.forEach((cat) => {
                  if (selectedCategoryFilters.includes(cat)) {
                    hasMatch = true;
                    return true;
                  }
                });
              }
            } else {
              hasMatch = false;
              return false;
            }
          }

          return hasMatch;
        })
        .map((videoInfo, index) => {
          let numCategoryMatches = 0;
          let numTopicMatches = 0;

          videoInfo.categories.forEach((cat) => {
            if (selectedCategoryFilters.includes(cat)) {
              numCategoryMatches++;
            }
          });

          videoInfo.topics.forEach((top) => {
            if (selectedTopicFilters.includes(top)) {
              numTopicMatches++;
            }
          });

          return {
            numCatMatches: numCategoryMatches,
            numTopicMatches: numTopicMatches,
            element: (
              <VideoVaultVideo
                key={videoInfo.id}
                id={videoInfo.id}
                listIndex={index}
                heading={videoInfo.heading}
                creator={
                  videoInfo.creator.length > 0 ? videoInfo.creator : null
                }
                categories={videoInfo.categories}
                topics={videoInfo.topics}
                selectedCategories={selectedCategoryFilters}
                selectedTopics={selectedTopicFilters}
                starred={
                  numCategoryMatches + numTopicMatches > 0 &&
                  numCategoryMatches + numTopicMatches ===
                    selectedCategoryFilters.length + selectedTopicFilters.length
                }
              />
            ),
          };
        }),
    [selectedCategoryFilters, selectedTopicFilters, selectedCreatorFilters]
  );

  const sortedVideoElements = useMemo(
    () =>
      filteredVideos.sort(function (videoObj1, videoObj2) {
        if (videoObj1.numCatMatches === videoObj2.numCatMatches) {
          if (videoObj1.numTopicMatches > videoObj2.numTopicMatches) {
            return -1;
          } else if (videoObj1.numTopicMatches < videoObj2.numTopicMatches) {
            return 1;
          } else return 0;
        } else if (videoObj1.numCatMatches > videoObj2.numCatMatches) {
          return -1;
        } else if (videoObj1.numCatMatches < videoObj2.numCatMatches) {
          return 1;
        } else return 0;
      }),
    [filteredVideos]
  );

  const filteredSortedVideoElements = useMemo(() => {
    const allVideos = sortedVideoElements.map((videoObj) => {
      return videoObj.element;
    });
    const length = allVideos.length;

    const items = [];

    for (var i = 0; i < length; i++) {
      //new video chunk
      const multiple = i < 6 ? 6 : 18;
      if (i % multiple === 0) {
        if (i + multiple >= length) {
          items.push(allVideos.slice(i, length));
          if (length - i >= 12) {
            //don't put 2 messages close together if there are few elements b/w
            items.push(<SubscribeBank key={i} />);
          }
        } else {
          items.push(allVideos.slice(i, i + multiple));
          items.push(<SubscribeBank key={i} />);
        }
      }
    }

    return items;
  }, [sortedVideoElements]);

  return (
    <div className={styles.VideoVaultPage}>
      <div className={styles.StarBG} />
      <Logo isLink />
      <div className={styles.Heading}>Video Vault</div>
      <div className={styles.SubHeading}>
        Physics videos organized by content area and topic
      </div>
      <FilterBar
        data={videoData}
        selectedCategoryFilters={selectedCategoryFilters}
        setSelectedCategoryFilters={setSelectedCategoryFilters}
        selectedTopicFilters={selectedTopicFilters}
        setSelectedTopicFilters={setSelectedTopicFilters}
        selectedCreatorFilters={selectedCreatorFilters}
        setSelectedCreatorFilters={setSelectedCreatorFilters}
      />
      <div className={styles.VideoSection}>
        {filteredSortedVideoElements.length > 0 ? (
          filteredSortedVideoElements
        ) : (
          <div className={styles.NoResults}>
            There are no results that fit these search criteria.
            <br />
            <br />
            Recommend a video by connecting with us below!
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoVaultPage;

import React, { useState } from "react";
import styles from "./FilterBar.module.scss";

import FilterDropdown from "./FilterDropdown";

const FilterBar = (props) => {
  const data = props.data;
  const categories = Object.keys(data.categories);
  const creators = data.creators;

  Array.prototype.unique = function () {
    var a = this.concat();
    for (var i = 0; i < a.length; ++i) {
      for (var j = i + 1; j < a.length; ++j) {
        if (a[i] === a[j]) a.splice(j--, 1);
      }
    }
    return a;
  };

  const allTopics = Object.values(data.categories);
  let allTopicsTrimmed = [];
  allTopics.forEach((array) => {
    allTopicsTrimmed = allTopicsTrimmed.concat(array).unique();
  });

  const [availableTopicFilters, setAvailableTopicFilters] = useState(
    allTopicsTrimmed
  );

  const updateSelectedCategoryFilters = (selectedCategoryFilters) => {
    props.setSelectedCategoryFilters(selectedCategoryFilters);
    setAvailableTopicFiltersForCategories(selectedCategoryFilters);
  };

  const updateSelectedTopicFilters = (selectedTopicFilters) => {
    props.setSelectedTopicFilters(selectedTopicFilters);
  };

  const setAvailableTopicFiltersForCategories = (selectedCategories) => {
    if (selectedCategories.length === 0) {
      setAvailableTopicFilters(allTopicsTrimmed);
      trimSelectedTopicFilters(selectedCategories, allTopicsTrimmed);
      return;
    }

    let topicsTrimmed = [];
    selectedCategories.forEach((category) => {
      topicsTrimmed = topicsTrimmed.concat(data.categories[category]).unique();
    });
    setAvailableTopicFilters(topicsTrimmed);
    trimSelectedTopicFilters(selectedCategories, topicsTrimmed);
  };

  const trimSelectedTopicFilters = (selectedCategories, availableTopics) => {
    if (selectedCategories.length === 0) {
      props.setSelectedTopicFilters([]);
      return;
    }

    var filtered = props.selectedTopicFilters.filter(function (e) {
      return this.indexOf(e) >= 0;
    }, availableTopics);

    props.setSelectedTopicFilters(filtered);
  };

  const updateSelectedCreatorFilters = (selectedCreatorFilters) => {
    props.setSelectedCreatorFilters(selectedCreatorFilters);
  };

  return (
    <div className={styles.FilterBar}>
      <FilterDropdown
        availableFilters={categories}
        uiIndex={1}
        selectedFilters={props.selectedCategoryFilters}
        updateSelectedFilters={updateSelectedCategoryFilters}
      >
        Categories
      </FilterDropdown>
      <FilterDropdown
        availableFilters={availableTopicFilters}
        uiIndex={2}
        selectedFilters={props.selectedTopicFilters}
        updateSelectedFilters={updateSelectedTopicFilters}
      >
        Topics
      </FilterDropdown>
      <FilterDropdown
        availableFilters={creators}
        uiIndex={3}
        selectedFilters={props.selectedCreatorFilters}
        updateSelectedFilters={updateSelectedCreatorFilters}
      >
        Creators
      </FilterDropdown>
    </div>
  );
};

export default FilterBar;

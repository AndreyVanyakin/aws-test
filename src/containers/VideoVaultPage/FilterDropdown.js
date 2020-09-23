import React, { useState } from "react";
import styles from "./FilterDropdown.module.scss";

import { makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faCheckSquare } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const useButtonStyles = makeStyles((theme) => ({
  root: {
    borderRadius: "5rem",
    color: "#f9f9f9",
    backgroundColor: "rgba(0,0,0, 0.15)",
    height: 48,
    minHeight: 60,
    fontSize: "3rem",
    paddingTop: "30px",
    paddingBottom: "30px",
    paddingLeft: "40px",
    paddingRight: "40px",
    textTransform: "none",
    fontFamily: "Montserrat",
    [theme.breakpoints.down("xl")]: {
      paddingTop: "25px",
      paddingBottom: "25px",
    },
    [theme.breakpoints.down("lg")]: {
      paddingTop: "0px",
      paddingBottom: "0px",
    },
    [theme.breakpoints.down("md")]: {
      paddingTop: "10px",
      paddingBottom: "10px",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "2rem",
      paddingTop: "0",
      paddingBottom: "0",
      paddingLeft: "25px",
      paddingRight: "25px",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "2.5rem",
      paddingTop: "0",
      paddingBottom: "0",
      paddingLeft: "20px",
      paddingRight: "20px",
    },
  },
}));

const useItemStyles1 = makeStyles((theme) => ({
  root: {
    fontSize: "2.5rem",
    fontFamily: "Montserrat",
    textTransform: "none",
    backgroundColor: "#f3775b",
    color: "#f9f9f9",
    "&:hover": {
      color: "#f3775b",
      backgroundColor: "#f9f9f9",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "2rem",
    },
  },
}));

const useItemStyles2 = makeStyles((theme) => ({
  root: {
    fontSize: "2.5rem",
    fontFamily: "Montserrat",
    textTransform: "none",
    backgroundColor: "#41bdd7",
    color: "#f9f9f9",
    "&:hover": {
      color: "#41bdd7",
      backgroundColor: "#f9f9f9",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "2rem",
    },
  },
}));

const useItemStyles3 = makeStyles((theme) => ({
  root: {
    fontSize: "2.5rem",
    fontFamily: "Montserrat",
    textTransform: "none",
    backgroundColor: "#8ec099",
    color: "#f9f9f9",
    "&:hover": {
      color: "#8ec099",
      backgroundColor: "#f9f9f9",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "2rem",
    },
  },
}));

const ITEM_HEIGHT = 70;

const FilterDropdown = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const buttonClasses = useButtonStyles();
  const itemClasses1 = useItemStyles1();
  const itemClasses2 = useItemStyles2();
  const itemClasses3 = useItemStyles3();

  const handleClick = (event) => {
    if (!open) {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleItemClick = (event) => {
    const { myValue } = event.currentTarget.dataset;
    toggleItem(props.availableFilters[myValue]);
  };

  const handleSelectedOptionClick = (option) => {
    toggleItem(option);
  };

  const toggleItem = (item) => {
    const newSelectedFilters = props.selectedFilters.includes(item)
      ? props.selectedFilters.filter((i) => i !== item) // remove item
      : [...props.selectedFilters, item]; // add item

    const newSelectedFiltersOrdered = props.availableFilters.filter((item) => {
      return newSelectedFilters.includes(item);
    });

    props.updateSelectedFilters(newSelectedFiltersOrdered);
  };

  const menuItems = props.availableFilters.map((option, i) => {
    const selected = props.selectedFilters.includes(option);
    const rootStyles =
      props.uiIndex === 1
        ? itemClasses1.root
        : props.uiIndex === 2
        ? itemClasses2.root
        : itemClasses3.root;
    return (
      <MenuItem
        key={option}
        data-my-value={i}
        classes={{
          root: rootStyles,
        }}
        onClick={handleItemClick}
      >
        {selected && (
          <FontAwesomeIcon className={styles.MenuCheck} icon={faCheckSquare} />
        )}
        {option}
      </MenuItem>
    );
  });

  const selectedFilterBubbles = props.selectedFilters.map((option) => {
    const classes = [styles.Option];
    if (props.uiIndex === 1) {
      classes.push(styles.CategoryOption);
    } else if (props.uiIndex === 2) {
      classes.push(styles.TopicOption);
    } else {
      classes.push(styles.CreatorOption);
    }
    return (
      <div
        key={option}
        className={classes.join(" ")}
        onClick={() => handleSelectedOptionClick(option)}
      >
        {option} <FontAwesomeIcon className={styles.OptionX} icon={faTimes} />
      </div>
    );
  });

  const bgCol =
    props.uiIndex === 1
      ? "#f3775b"
      : props.uiIndex === 2
      ? "#41bdd7"
      : "#8ec099";

  const classes = [styles.FilterDropdown];
  if (props.uiIndex === 3) classes.push(styles.FilterDropdownCreator);

  return (
    <div className={classes.join(" ")}>
      <Button
        classes={{
          root: buttonClasses.root, // class name, e.g. `classes-nesting-root-x`
        }}
        aria-controls="fade-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        {props.children}
        <FontAwesomeIcon className={styles.FaIcon} icon={faChevronDown} />
      </Button>
      <Menu
        id="long-menu"
        MenuListProps={{ disablePadding: true, onMouseLeave: handleClose }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            backgroundColor: bgCol,
          },
        }}
      >
        {menuItems}
      </Menu>
      <div className={styles.SelectedFilterBubbles}>
        {selectedFilterBubbles}
      </div>
    </div>
  );
};

export default FilterDropdown;

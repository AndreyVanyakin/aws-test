import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
// import Paper from "@material-ui/core/Paper";
import Slider from "@material-ui/core/Slider";
// import Typography from "@material-ui/core/Typography";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     width: 300 + 24 * 2,
//     padding: 24,
//   },
//   margin: {
//     height: theme.spacing(1),
//   },
// }));

const PrettoSlider = withStyles({
  root: {
    color: "#8ec099",
    height: 14,
  },
  thumb: {
    height: 26,
    width: 26,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    font: "Montserrat",
    marginTop: -6,
    marginLeft: -14,
    "&:focus,&:hover,&$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 6px)",
    color: "#fff",
  },
  track: {
    height: 14,
    borderRadius: 7,
  },
  rail: {
    height: 14,
    borderRadius: 7,
  },
})(Slider);

const VideoSlider = (props) => {
  return (
    <PrettoSlider
      // valueLabelDisplay="auto"
      aria-label="pretto slider"
      defaultValue={0}
      step={0.1}
      value={props.value}
      onMouseDown={props.onMouseDown}
      onChange={(event, v) => {
        props.onChange(v);
      }}
      onChangeCommitted={(event, v) => {
        props.onMouseUp(v);
      }}
    />
  );
};
export default VideoSlider;

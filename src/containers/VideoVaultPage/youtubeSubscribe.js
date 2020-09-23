import React, { useEffect } from "react";

const YouTubeSubscribe = (props) => {
  const { theme, layout, count, channelName, channelid } = props;

  const youtubeSubscribeNode = React.createRef();

  useEffect(() => {
    const youtubescript = document.createElement("script");
    youtubescript.src = "https://apis.google.com/js/platform.js";
    youtubeSubscribeNode.current.parentNode.appendChild(youtubescript);

    return () => {};
  }, [youtubeSubscribeNode]);

  return (
    <section className="youtubeSubscribe">
      <div
        ref={youtubeSubscribeNode}
        style={{ minHeight: "50px", boxSizing: "border-box" }}
        className="g-ytsubscribe"
        data-theme={theme}
        data-layout={layout}
        data-count={count}
        data-channel={channelName}
        data-channelid={channelid}
      />
    </section>
  );
};

export default YouTubeSubscribe;

// import React, { Component } from "react";

// export default class YouTubeSubscribe extends Component {
//   static defaultProps = {
//     channelName: "",
//     channelid: "UCaYhcUwRBNscFNUKTjgPFiA",
//     theme: "full",
//     layout: "default",
//     count: "default",
//   };

/**
 *  React.createRef to attach script after mount
 *  Ref) https://reactjs.org/docs/refs-and-the-dom.html
 */

//   constructor(props) {
//     super(props);
//     this.youtubeSubscribeNode = React.createRef();

//     // To render components economically w/o repetition
//     this.state = {
//       initialized: false,
//     };
//   }

//   initialized() {
//     this.setState({
//       initialized: true,
//     });
//   }

/**
 * 1. Script for API doesn't work in index.html.
 * 2. So You have to make it after components render.
 * 3. Make a script with JavaScript method to work.
 * 4. It is a little slow to show component at first.
 * 5. YouTube API gives you channelId instead channelName
 *    So You don't have to think about channelName when you
 *    need its API.
 */

//   componentDidMount() {
//     if (this.state.initialized) {
//       return;
//     }

// Make <script src="https://apis.google.com/js/platform.js" ></script>
//     const youtubescript = document.createElement("script");
//     youtubescript.src = "https://apis.google.com/js/platform.js";
//     this.youtubeSubscribeNode.current.parentNode.appendChild(youtubescript);
//     this.initialized();
//   }

// shouldComponentUpdate(nextProps, nextState) {
//   if (this.props.channelName === nextProps.channelName) {
//     return false;
//   }

//   if (this.props.channelid === nextProps.channelid) {
//     return false;
//   }

//   return true;
// }

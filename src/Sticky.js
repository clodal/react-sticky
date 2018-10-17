import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

export default class Sticky extends Component {
  static propTypes = {
    topOffset: PropTypes.number,
    bottomOffset: PropTypes.number,
    relative: PropTypes.bool,
    children: PropTypes.func.isRequired,
    bottom: PropTypes.bool,
    bottomAnchor: PropTypes.bool,
    mobileStyle: PropTypes.shape({
      width: PropTypes.number.isRequired,
      style: PropTypes.string.isRequired,
    }),
  };

  static defaultProps = {
    relative: false,
    topOffset: 0,
    bottomOffset: 0,
    disableCompensation: false,
    disableHardwareAcceleration: false,
    bottom: false,
    bottomAnchor: false,
    mobileStyle: undefined,
  };

  static contextTypes = {
    subscribe: PropTypes.func,
    unsubscribe: PropTypes.func,
    getParent: PropTypes.func
  };

  state = {
    isSticky: false,
    wasSticky: false,
    style: {}
  };

  componentWillMount() {
    if (!this.context.subscribe)
      throw new TypeError(
        "Expected Sticky to be mounted within StickyContainer"
      );

    this.context.subscribe(this.handleContainerEvent);
  }

  componentWillUnmount() {
    this.context.unsubscribe(this.handleContainerEvent);
  }

  componentDidUpdate() {
    this.placeholder.style.paddingBottom = this.props.disableCompensation
      ? 0
      : `${this.state.isSticky ? this.state.calculatedHeight : 0}px`;
  }

  handleContainerEvent = ({
    distanceFromTop,
    distanceFromBottom,
    eventSource
  }) => {
    const parent = this.context.getParent();

    let preventingStickyStateChanges = false;
    if (this.props.relative) {
      preventingStickyStateChanges = eventSource !== parent;
      distanceFromTop =
        -(eventSource.scrollTop + eventSource.offsetTop) +
        this.placeholder.offsetTop;
    }

    const placeholderClientRect = this.placeholder.getBoundingClientRect();
    const contentClientRect = this.content.getBoundingClientRect();
    const calculatedHeight = contentClientRect.height;

    const bottomDifference = distanceFromBottom - this.props.bottomOffset - calculatedHeight;
    const topDifference = distanceFromTop - this.props.topOffset - calculatedHeight;

    const isTopSticky = Math.min(0, distanceFromTop) <= -this.props.topOffset &&
      distanceFromBottom > -this.props.bottomOffset

    const isBottomSticky = Math.min(0, distanceFromTop) <= -this.props.topOffset &&
      distanceFromBottom > -this.props.bottomOffset

    const wasSticky = !!this.state.isSticky;
    const getIsSticky = () => this.props.bottom ? isBottomSticky : isTopSticky
    const isSticky = preventingStickyStateChanges
      ? wasSticky
      : getIsSticky();

    distanceFromBottom =
      (this.props.relative
        ? parent.scrollHeight - parent.scrollTop
        : distanceFromBottom) - calculatedHeight;


    const windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

    const baseStickyStyle = {
      position: "fixed",
      left: placeholderClientRect.left,
      width: placeholderClientRect.width,
    }
    const stickyStyles = {
      topStickyStyle: {
        top:
          bottomDifference > 0
            ? this.props.relative
            ? parent.offsetTop - parent.offsetParent.scrollTop
            : 0
            : bottomDifference,
      },
      bottomStickyStyle: {
        bottom:
          bottomDifference - windowHeight > 0
            ? this.props.relative
            ? parent.offsetTop - parent.offsetParent.scrollTop
            : 0
            : bottomDifference - windowHeight,
      },
      bottomAnchorStyle: {
        bottom:
          bottomDifference - windowHeight + calculatedHeight > 0
            ? this.props.relative
            ? parent.offsetTop - parent.offsetParent.scrollTop
            : 0
            : -(bottomDifference - windowHeight) - calculatedHeight,
      },
    }

    const isBottomAnchor = this.props.bottomAnchor;
    const isBottom = this.props.bottom;
    const getBottomStyle = () => {
      if (isBottom) return stickyStyles.bottomStickyStyle;
      if (isBottomAnchor) return stickyStyles.bottomAnchorStyle;
    }

    const stickyStyle = (isBottom || isBottomAnchor) ? getBottomStyle() : stickyStyles.topStickyStyle;

    let style = !isSticky ? {} : { ...baseStickyStyle, ...stickyStyle };

    if (this.props.mobileStyle) {
      const isMobileView = windowWidth <= this.props.mobileStyle.width
      if (isMobileView) {
        style = { ...baseStickyStyle, ...stickyStyles[`${this.props.mobileStyle.style}Style`] }
      }
    }

    if (!this.props.disableHardwareAcceleration) {
      style.transform = "translateZ(0)";
    }

    this.setState({
      isSticky,
      wasSticky,
      distanceFromTop,
      distanceFromBottom,
      calculatedHeight,
      style
    });
  };

  render() {
    const element = React.cloneElement(
      this.props.children({
        isSticky: this.state.isSticky,
        wasSticky: this.state.wasSticky,
        distanceFromTop: this.state.distanceFromTop,
        distanceFromBottom: this.state.distanceFromBottom,
        calculatedHeight: this.state.calculatedHeight,
        style: this.state.style
      }),
      {
        ref: content => {
          this.content = ReactDOM.findDOMNode(content);
        }
      }
    );

    return (
      <div>
        <div ref={placeholder => (this.placeholder = placeholder)} />
        {element}
      </div>
    );
  }
}

import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';

class LazyItem extends Component {
  constructor(props) {
    super(props);
    this.item = createRef();
    this.state = {
      isLoaded: false
    }
    this.doLazyLoad = this.doLazyLoad.bind(this);
  }
  static contextTypes = {
    register: PropTypes.func,
    unRegister: PropTypes.func,
  };
  componentDidMount() {
    this.context.register({
      el: this.item,
      lazyLoad: this.doLazyLoad
    });
  }
  doLazyLoad() {
    const {
      imgSrc
    } = this.props;
    const newImage = new Image();
    newImage.onload = () => {
      this.setState({
        isLoaded: true
      }, () => {
        this.context.unRegister(this.item);
      });
    };
    newImage.src = imgSrc;
  }
  render() {
    const {
      children,
      imgSrc,
      className,
      ...otherProps
    } = this.props;
    const {
      isLoaded
    } = this.state;
    return (
      <div className={className} ref={this.item} style={otherProps.style}>
        {!isLoaded
          ?
          <div className="wrapper-loader">
            <div className="loader"></div>
          </div>
          : children
        }
      </div>
    );
  }
};
export default LazyItem;
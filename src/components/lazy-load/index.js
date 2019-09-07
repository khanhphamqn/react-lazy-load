import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import LazyItem from './hoc';
import './index.scss';

export {
  LazyItem
}


class LazyContainer extends Component {
  lastScrollTop = 0;
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      color: this.props.color
    }
    this.register = this.register.bind(this);
    this.unRegister = this.unRegister.bind(this);
    this.onScroll = this.onScroll.bind(this);
    this.excuteLazyLoad = this.excuteLazyLoad.bind(this);
  }
  static childContextTypes = {
    register: PropTypes.func,
    unRegister: PropTypes.func,
  };
  getChildContext() {
    return {
      register: this.register,
      unRegister: this.unRegister,
    };
  }
  register(item) {
    this.setState(({ items }) => ({
      items: items.concat(item),
    }), () => {
      this.excuteLazyLoad();
    });
  }
  excuteLazyLoad() {
    const st = window.pageYOffset || document.documentElement.scrollTop;
    const visibleEl = this.getVisibleElement(this.state.items, st);
    this.doLazyLoad(visibleEl);
  }
  unRegister(item) {
    this.setState(({ items }) => {
      const index = items.findIndex(i => i.el === item);
      if (index !== -1) {
        items.splice(index, 1);
      }
      return ({
        items: items
      })
    });
  }
  componentDidMount() {
    window.addEventListener('scroll', this.onScroll);
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  }
  getVisibleElement(el, st) {
    const wH = window.innerHeight;
    return el.filter(aobj => {
      const bound = ReactDOM.findDOMNode(aobj.el.current);
      return (bound.offsetTop + bound.offsetHeight / 2) >= st && ((bound.offsetTop + bound.offsetHeight / 2) - st) <= wH;
    })
  }
  doLazyLoad = function (els) {
    els.forEach(el => {
      el.lazyLoad();
    });
  }
  onScroll() {
    this.excuteLazyLoad();
  }
  render() {
    const {
      children
    } = this.props;
    return <Fragment>{children}</Fragment>;
  }
}

export default LazyContainer;
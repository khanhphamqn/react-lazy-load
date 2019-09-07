import React, { Component, Fragment } from 'react';

class Book extends Component {
  componentDidMount(){

  }
  render() {
    const {
      data
    } = this.props;
    return (
      <Fragment>
        <img alt={data.volumeInfo.title} src={data.volumeInfo.imageLinks.thumbnail} />
      </Fragment>
    );
  }
}

export default Book;
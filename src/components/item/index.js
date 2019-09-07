import React, { Component } from 'react';
import './index.scss';
import { GetBook } from '../../services';
import Book from './book';
import LazyContainer, { LazyItem } from '../lazy-load';

class BookContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      onLoadMore: true,
      pagination: 1
    }
    this.loadMore = this.loadMore.bind(this);
  }
  componentDidMount() {
    const {
      pagination
    } = this.state;
    GetBook((pagination - 1) * 20 + 1).then((res) => {
      this.setState({
        books: res.items,
        onLoadMore: false
      })
    })
  }
  loadMore() {
    const {
      pagination,
      books
    } = this.state;
    this.setState({
      onLoadMore: true,
      pagination: pagination + 1
    }, () => {
      GetBook(pagination * 20 + 1).then((res) => {
        this.setState({
          books: books.concat(res.items),
          onLoadMore: false
        })
      })
    })
  }
  render() {
    const {
      books,
      onLoadMore
    } = this.state;
    return (
      <LazyContainer>
        <div className="book-container">
          <LazyItem
            style={{
              width: '100%',
              minHeight: 300
            }}
            className="big-img"
            imgSrc={`https://www.adorama.com/alc/wp-content/uploads/2017/11/shutterstock_114802408-825x465.jpg`}
          >
            <img alt="sky" src="https://www.adorama.com/alc/wp-content/uploads/2017/11/shutterstock_114802408-825x465.jpg"/>
          </LazyItem>
          <div className="wrapper-lorem-text">
            <div className="lorem-text">
              <h2>What is Lorem Ipsum?</h2>
              <p><strong>Lorem Ipsum</strong> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            </div>
          </div>
          <div className="wrapper-lorem-text">
            <div className="lorem-text">
              <h2>What is Lorem Ipsum?</h2>
              <p><strong>Lorem Ipsum</strong> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            </div>
          </div>
          <div className="wrapper-lorem-text">
            <div className="lorem-text">
              <h2>What is Lorem Ipsum?</h2>
              <p><strong>Lorem Ipsum</strong> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            </div>
          </div>
          <div className="wrapper-lorem-text">
            <div className="lorem-text">
              <h2>What is Lorem Ipsum?</h2>
              <p><strong>Lorem Ipsum</strong> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            </div>
          </div>
          {books.map(i =>
            <LazyItem
              key={`${i.id}${i.etag}`}
              style={{
                width: '50%',
                height: 168
              }}
              className="book-item"
              imgSrc={i.volumeInfo.imageLinks.thumbnail}
            ><Book data={i} /></LazyItem>
          )}
        </div>
        <div className="action-group">
          <button onClick={this.loadMore} disabled={onLoadMore} type="button" className="btn load-more">Load More</button>
        </div>
        <div className="wrapper-lorem-text">
          <div className="lorem-text">
            <h2>What is Lorem Ipsum?</h2>
            <p><strong>Lorem Ipsum</strong> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
          </div>
        </div>
        <div className="wrapper-lorem-text">
          <div className="lorem-text">
            <h2>What is Lorem Ipsum?</h2>
            <p><strong>Lorem Ipsum</strong> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
          </div>
        </div>
        <div className="wrapper-lorem-text">
          <div className="lorem-text">
            <h2>What is Lorem Ipsum?</h2>
            <p><strong>Lorem Ipsum</strong> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
          </div>
        </div>
      </LazyContainer>
    );
  }
}

export default BookContainer;
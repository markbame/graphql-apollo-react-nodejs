import React, {Component} from 'react';

import {graphql} from 'react-apollo'
import {getBooksQuery} from '../queries'

class BookList extends Component {
  displayBooks () {
    const {data: {loading, books}} = this.props
    if(loading) {
      return <div>working...</div>
    }
    return books.map(book => {
      return (<li key={book.id}>{book.name}</li>)
    })
  }

  render() {
    return (
      <div>
        <ul id="book-list">
          {this.displayBooks()}
        </ul>
      </div>
    )
  }
}

export default graphql(getBooksQuery)(BookList);

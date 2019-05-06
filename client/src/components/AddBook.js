import React, {Component} from 'react';
import {graphql} from 'react-apollo'
import {getAuthorsQuery} from '../queries'

class AddBook extends Component {
  displayAuthors () {
    const {data: {loading, authors}} = this.props
    if(loading) {
      return <div>working...</div>
    }
    return authors.map(author => {
      return (<option key={author.id}>{author.name}</option>)
    })
  }

  render() {
    return (
      <form id="add-book">
        <div className="field">
          <label>Book name:</label>
          <input type="text"/>
        </div>
        <div className="field">
          <label>Genre:</label>
          <input type="text"/>
        </div>
        <div className="field">
          <label>Author:</label>
          <select>
            <option>
              Select Author
            </option>
            {this.displayAuthors()}
          </select>
        </div>
        <button>+</button>
      </form>
    )
  }
}

export default graphql(getAuthorsQuery)(AddBook);

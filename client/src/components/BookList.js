import React, { Component } from "react";
import { graphql } from "react-apollo";
import { getBooksQuery } from "../queries/queries";
import BookDetails from "./BookDetails";

class BookList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null,
      genreChecked: false,
      bookChecked: false,
    };
  }
  handleToggleChange = (e) => {
    const value = e.target.checked;
    this.setState({
      ...this.state,
      [e.target.name]: value,
    });
  };

  displayBooks() {
    const data = this.props.data;
    if (data.loading) {
      return <div>Loading books...</div>;
    } else {
      return data.books.map((book) => {
        return (
          <li
            key={book.id}
            onClick={(e) => {
              this.setState({ selected: book.id });
            }}
          >
            {book.name}
          </li>
        );
      });
    }
  }
  render() {
    console.log(this.state);
    return (
      <div>
        <p>Show Attribute: </p>
        <label>
          <input
            type="checkbox"
            name="bookChecked"
            defaultChecked={this.state.bookChecked}
            onChange={this.handleToggleChange}
          />
          Book Name
        </label>
        <label>
          <input
            type="checkbox"
            name="genreChecked"
            defaultChecked={this.state.genreChecked}
            onChange={this.handleToggleChange}
          />
          Genre
        </label>

        <ul id="book-list">{this.displayBooks()}</ul>
        <BookDetails
          bookId={this.state.selected}
          showBook={this.state.bookChecked}
          showGenre={this.state.genreChecked}
        />
      </div>
    );
  }
}

export default graphql(getBooksQuery)(BookList);

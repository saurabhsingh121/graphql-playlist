import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import { getAuthorQuery, addBookMutation } from "../queries/queries";

class AddBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      genre: "",
      authorId: "",
    };
  }

  displayAuthors() {
    const data = this.props.getAuthorQuery;
    if (data.loading) {
      return <option>Loading authors...</option>;
    } else {
      return data.authors.map((author) => {
        return (
          <option key={author.id} value={author.id}>
            {author.name}
          </option>
        );
      });
    }
  }

  submitForm(e) {
    e.preventDefault();
    this.props.addBookMutation();
  }
  render() {
    return (
      <form id="add-book" onSubmit={this.submitForm.bind(this)}>
        <div className="field">
          <label>Book Name:</label>
          <input
            type="text"
            value={this.state.name}
            onChange={(e) => this.setState({ name: e.target.value })}
          />
        </div>
        <div className="field">
          <label>Genre:</label>
          <input
            type="text"
            value={this.state.genre}
            onChange={(e) => this.setState({ genre: e.target.value })}
          />
        </div>
        <div className="field">
          <label>Author:</label>
          <select onChange={(e) => this.setState({ authorId: e.target.value })}>
            <option>Select author</option>
            {this.displayAuthors()}
          </select>
        </div>
        <button>+</button>
      </form>
    );
  }
}

export default compose(
  graphql(getAuthorQuery, { name: "getAuthorQuery" }),
  graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);

import { gql } from "apollo-boost";

export const getAuthorQuery = gql`
  {
    authors {
      name
      id
    }
  }
`;

export const getBooksQuery = gql`
  {
    books {
      name
      id
    }
  }
`;

export const addBookMutation = gql`
  mutation($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      name
      id
    }
  }
`;

export const getBookQuery = gql`
  query($id: ID, $showBook: Boolean!, $showGenre: Boolean!) {
    book(id: $id) {
      id
      name @include(if: $showBook)
      genre @include(if: $showGenre)
      author {
        id
        name
        age
        books {
          name
          id
        }
      }
    }
  }
`;
